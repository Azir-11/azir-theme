const fs = require('fs')
const path = require('path')
const { loadRawVariablesFromCSS, colorGroups } = require('../src/shared')

// 检查颜色是否为有效的十六进制颜色
function isValidColor(color) {
  if (!color || typeof color !== 'string') return false
  // 检查十六进制颜色
  if (/^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color)) return true
  // 检查 rgba 颜色
  if (/^rgba?\([\d\s,./]+\)$/i.test(color)) return true
  return false
}

// 将颜色按组分类
function categorizeColors(variables) {
  const categorized = {}
  const usedKeys = new Set()
  
  // 按优先级顺序处理分组（other 组放在最后）
  const groupOrder = Object.keys(colorGroups).filter(key => key !== 'other').concat(['other'])
  
  for (const groupKey of groupOrder) {
    const group = colorGroups[groupKey]
    categorized[groupKey] = {
      title: group.title,
      colors: []
    }
    
    for (const [varName, value] of Object.entries(variables)) {
      if (usedKeys.has(varName)) continue
      
      // 检查是否匹配当前组的模式
      const matches = group.patterns.some(pattern => {
        const regex = new RegExp(pattern, 'i')
        return regex.test(varName)
      })
      
      if (matches && isValidColor(value)) {
        categorized[groupKey].colors.push({
          name: varName,
          value: value,
          cssVar: `--${varName}`
        })
        usedKeys.add(varName)
      }
    }
    
    // 按名称排序
    categorized[groupKey].colors.sort((a, b) => a.name.localeCompare(b.name))
    
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
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
        }
        
        .theme-switcher {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .theme-btn {
            padding: 10px 20px;
            margin: 0 10px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
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
        
        .theme-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .theme-content {
            display: none;
        }
        
        .theme-content.active {
            display: block;
        }
        
        .color-group {
            margin-bottom: 40px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .group-header {
            background: #f6f8fa;
            padding: 16px 20px;
            border-bottom: 1px solid #d0d7de;
        }
        
        .group-title {
            font-size: 18px;
            font-weight: 600;
            color: #24292f;
        }
        
        .color-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1px;
            background: #d0d7de;
        }
        
        .color-item {
            background: white;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: background-color 0.2s ease;
        }
        
        .color-item:hover {
            background: #f6f8fa;
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
        
        .color-value:hover {
            background: #e1e4e8;
        }
        
        .copy-feedback {
            position: fixed;
            top: 20px;
            right: 20px;
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
        
        /* 暗色主题样式 */
        .dark-theme {
            background: #0d1117;
            color: #f0f6fc;
        }
        
        .dark-theme .color-group {
            background: #161b22;
        }
        
        .dark-theme .group-header {
            background: #21262d;
            border-bottom-color: #30363d;
        }
        
        .dark-theme .group-title {
            color: #f0f6fc;
        }
        
        .dark-theme .color-grid {
            background: #30363d;
        }
        
        .dark-theme .color-item {
            background: #161b22;
        }
        
        .dark-theme .color-item:hover {
            background: #21262d;
        }
        
        .dark-theme .color-name {
            color: #f0f6fc;
        }
        
        .dark-theme .color-value {
            background: #21262d;
            color: #8b949e;
        }
        
        .dark-theme .color-value:hover {
            background: #30363d;
        }
        
        .dark-theme .stats {
            background: #21262d;
            color: #8b949e;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 GitHub Primer Primitives 颜色预览</h1>
            <p>浏览和复制所有可用的设计令牌颜色变量</p>
        </div>
        
        <div class="theme-switcher">
            <button class="theme-btn active" onclick="switchTheme('light')">Light Theme</button>
            <button class="theme-btn" onclick="switchTheme('dark')">Dark Theme</button>
        </div>
        
        <div id="light-theme" class="theme-content active">
            ${generateThemeHTML(lightColors, 'light')}
        </div>
        
        <div id="dark-theme" class="theme-content">
            ${generateThemeHTML(darkColors, 'dark')}
        </div>
        
        <div class="stats">
            <p>Light Theme: ${getTotalColors(lightColors)} 个颜色变量 | Dark Theme: ${getTotalColors(darkColors)} 个颜色变量</p>
            <p>点击颜色块或颜色值可复制到剪贴板</p>
        </div>
    </div>
    
    <div id="copy-feedback" class="copy-feedback">已复制到剪贴板！</div>
    
    <script>
        function switchTheme(theme) {
            // 更新按钮状态
            document.querySelectorAll('.theme-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // 更新主题内容
            document.querySelectorAll('.theme-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(theme + '-theme').classList.add('active');
            
            // 更新页面主题
            if (theme === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
        
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyFeedback();
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
        
        function showCopyFeedback() {
            const feedback = document.getElementById('copy-feedback');
            feedback.classList.add('show');
            setTimeout(() => {
                feedback.classList.remove('show');
            }, 2000);
        }
        
        // 添加点击事件监听器
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-swatch')) {
                const colorValue = e.target.style.backgroundColor || e.target.getAttribute('data-color');
                copyToClipboard(colorValue);
            } else if (e.target.classList.contains('color-value')) {
                copyToClipboard(e.target.textContent);
            }
        });
    </script>
</body>
</html>`
}

function generateThemeHTML(categorizedColors, theme) {
  let html = ''
  
  for (const [groupKey, group] of Object.entries(categorizedColors)) {
    html += `
        <div class="color-group">
            <div class="group-header">
                <h2 class="group-title">${group.title} (${group.colors.length} 个)</h2>
            </div>
            <div class="color-grid">
    `
    
    for (const color of group.colors) {
      html += `
                <div class="color-item">
                    <div class="color-swatch" 
                         style="background-color: ${color.value};" 
                         data-color="${color.value}"
                         title="点击复制颜色值"></div>
                    <div class="color-info">
                        <div class="color-name">${color.cssVar}</div>
                        <div class="color-value" title="点击复制">${color.value}</div>
                    </div>
                </div>
      `
    }
    
    html += `
            </div>
        </div>
    `
  }
  
  return html
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
    
  } catch (error) {
    console.error('❌ 生成失败:', error.message)
    process.exit(1)
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  generateColorPreview()
}

module.exports = { generateColorPreview }
