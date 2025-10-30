const chroma = require('chroma-js')
const { getColors } = require('./colors')

/**
 * @typedef {'light' | 'dark' | 'light_high_contrast' | 'dark_high_contrast' | 'dark_dimmed'} ThemeType
 */

/**
 * @typedef {object} ThemeColors
 * @property {string} background - Main background color
 * @property {string} foreground - Main foreground/text color
 * @property {string} border - Default border color
 * @property {string} borderMuted - Muted border color
 * @property {string} borderFocused - Focused border color
 * @property {string} surfaceBackground - Surface/panel background
 * @property {string} overlayBackground - Overlay/modal background
 * @property {string} elementHover - Hover state background
 * @property {string} elementActive - Active state background
 * @property {string} elementSelected - Selected state background
 * @property {string} textMuted - Muted text color
 * @property {string} textAccent - Accent text color
 * @property {string} iconColor - Icon color
 * @property {string} statusBarBackground - Status bar background
 * @property {string} titleBarBackground - Title bar background
 * @property {string} tabBarBackground - Tab bar background
 * @property {string} tabInactiveBackground - Inactive tab background
 * @property {string} tabActiveBackground - Active tab background
 * @property {string} editorLineNumber - Editor line number color
 * @property {string} editorActiveLineNumber - Active line number color
 * @property {string} editorActiveLine - Active line background
 * @property {string} editorInvisible - Invisible characters color
 * @property {string} terminalForeground - Terminal text color
 * @property {object} terminal - Terminal ANSI colors
 * @property {object} syntax - Syntax highlighting colors
 * @property {object} git - Git decoration colors
 * @property {object} status - Status colors (error, warning, info, success)
 */

/**
 * @typedef {object} UnifiedThemeSchema
 * @property {string} name - Theme name
 * @property {ThemeType} type - Theme type
 * @property {'light' | 'dark'} appearance - Visual appearance
 * @property {ThemeColors} colors - Theme colors
 */

/**
 * Helper to ensure color is in hex format
 * @param {string} color - Color value
 * @returns {string} Hex color
 */
function ensureHexColor(color) {
  if (chroma.valid(color)) {
    return chroma(color).hex()
  }
  return color
}

/**
 * Generate unified theme schema from Primer variables
 * This is the single source of truth for all theme definitions
 *
 * @param {object} options - Theme options
 * @param {ThemeType} options.type - Theme type
 * @param {string} options.name - Theme name
 * @returns {UnifiedThemeSchema} Unified theme schema
 */
