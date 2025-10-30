const { promises: fs } = require('node:fs')
const { adaptToVSCode } = require('./adapters/vscode')
const { adaptToZed } = require('./adapters/zed')
const { getUnifiedThemeSchema } = require('./schema')

/**
 * Theme configurations
 * Single source of truth for theme names and types
 */
const themes = [
  { type: 'light', name: 'GitHub Light Default' },
  { type: 'light_high_contrast', name: 'GitHub Light High Contrast' },
  { type: 'dark', name: 'GitHub Dark Default' },
  { type: 'dark_high_contrast', name: 'GitHub Dark High Contrast' },
  { type: 'dark_dimmed', name: 'GitHub Dark Dimmed' },
]

/**
 * Generate all themes
 */
async function generateThemes() {
  // Create directories
  await fs.mkdir('./themes', { recursive: true })
  await fs.mkdir('./themes/zed', { recursive: true })

  // Generate all themes
  const writePromises = []

  for (const themeConfig of themes) {
    // 1. Generate unified schema (single source of truth)
    const schema = getUnifiedThemeSchema(themeConfig)

    // 2. Adapt to VS Code format
    const vscodeTheme = adaptToVSCode(schema)
    const vscodeFileName = themeConfig.type.replace(/_/g, '-')
    writePromises.push(
      fs.writeFile(
        `./themes/${vscodeFileName}.json`,
        JSON.stringify(vscodeTheme, null, 2),
      ),
    )

    // 3. Adapt to Zed format
    const zedTheme = adaptToZed(schema)
    const zedThemeName = themeConfig.name.replace('GitHub', 'Azir')
    zedTheme.name = zedThemeName
    zedTheme.themes[0].name = zedThemeName

    const zedFileName = `azir-${vscodeFileName}`
    writePromises.push(
      fs.writeFile(
        `./themes/zed/${zedFileName}.json`,
        JSON.stringify(zedTheme, null, 2),
      ),
    )
  }

  await Promise.all(writePromises)
}

// Run generation
generateThemes().catch((error) => {
  console.error('Failed to generate themes:', error)
  process.exit(1)
})
