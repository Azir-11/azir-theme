const { loadRawVariablesFromCSS } = require('./shared')

// 直接使用 @primer/primitives 变量，去掉 -- 前缀
function getPrimerVariable(variables, varName) {
  return variables[varName]
}

// 从 CSS 文件加载颜色变量
function loadColorsFromCSS(themeName) {
  const variables = loadRawVariablesFromCSS(themeName)
  
  // 构建颜色比例尺
  const scale = {}
  const scaleColors = ['gray', 'blue', 'green', 'yellow', 'orange', 'red', 'purple', 'pink']
  for (const colorName of scaleColors) {
    scale[colorName] = []
    for (let i = 0; i <= 9; i++) {
      const scaleKey = `display-${colorName}-scale-${i}`
      scale[colorName][i] = getPrimerVariable(variables, scaleKey) || `#${colorName}${i}`
    }
  }
  
  // 添加特殊的颜色
  scale.white = '#ffffff'
  scale.black = '#000000'
  
  return { variables, scale }
}

function getColors(theme) {
  let themeName
  
  switch (theme) {
    case 'light':
      themeName = 'light'
      break
    case 'light_high_contrast':
      themeName = 'light-high-contrast'
      break
    case 'dark':
      themeName = 'dark'
      break
    case 'dark_high_contrast':
      themeName = 'dark-high-contrast'
      break
    case 'dark_dimmed':
      themeName = 'dark-dimmed'
      break
    default:
      throw new Error(`Colors are missing for value: ${theme}`)
  }
  
  const { variables, scale } = loadColorsFromCSS(themeName)
  
  // 应用临时覆盖，直到 Primitives 更新
  if (theme === 'light') {
    variables['bgColor-success-emphasis'] = '#1f883d'
    variables['fgColor-default'] = '#1f2328'
    variables['fgColor-muted'] = '#656d76'
  }
  
  if (theme === 'dark') {
    variables['fgColor-default'] = '#e6edf3'
    variables['fgColor-muted'] = '#7d8590'
    variables['fgColor-accent'] = '#2f81f7'
  }
  
  return { variables, scale }
}

module.exports = {
  getColors,
}
