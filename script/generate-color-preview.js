const fs = require('node:fs')
const path = require('node:path')
const { loadRawVariablesFromCSS, colorGroups } = require('../src/shared')

// 检查颜色是否为有效的十六进制颜色
function isValidColor(color) {
  if (!color || typeof color !== 'string')
    return false
  // 检查十六进制颜色
  if (/^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color))
    return true
  // 检查 rgba 颜色
  if (/^rgba?\([\d\s,./]+\)$/i.test(color))
    return true
  return false
}

// 根据变量名提取子组前缀
function getSubgroupPrefix(varName) {
  const parts = varName.split('-')
  // 对于像 fgColor-attention 这样的变量，只取第一个部分作为子组前缀
  if (parts.length >= 2) {
    return parts[0]
  }
  return parts[0]
}

// 将颜色按组分类，并支持子分组
function categorizeColors(variables) {
  const categorized = {}
  const usedKeys = new Set()

  // 按优先级顺序处理分组（other 组放在最后）
  const groupOrder = Object.keys(colorGroups).filter(key => key !== 'other').concat(['other'])

  for (const groupKey of groupOrder) {
    const group = colorGroups[groupKey]
    categorized[groupKey] = {
      title: group.title,
      colors: [],
      subgroups: {},
    }

    for (const [varName, value] of Object.entries(variables)) {
      if (usedKeys.has(varName))
        continue

      // 检查是否匹配当前组的模式
      const matches = group.patterns.some((pattern) => {
        const regex = new RegExp(pattern, 'i')
        return regex.test(varName)
      })

      if (matches && isValidColor(value)) {
        const colorItem = {
          name: varName,
          value,
          cssVar: `--${varName}`,
        }

        categorized[groupKey].colors.push(colorItem)

        // 创建子分组
        const subgroupPrefix = getSubgroupPrefix(varName)
        if (!categorized[groupKey].subgroups[subgroupPrefix]) {
          categorized[groupKey].subgroups[subgroupPrefix] = []
        }
        categorized[groupKey].subgroups[subgroupPrefix].push(colorItem)

        usedKeys.add(varName)
      }
    }

    // 按名称排序主颜色列表
    categorized[groupKey].colors.sort((a, b) => a.name.localeCompare(b.name))

    // 按名称排序每个子分组
    for (const subgroupKey in categorized[groupKey].subgroups) {
      categorized[groupKey].subgroups[subgroupKey].sort((a, b) => a.name.localeCompare(b.name))
    }

    // 如果组为空，删除它
    if (categorized[groupKey].colors.length === 0) {
      delete categorized[groupKey]
    }
  }

  return categorized
}

