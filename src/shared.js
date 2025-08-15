const fs = require('fs')
const path = require('path')

// CSS 变量解析器
function parseCSSVariables(cssContent) {
  const variables = {}
  const lines = cssContent.split('\n')
  
  for (const line of lines) {
    const match = line.match(/^\s*--([^:]+):\s*([^;]+);/)
    if (match) {
      const [, name, value] = match
      variables[name.trim()] = value.trim()
    }
  }
  
  return variables
}

// 解析 var() 引用
function resolveVariableReferences(variables) {
  const resolved = { ...variables }
  const maxIterations = 10 // 防止循环引用
  
  for (let i = 0; i < maxIterations; i++) {
    let changed = false
    
    for (const [key, value] of Object.entries(resolved)) {
      if (typeof value === 'string' && value.includes('var(')) {
        const varMatch = value.match(/var\(--([^)]+)\)/)
        if (varMatch) {
          const refKey = varMatch[1]
          if (resolved[refKey] && !resolved[refKey].includes('var(')) {
            resolved[key] = value.replace(varMatch[0], resolved[refKey])
            changed = true
          }
        }
      }
    }
    
    if (!changed) break
  }
  
  return resolved
}

// 从 CSS 文件加载原始变量
function loadRawVariablesFromCSS(themeName) {
  const cssPath = path.join(__dirname, '../node_modules/@primer/primitives/dist/css/functional/themes', `${themeName}.css`)
  
  if (!fs.existsSync(cssPath)) {
    throw new Error(`CSS theme file not found: ${cssPath}`)
  }
  
  const cssContent = fs.readFileSync(cssPath, 'utf8')
  const variables = parseCSSVariables(cssContent)
  const resolved = resolveVariableReferences(variables)
  
  return resolved
}

// 颜色分组配置
const colorGroups = {
  foreground: {
    title: '前景色 (Foreground)',
    patterns: ['fgColor-', 'color-prettylights-syntax-']
  },
  background: {
    title: '背景色 (Background)', 
    patterns: ['bgColor-', 'codeMirror-.*-bgColor']
  },
  border: {
    title: '边框色 (Border)',
    patterns: ['borderColor-']
  },
  button: {
    title: '按钮色 (Button)',
    patterns: ['button-']
  },
  control: {
    title: '控件色 (Control)',
    patterns: ['control-']
  },
  ansi: {
    title: 'ANSI 终端色 (ANSI)',
    patterns: ['color-ansi-']
  },
  scale: {
    title: '颜色比例尺 (Color Scale)',
    patterns: ['display-.*-scale-']
  },
  syntax: {
    title: '语法高亮 (Syntax)',
    patterns: ['codeMirror-syntax-']
  },
  other: {
    title: '其他 (Other)',
    patterns: ['.*'] // 捕获所有其他颜色
  }
}

module.exports = {
  parseCSSVariables,
  resolveVariableReferences,
  loadRawVariablesFromCSS,
  colorGroups
}
