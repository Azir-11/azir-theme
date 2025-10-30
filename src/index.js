const process = require('node:process')
const { promises: fs } = require('node:fs')
const getTheme = require('./theme.js')
const getZedTheme = require('./zed-theme.js')

const lightDefaultTheme = getTheme({ theme: 'light', name: 'GitHub Light Default' })
const lightHighContrastTheme = getTheme({ theme: 'light_high_contrast', name: 'GitHub Light High Contrast' })

const darkDefaultTheme = getTheme({ theme: 'dark', name: 'GitHub Dark Default' })
const darkHighContrastTheme = getTheme({ theme: 'dark_high_contrast', name: 'GitHub Dark High Contrast' })
const darkDimmedTheme = getTheme({ theme: 'dark_dimmed', name: 'GitHub Dark Dimmed' })

// Generate Zed themes
const zedThemes = [
  { theme: 'light', name: 'Azir Light Default' },
  { theme: 'light_high_contrast', name: 'Azir Light High Contrast' },
  { theme: 'dark', name: 'Azir Dark Default' },
  { theme: 'dark_high_contrast', name: 'Azir Dark High Contrast' },
  { theme: 'dark_dimmed', name: 'Azir Dark Dimmed' },
]

// Create combined Zed theme file (all variants in one file)
const combinedZedTheme = {
  name: 'Azir',
  author: 'Azir-11',
  themes: zedThemes.map(({ theme, name }) => {
    const zedTheme = getZedTheme({ theme, name })
    return zedTheme.themes[0]
  }),
}

// Write themes

fs.mkdir('./themes', { recursive: true })
  .then(() => fs.mkdir('./themes/zed', { recursive: true }))
  .then(() => Promise.all([
    // VS Code themes
    fs.writeFile('./themes/light-default.json', JSON.stringify(lightDefaultTheme, null, 2)),
    fs.writeFile('./themes/light-high-contrast.json', JSON.stringify(lightHighContrastTheme, null, 2)),
    fs.writeFile('./themes/dark-default.json', JSON.stringify(darkDefaultTheme, null, 2)),
    fs.writeFile('./themes/dark-high-contrast.json', JSON.stringify(darkHighContrastTheme, null, 2)),
    fs.writeFile('./themes/dark-dimmed.json', JSON.stringify(darkDimmedTheme, null, 2)),
    // Zed themes (individual)
    ...zedThemes.map(({ theme, name }) => {
      const zedTheme = getZedTheme({ theme, name })
      const fileName = theme.replace(/_/g, '-')
      return fs.writeFile(
        `./themes/zed/${fileName}.json`,
        JSON.stringify(zedTheme, null, 2),
      )
    }),
    // Zed theme (combined)
    fs.writeFile('./themes/zed/azir.json', JSON.stringify(combinedZedTheme, null, 2)),
  ]))
  .catch(() => process.exit(1))