function getUnifiedThemeSchema({ type, name }) {
  const { variables, scale } = getColors(type)

  // Helper function to get variable value and ensure hex color format
  const v = (varName) => {
    const color = variables[varName] || '#000000'
    return ensureHexColor(color)
  }

  const isLight = type === 'light' || type === 'light_high_contrast'
  const appearance = isLight ? 'light' : 'dark'

  // Helper to select color based on light/dark theme
  const lightDark = (light, dark) => {
    return isLight ? light : dark
  }

  // Helper to check if a color variable exists and is valid
  const hasValidColor = (varName) => {
    const color = variables[varName]
    return color && color !== '#000000' && color !== '#ffffff'
  }

  // Core UI colors - the foundation for all platforms
  const colors = {
    // Base colors
    background: v('bgColor-default'),
    foreground: v('fgColor-default'),

    // Borders
    border: v('borderColor-default'),
    borderMuted: v('borderColor-muted'),
    borderFocused: v('bgColor-accent-emphasis'),
    borderAccent: v('borderColor-accent-emphasis'),

    // Surfaces
    surfaceBackground: v('bgColor-muted'),
    overlayBackground: v('overlay-bgColor') || v('bgColor-default'),

    // Interactive elements
    elementHover: v('bgColor-neutral-muted'),
    elementActive: v('bgColor-neutral-muted'),
    elementSelected: v('bgColor-neutral-muted'),
    elementFocus: v('bgColor-accent-muted'),

    // Text
    textMuted: v('fgColor-muted'),
    textAccent: v('fgColor-accent'),
    textOnEmphasis: v('fgColor-onEmphasis'),

    // Icons
    iconColor: v('fgColor-muted'),

    // Chrome (window chrome)
    statusBarBackground: v('bgColor-default'),
    statusBarForeground: v('fgColor-muted'),
    titleBarBackground: v('bgColor-default'),
    titleBarForeground: v('fgColor-muted'),
    titleBarInactiveBackground: v('bgColor-muted'),

    // Tabs
    tabBarBackground: v('bgColor-muted'),
    tabInactiveBackground: v('bgColor-muted'),
    tabInactiveForeground: v('fgColor-muted'),
    tabActiveBackground: v('bgColor-default'),
    tabActiveForeground: v('fgColor-default'),
    tabActiveBorder: v('borderColor-accent-emphasis'),

    // Editor
    editorBackground: v('bgColor-default'),
    editorForeground: v('fgColor-default'),
    editorLineNumber: lightDark(scale.gray[4], scale.gray[4]),
    editorActiveLineNumber: v('fgColor-default'),
    editorActiveLine: hasValidColor('codeMirror-activeline-bgColor')
      ? v('codeMirror-activeline-bgColor')
      : lightDark('#afb8c11a', '#656c7633'),
    editorInvisible: lightDark(scale.gray[5], scale.gray[5]),
    editorSelection: v('fgColor-accent'),
    editorCursor: v('fgColor-accent'),
    editorIndentGuide: lightDark(scale.gray[3], scale.gray[6]),

    // Sidebar
    sidebarBackground: v('bgColor-muted'),
    sidebarForeground: v('fgColor-default'),

    // Lists
    listHoverBackground: v('bgColor-neutral-muted'),
    listActiveBackground: v('bgColor-neutral-muted'),
    listFocusBackground: v('bgColor-accent-muted'),
    listHighlight: v('fgColor-accent'),

    // Buttons
    buttonPrimaryBackground: v('button-primary-bgColor-rest') || v('bgColor-success-emphasis'),
    buttonPrimaryForeground: v('button-primary-fgColor-rest'),
    buttonPrimaryHover: v('button-primary-bgColor-hover'),
    buttonSecondaryBackground: v('button-default-bgColor-active'),
    buttonSecondaryForeground: v('button-default-fgColor-rest') || v('fgColor-default'),
    buttonSecondaryHover: v('button-default-bgColor-hover'),

    // Inputs
    inputBackground: v('bgColor-default'),
    inputBorder: v('borderColor-default'),
    inputForeground: v('fgColor-default'),
    inputPlaceholder: v('fgColor-muted'),

    // Badges
    badgeBackground: v('bgColor-accent-emphasis'),
    badgeForeground: v('fgColor-onEmphasis'),

    // Terminal
    terminalForeground: v('fgColor-default'),
    terminal: {
      black: v('color-ansi-black'),
      red: v('color-ansi-red'),
      green: v('color-ansi-green'),
      yellow: v('color-ansi-yellow'),
      blue: v('color-ansi-blue'),
      magenta: v('color-ansi-magenta'),
      cyan: v('color-ansi-cyan'),
      white: v('color-ansi-white'),
      brightBlack: v('color-ansi-black-bright'),
      brightRed: v('color-ansi-red-bright'),
      brightGreen: v('color-ansi-green-bright'),
      brightYellow: v('color-ansi-yellow-bright'),
      brightBlue: v('color-ansi-blue-bright'),
      brightMagenta: v('color-ansi-magenta-bright'),
      brightCyan: v('color-ansi-cyan-bright'),
      brightWhite: v('color-ansi-white-bright'),
    },

    // Syntax highlighting (token colors)
    syntax: {
      comment: lightDark(scale.gray[5], scale.gray[7]),
      string: lightDark(scale.blue[7], scale.blue[6]),
      stringEscape: lightDark(scale.red[5], scale.red[7]),
      number: lightDark(scale.blue[5], scale.blue[8]),
      boolean: lightDark(scale.blue[5], scale.blue[8]),
      constant: lightDark(scale.blue[5], scale.blue[8]),
      variable: lightDark(scale.orange[5], scale.orange[8]),
      variableSpecial: lightDark(scale.blue[5], scale.blue[8]),
      property: lightDark(scale.blue[5], scale.blue[9]),
      keyword: lightDark(scale.red[5], scale.red[7]),
      storage: lightDark(scale.purple[5], scale.teal[7]),
      function: lightDark(scale.purple[5], scale.purple[8]),
      class: lightDark(scale.orange[5], scale.orange[8]),
      type: lightDark(scale.green[5], scale.green[9]),
      tag: lightDark(scale.green[5], scale.green[8]),
      attribute: lightDark(scale.blue[5], scale.blue[9]),
      operator: v('fgColor-default'),
      punctuation: v('fgColor-default'),
      regex: lightDark(scale.blue[5], scale.blue[9]),
      invalid: lightDark(scale.red[5], scale.red[9]),
    },

    // Git decorations
    git: {
      added: v('fgColor-success'),
      modified: v('fgColor-upsell'),
      deleted: v('fgColor-danger'),
      untracked: v('fgColor-success'),
      ignored: v('fgColor-muted'),
      conflict: v('fgColor-sponsors'),
    },

    // Status/severity colors
    status: {
      error: v('fgColor-danger'),
      errorBackground: v('bgColor-danger-emphasis'),
      warning: v('fgColor-attention'),
      warningBackground: v('bgColor-attention-muted'),
      info: v('fgColor-accent'),
      infoBackground: v('bgColor-accent-muted'),
      success: v('fgColor-success'),
      successBackground: v('bgColor-success-emphasis'),
    },

    // Diff editor
    diff: {
      insertedBackground: lightDark('#34d05840', '#34d05826'),
      insertedText: lightDark('#116329', '#aff5b4'),
      removedBackground: lightDark('#ff818226', '#da363340'),
      removedText: lightDark('#82071e', '#ffb3b3'),
    },

    // Scrollbars
    scrollbar: {
      shadow: lightDark(scale.gray[5], scale.gray[5]),
      background: lightDark(scale.gray[7], scale.gray[7]),
    },

    // Activity bar
    activityBarBackground: v('bgColor-default'),
    activityBarForeground: v('fgColor-default'),
    activityBarInactiveForeground: v('fgColor-muted'),
    activityBarBadgeBackground: v('bgColor-accent-emphasis'),
    activityBarBadgeForeground: v('fgColor-onEmphasis'),
    activityBarBorder: v('borderColor-default'),

    // Bracket colors
    brackets: [
      lightDark(scale.blue[5], scale.blue[8]),
      lightDark(scale.green[5], scale.green[8]),
      lightDark(scale.yellow[5], scale.yellow[8]),
      lightDark(scale.red[5], scale.red[8]),
      lightDark(scale.pink[5], scale.pink[8]),
      lightDark(scale.purple[5], scale.purple[8]),
    ],

    // Collaborative editing (player colors)
    players: [
      lightDark(scale.blue[5], scale.blue[8]),
      lightDark(scale.green[5], scale.green[8]),
      lightDark(scale.yellow[5], scale.yellow[8]),
      lightDark(scale.red[5], scale.red[8]),
      lightDark(scale.pink[5], scale.pink[8]),
      lightDark(scale.purple[5], scale.purple[8]),
    ],
  }

  return {
    name,
    type,
    appearance,
    colors,
    // Store scale for platform-specific overrides if needed
    _meta: {
      scale,
      variables,
      isLight,
    },
  }
}

module.exports = {
  getUnifiedThemeSchema,
  ensureHexColor,
}