// 生成 HTML 内容
function generateHTML(lightColors, darkColors) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Primer Primitives 颜色预览</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #24292f;
            background: #ffffff;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
            
        .dark-theme #app {
            background: #161b22;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
        }
        
        .controls {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .control-panel {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            padding: 16px;
            min-width: 250px;
        }
        
        .dark-theme .control-panel {
            background: #161b22;
        }
        
        .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #d0d7de;
        }
        
        .dark-theme .panel-header {
            border-bottom-color: #30363d;
        }
        
        .panel-title {
            font-size: 16px;
            font-weight: 600;
            color: #24292f;
        }
        
        .dark-theme .panel-title {
            color: #f0f6fc;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #656d76;
        }
        
        .dark-theme .close-btn {
            color: #8b949e;
        }
        
        .search-box {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d0d7de;
            border-radius: 6px;
            margin-bottom: 16px;
            font-size: 14px;
        }
        
        .dark-theme .search-box {
            background: #0d1117;
            border-color: #30363d;
            color: #f0f6fc;
        }
        
        .theme-switcher {
            display: flex;
            gap: 8px;
        }
        
        .theme-btn {
            flex: 1;
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .theme-btn.active {
            background: #0969da;
            color: white;
        }
        
        .theme-btn:not(.active) {
            background: #f6f8fa;
            color: #24292f;
        }
        
        .dark-theme .theme-btn:not(.active) {
            background: #21262d;
            color: #f0f6fc;
        }
        
        .theme-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .toggle-panel-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0969da;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 18px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 999;
        }
        
        .color-group {
            margin-bottom: 40px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .dark-theme .color-group {
            background: #161b22;
        }
        
        .group-header {
            background: #f6f8fa;
            padding: 16px 20px;
            border-bottom: 1px solid #d0d7de;
        }
        
        .dark-theme .group-header {
            background: #21262d;
            border-bottom-color: #30363d;
        }
        
        .group-title {
            font-size: 18px;
            font-weight: 600;
            color: #24292f;
        }
        
        .dark-theme .group-title {
            color: #f0f6fc;
        }
        
        .color-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1px;
            background: #d0d7de;
        }
        
        .dark-theme .color-grid {
            background: #30363d;
        }
        
        .color-item {
            background: white;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: background-color 0.2s ease;
        }
        
        .dark-theme .color-item {
            background: #161b22;
        }
        
        .color-item:hover {
            background: #f6f8fa;
        }
        
        .dark-theme .color-item:hover {
            background: #21262d;
        }
        
        .color-swatch {
            width: 40px;
            height: 40px;
            border-radius: 6px;
            border: 1px solid #d0d7de;
            flex-shrink: 0;
            position: relative;
            cursor: pointer;
        }
        
        .dark-theme .color-swatch {
            border-color: #30363d;
        }
        
        .color-info {
            flex: 1;
            min-width: 0;
        }
        
        .color-name {
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            font-size: 14px;
            font-weight: 500;
            color: #24292f;
            margin-bottom: 4px;
            word-break: break-all;
        }
        
        .dark-theme .color-name {
            color: #f0f6fc;
        }
        
        .color-value {
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            font-size: 12px;
            color: #656d76;
            cursor: pointer;
            padding: 2px 6px;
            background: #f6f8fa;
            border-radius: 3px;
            display: inline-block;
        }
        
        .dark-theme .color-value {
            background: #21262d;
            color: #8b949e;
        }
        
        .color-value:hover {
            background: #e1e4e8;
        }
        
        .dark-theme .color-value:hover {
            background: #30363d;
        }
        
        .copy-feedback {
            position: fixed;
            top: 20px;
            right: 60px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 14px;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .copy-feedback.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stats {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #f6f8fa;
            border-radius: 8px;
            color: #656d76;
        }
        
        .dark-theme .stats {
            background: #21262d;
            color: #8b949e;
        }
        
        /* 子分组样式 */
        .subgroup-header {
            padding: 8px 16px;
            background: #f1f3f4;
            border-left: 3px solid #0969da;
            font-size: 14px;
            font-weight: 500;
            color: #24292f;
            cursor: pointer;
        }
        
        .dark-theme .subgroup-header {
            background: #30363d;
            color: #f0f6fc;
        }
        
        .subgroup-toggle {
            cursor: pointer;
            user-select: none;
        }
        
        .subgroup-toggle:before {
            content: '▼ ';
            font-size: 12px;
            transition: transform 0.2s ease;
        }
        
        .subgroup.collapsed .subgroup-toggle:before {
            transform: rotate(-90deg);
        }
        
        .subgroup.collapsed .subgroup-colors {
            display: none;
        }
        
        /* 隐藏类 */
        .hidden {
            display: none !important;
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="container">
            <div class="header">
                <h1>🎨 GitHub Primer Primitives 颜色预览</h1>
                <p>浏览和复制所有可用的设计令牌颜色变量</p>
            </div>
            
            <button 
                class="toggle-panel-btn" 
                @click="togglePanel"
                title="打开控制面板"
            >
                ⚙️
            </button>
            
            <div class="controls" v-show="showPanel">
                <div class="control-panel">
                    <div class="panel-header">
                        <div class="panel-title">控制面板</div>
                        <button class="close-btn" @click="togglePanel">×</button>
                    </div>
                    <input 
                        type="text" 
                        class="search-box" 
                        v-model="searchKeyword" 
                        placeholder="搜索颜色名称或值..."
                    />
                    <div class="theme-switcher">
                        <button 
                            class="theme-btn" 
                            :class="{ active: currentTheme === 'light' }"
                            @click="switchTheme('light')"
                        >
                            Light
                        </button>
                        <button 
                            class="theme-btn" 
                            :class="{ active: currentTheme === 'dark' }"
                            @click="switchTheme('dark')"
                        >
                            Dark
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="theme-container">
                <div 
                    v-for="(group, groupKey) in filteredColorData" 
                    :key="groupKey" 
                    class="color-group"
                    v-show="group.colors.length > 0"
                >
                    <div class="group-header">
                        <h2 class="group-title">{{ group.title }} ({{ group.colors.length }} 个)</h2>
                    </div>
                    
                    <div v-if="Object.keys(group.subgroups).length > 1">
                        <div 
                            v-for="(subgroupColors, subgroupKey) in group.subgroups" 
                            :key="subgroupKey" 
                            class="subgroup" 
                            :id="'subgroup-' + groupKey + '-' + subgroupKey"
                            v-show="subgroupColors.length > 0"
                        >
                            <div class="subgroup-header" @click="toggleSubgroup(groupKey, subgroupKey)">
                                <span class="subgroup-toggle">
                                    {{ subgroupKey }} ({{ subgroupColors.length }} 个)
                                </span>
                            </div>
                            <div class="subgroup-colors">
                                <div class="color-grid">
                                    <div 
                                        v-for="color in subgroupColors" 
                                        :key="color.name" 
                                        class="color-item"
                                    >
                                        <div 
                                            class="color-swatch" 
                                            :style="{ backgroundColor: color.value }"
                                            :data-color="color.value"
                                            @click="copyToClipboard(color.value)"
                                            title="点击复制颜色值"
                                        ></div>
                                        <div class="color-info">
                                            <div 
                                                class="color-name" 
                                                @click="copyToClipboard(color.name)"
                                                title="点击复制变量名"
                                            >
                                                {{ color.cssVar }}
                                            </div>
                                            <div 
                                                class="color-value" 
                                                @click="copyToClipboard(color.value)"
                                                title="点击复制颜色值"
                                            >
                                                {{ color.value }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div v-else>
                        <div class="color-grid">
                            <div 
                                v-for="color in group.colors" 
                                :key="color.name" 
                                class="color-item"
                            >
                                <div 
                                    class="color-swatch" 
                                    :style="{ backgroundColor: color.value }"
                                    :data-color="color.value"
                                    @click="copyToClipboard(color.value)"
                                    title="点击复制颜色值"
                                ></div>
                                <div class="color-info">
                                    <div 
                                        class="color-name" 
                                        @click="copyToClipboard(color.name)"
                                        title="点击复制变量名"
                                    >
                                        {{ color.cssVar }}
                                    </div>
                                    <div 
                                        class="color-value" 
                                        @click="copyToClipboard(color.value)"
                                        title="点击复制颜色值"
                                    >
                                        {{ color.value }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="stats">
                <p>当前主题: {{ totalColors }} 个颜色变量</p>
                <p>点击颜色块、颜色值或变量名可复制到剪贴板</p>
            </div>
        </div>
        
        <div id="copy-feedback" class="copy-feedback" :class="{ show: showCopyFeedback }">
            已复制到剪贴板！
        </div>
    </div>

    <script>
        const { createApp, ref, computed, onMounted } = Vue;
        
        const app = createApp({
            setup() {
                // 颜色数据
                const colorData = {
                    light: ${JSON.stringify(lightColors)},
                    dark: ${JSON.stringify(darkColors)}
                };
                
                // 当前主题
                const currentTheme = ref('light');
                
                // 控制面板显示状态
                const showPanel = ref(true);
                
                // 搜索关键词
                const searchKeyword = ref('');
                
                // 复制反馈显示状态
                const showCopyFeedback = ref(false);
                
                // 存储分组的折叠状态
                const subgroupStates = ref(new Map());
                
                // 计算总颜色数
                const totalColors = computed(() => {
                    const themeData = colorData[currentTheme.value];
                    return Object.values(themeData).reduce((total, group) => total + group.colors.length, 0);
                });
                
                // 过滤后的颜色数据
                const filteredColorData = computed(() => {
                    const themeData = JSON.parse(JSON.stringify(colorData[currentTheme.value]));
                    const keyword = searchKeyword.value.trim().toLowerCase();
                    
                    if (!keyword) {
                        return themeData;
                    }
                    
                    const filteredData = {};
                    
                    for (const [groupKey, group] of Object.entries(themeData)) {
                        // 过滤主颜色列表
                        const filteredColors = group.colors.filter(color => 
                            color.name.toLowerCase().includes(keyword) || 
                            color.value.toLowerCase().includes(keyword) ||
                            color.cssVar.toLowerCase().includes(keyword)
                        );
                        
                        // 过滤子分组
                        const filteredSubgroups = {};
                        let hasVisibleSubgroups = false;
                        
                        for (const [subgroupKey, subgroupColors] of Object.entries(group.subgroups || {})) {
                            const filteredSubgroupColors = subgroupColors.filter(color => 
                                color.name.toLowerCase().includes(keyword) || 
                                color.value.toLowerCase().includes(keyword) ||
                                color.cssVar.toLowerCase().includes(keyword)
                            );
                            
                            if (filteredSubgroupColors.length > 0) {
                                filteredSubgroups[subgroupKey] = filteredSubgroupColors;
                                hasVisibleSubgroups = true;
                            }
                        }
                        
                        // 如果有匹配的颜色或子分组，保留该组
                        if (filteredColors.length > 0 || hasVisibleSubgroups) {
                            filteredData[groupKey] = {
                                ...group,
                                colors: filteredColors,
                                subgroups: filteredSubgroups
                            };
                        }
                    }
                    
                    return filteredData;
                });
                
                // 切换面板显示
                const togglePanel = () => {
                    showPanel.value = !showPanel.value;
                };
                
                // 切换主题
                const switchTheme = (theme) => {
                    currentTheme.value = theme;
                    
                    // 更新页面主题类
                    if (theme === 'dark') {
                        document.body.classList.add('dark-theme');
                    } else {
                        document.body.classList.remove('dark-theme');
                    }
                };
                
                // 复制到剪贴板
                const copyToClipboard = (text) => {
                    navigator.clipboard.writeText(text).then(() => {
                        showCopyFeedback.value = true;
                        setTimeout(() => {
                            showCopyFeedback.value = false;
                        }, 2000);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                    });
                };
                
                // 切换子分组显示/隐藏
                const toggleSubgroup = (groupKey, subgroupKey) => {
                    const subgroupId = 'subgroup-' + groupKey + '-' + subgroupKey;
                    const subgroup = document.getElementById(subgroupId);
                    if (subgroup) {
                        subgroup.classList.toggle('collapsed');
                        
                        // 保存状态
                        const stateKey = \`\${currentTheme.value}-\${groupKey}-\${subgroupKey}\`;
                        subgroupStates.value.set(stateKey, subgroup.classList.contains('collapsed'));
                    }
                };
                
                // 初始化主题和分组状态
                onMounted(() => {
                    if (currentTheme.value === 'dark') {
                        document.body.classList.add('dark-theme');
                    }
                    
                    // 恢复分组的折叠状态
                    setTimeout(() => {
                        for (const [stateKey, isCollapsed] of subgroupStates.value.entries()) {
                            if (stateKey.startsWith(\`\${currentTheme.value}-\`)) {
                                const parts = stateKey.split('-');
                                const groupKey = parts[1];
                                const subgroupKey = parts[2];
                                const subgroupId = 'subgroup-' + groupKey + '-' + subgroupKey;
                                const subgroup = document.getElementById(subgroupId);
                                if (subgroup && isCollapsed) {
                                    subgroup.classList.add('collapsed');
                                }
                            }
                        }
                    }, 0);
                });
                
                return {
                    colorData,
                    currentTheme,
                    showPanel,
                    searchKeyword,
                    showCopyFeedback,
                    filteredColorData,
                    totalColors,
                    togglePanel,
                    switchTheme,
                    copyToClipboard,
                    toggleSubgroup
                };
            }
        });
        
        app.mount('#app');
    </script>
</body>
</html>`
}

function getTotalColors(categorizedColors) {
  return Object.values(categorizedColors).reduce((total, group) => total + group.colors.length, 0)
}

// 主函数
function generateColorPreview() {
  console.log('🎨 生成颜色预览页面...')

  try {
    // 加载两个主题的颜色
    const lightVariables = loadRawVariablesFromCSS('light')
    const darkVariables = loadRawVariablesFromCSS('dark')

    console.log(`✓ Light theme: ${Object.keys(lightVariables).length} 个变量`)
    console.log(`✓ Dark theme: ${Object.keys(darkVariables).length} 个变量`)

    // 分类颜色
    const lightColors = categorizeColors(lightVariables)
    const darkColors = categorizeColors(darkVariables)

    console.log(`✓ Light theme: ${getTotalColors(lightColors)} 个有效颜色`)
    console.log(`✓ Dark theme: ${getTotalColors(darkColors)} 个有效颜色`)

    // 生成 HTML
    const html = generateHTML(lightColors, darkColors)

    // 写入文件
    const outputPath = path.join(__dirname, './color-preview.html')
    fs.writeFileSync(outputPath, html, 'utf8')

    console.log(`✅ 颜色预览页面已生成: ${outputPath}`)
    console.log(`🌐 在浏览器中打开 file://${path.resolve(outputPath)} 查看`)
  }
  catch (error) {
    console.error('❌ 生成失败:', error.message)
    process.exit(1)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  generateColorPreview()
}

module.exports = { generateColorPreview }
