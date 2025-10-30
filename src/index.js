const { promises: fs } = require('node:fs')
const getTheme = require('./theme.js')
const getZedTheme = require('./zed-theme.js')

// Generate VS Code themes
const lightDefaultTheme = getTheme({ theme: 'light', name: 'GitHub Light Default' })
const lightHighContrastTheme = getTheme({ theme: 'light_high_contrast', name: 'GitHub Light High Contrast' })

const darkDefaultTheme = getTheme({ theme: 'dark', name: 'GitHub Dark Default' })
const darkHighContrastTheme = getTheme({ theme: 'dark_high_contrast', name: 'GitHub Dark High Contrast' })
const darkDimmedTheme = getTheme({ theme: 'dark_dimmed', name: 'GitHub Dark Dimmed' })

// Generate Zed themes
const zedLightDefaultTheme = getZedTheme({ theme: 'light', name: 'Azir Light Default' })
const zedLightHighContrastTheme = getZedTheme({ theme: 'light_high_contrast', name: 'Azir Light High Contrast' })

const zedDarkDefaultTheme = getZedTheme({ theme: 'dark', name: 'Azir Dark Default' })
const zedDarkHighContrastTheme = getZedTheme({ theme: 'dark_high_contrast', name: 'Azir Dark High Contrast' })
const zedDarkDimmedTheme = getZedTheme({ theme: 'dark_dimmed', name: 'Azir Dark Dimmed' })

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
    // Zed themes
    fs.writeFile('./themes/zed/azir-light-default.json', JSON.stringify(zedLightDefaultTheme, null, 2)),
    fs.writeFile('./themes/zed/azir-light-high-contrast.json', JSON.stringify(zedLightHighContrastTheme, null, 2)),
    fs.writeFile('./themes/zed/azir-dark-default.json', JSON.stringify(zedDarkDefaultTheme, null, 2)),
    fs.writeFile('./themes/zed/azir-dark-high-contrast.json', JSON.stringify(zedDarkHighContrastTheme, null, 2)),
    fs.writeFile('./themes/zed/azir-dark-dimmed.json', JSON.stringify(zedDarkDimmedTheme, null, 2)),
  ]))
  .catch(() => process.exit(1))
