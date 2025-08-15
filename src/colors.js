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
  const scaleColors = [
    'auburn',
    'blue',
    'brown',
    'coral',
    'cyan',
    'gray',
    'green',
    'indigo',
    'lemon',
    'lime',
    'olive',
    'orange',
    'pine',
    'pink',
    'plum',
    'purple',
    'red',
    'teal',
    'yellow',
  ]

  for (const colorName of scaleColors) {
    scale[colorName] = []
    for (let i = 0; i <= 9; i++) {
      const scaleKey = `display-${colorName}-scale-${i}`
      scale[colorName][i] = getPrimerVariable(variables, scaleKey) || `#${colorName}${i}`
    }
  }

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

  return loadColorsFromCSS(themeName)
}

module.exports = {
  getColors,
}
