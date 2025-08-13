import { promises as fs } from 'node:fs'
import { getTheme } from './theme.js'

const lightDefaultTheme = getTheme({ theme: 'light', name: 'GitHub Light Default' })
const lightHighContrastTheme = getTheme({ theme: 'light_high_contrast', name: 'GitHub Light High Contrast' })
const lightColorblindTheme = getTheme({ theme: 'light_colorblind', name: 'GitHub Light Colorblind' })

const darkDefaultTheme = getTheme({ theme: 'dark', name: 'GitHub Dark Default' })
const darkHighContrastTheme = getTheme({ theme: 'dark_high_contrast', name: 'GitHub Dark High Contrast' })
const darkColorblindTheme = getTheme({ theme: 'dark_colorblind', name: 'GitHub Dark Colorblind' })
const darkDimmedTheme = getTheme({ theme: 'dark_dimmed', name: 'GitHub Dark Dimmed' })

// Write themes

fs.mkdir('./themes', { recursive: true })
  .then(() => Promise.all([
    fs.writeFile('./themes/light-default.json', JSON.stringify(lightDefaultTheme, null, 2)),
    fs.writeFile('./themes/light-high-contrast.json', JSON.stringify(lightHighContrastTheme, null, 2)),
    fs.writeFile('./themes/light-colorblind.json', JSON.stringify(lightColorblindTheme, null, 2)),
    fs.writeFile('./themes/dark-default.json', JSON.stringify(darkDefaultTheme, null, 2)),
    fs.writeFile('./themes/dark-high-contrast.json', JSON.stringify(darkHighContrastTheme, null, 2)),
    fs.writeFile('./themes/dark-colorblind.json', JSON.stringify(darkColorblindTheme, null, 2)),
    fs.writeFile('./themes/dark-dimmed.json', JSON.stringify(darkDimmedTheme, null, 2)),
  ]))
  .catch(() => require('node:process').exit(1))
