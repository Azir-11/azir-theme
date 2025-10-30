const chroma = require('chroma-js')

/**
 * @typedef {import('../schema').UnifiedThemeSchema} UnifiedThemeSchema
 */

/**
 * Helper to add alpha to color - returns consistent RGBA format
 * @param {string} color - Base color
 * @param {number} alphaValue - Alpha value (0-1)
 * @returns {string} RGBA color string
 */
function alphaRGBA(color, alphaValue) {
  const c = chroma(color).alpha(alphaValue)
  const [r, g, b, a] = c.rgba()
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`
}

/**
 * Convert unified theme schema to Zed theme format
 *
 * @param {UnifiedThemeSchema} schema - Unified theme schema
 * @returns {object} Zed theme object
 */
function adaptToZed(schema) {
  const { name, appearance, colors } = schema

  return {
    $schema: 'https://zed.dev/schema/themes/v0.1.0.json',
    name,
    author: 'Azir-11',
    themes: [
      {
        name,
        appearance,
        style: {
          // Base colors
          'background': colors.background,
          'foreground': colors.foreground,

          // Borders
          'border': colors.border,
          'border.variant': colors.borderMuted,
          'border.focused': colors.borderFocused,
          'border.selected': colors.borderAccent,
          'border.transparent': alphaRGBA(colors.border, 0),
          'border.disabled': alphaRGBA(colors.border, 0.3),

          // Surfaces
          'elevated_surface.background': colors.overlayBackground,
          'surface.background': colors.surfaceBackground,

          // Elements
          'element.background': colors.background,
          'element.hover': colors.elementHover,
          'element.active': alphaRGBA(colors.foreground, 0.12),
          'element.selected': colors.elementSelected,
          'element.disabled': alphaRGBA(colors.foreground, 0.05),

          // Ghost elements (subtle interactive elements)
          'ghost_element.background': 'transparent',
          'ghost_element.hover': colors.elementHover,
          'ghost_element.active': alphaRGBA(colors.foreground, 0.12),
          'ghost_element.selected': colors.elementFocus,
          'ghost_element.disabled': alphaRGBA(colors.foreground, 0.05),

          // Drop target
          'drop_target.background': alphaRGBA(colors.borderFocused, 0.2),

          // Text
          'text': colors.foreground,
          'text.muted': colors.textMuted,
          'text.placeholder': colors.textMuted,
          'text.disabled': alphaRGBA(colors.foreground, 0.5),
          'text.accent': colors.textAccent,

          // Icons
          'icon': colors.iconColor,
          'icon.muted': alphaRGBA(colors.iconColor, 0.7),
          'icon.disabled': alphaRGBA(colors.foreground, 0.5),
          'icon.placeholder': colors.iconColor,
          'icon.accent': colors.textAccent,

          // Window chrome
          'status_bar.background': colors.statusBarBackground,
          'title_bar.background': colors.titleBarBackground,
          'toolbar.background': colors.background,

          // Tab bar
          'tab_bar.background': colors.tabBarBackground,
          'tab.inactive_background': colors.tabInactiveBackground,
          'tab.active_background': colors.tabActiveBackground,

          // Editor
          'editor.foreground': colors.editorForeground,
          'editor.background': colors.editorBackground,
          'editor.gutter.background': colors.editorBackground,
          'editor.subheader.background': colors.surfaceBackground,
          'editor.active_line.background': colors.editorActiveLine,
          'editor.highlighted_line.background': colors.elementHover,
          'editor.line_number': colors.editorLineNumber,
          'editor.active_line_number': colors.editorActiveLineNumber,
          'editor.invisible': colors.editorInvisible,
          'editor.wrap_guide': alphaRGBA(colors.border, 0.3),
          'editor.active_wrap_guide': alphaRGBA(colors.border, 0.6),
          'editor.document_highlight.read_background': alphaRGBA(colors.elementHover, 0.1),
          'editor.document_highlight.write_background': alphaRGBA(colors.elementFocus, 0.25),

          // Terminal
          'terminal.background': colors.background,
          'terminal.foreground': colors.terminalForeground,
          'terminal.bright_foreground': colors.foreground,
          'terminal.dim_foreground': colors.textMuted,
          'terminal.ansi.black': colors.terminal.black,
          'terminal.ansi.red': colors.terminal.red,
          'terminal.ansi.green': colors.terminal.green,
          'terminal.ansi.yellow': colors.terminal.yellow,
          'terminal.ansi.blue': colors.terminal.blue,
          'terminal.ansi.magenta': colors.terminal.magenta,
          'terminal.ansi.cyan': colors.terminal.cyan,
          'terminal.ansi.white': colors.terminal.white,
          'terminal.ansi.bright_black': colors.terminal.brightBlack,
          'terminal.ansi.bright_red': colors.terminal.brightRed,
          'terminal.ansi.bright_green': colors.terminal.brightGreen,
          'terminal.ansi.bright_yellow': colors.terminal.brightYellow,
          'terminal.ansi.bright_blue': colors.terminal.brightBlue,
          'terminal.ansi.bright_magenta': colors.terminal.brightMagenta,
          'terminal.ansi.bright_cyan': colors.terminal.brightCyan,
          'terminal.ansi.bright_white': colors.terminal.brightWhite,

          // Links
          'link_text.hover': colors.textAccent,

          // Git status colors
          'conflict': colors.git.conflict,
          'conflict.background': alphaRGBA(colors.git.conflict, 0.15),
          'conflict.border': colors.git.conflict,

          'created': colors.git.added,
          'created.background': alphaRGBA(colors.git.added, 0.15),
          'created.border': colors.git.added,

          'modified': colors.git.modified,
          'modified.background': alphaRGBA(colors.git.modified, 0.15),
          'modified.border': colors.git.modified,

          'deleted': colors.git.deleted,
          'deleted.background': alphaRGBA(colors.git.deleted, 0.15),
          'deleted.border': colors.git.deleted,

          // Status colors
          'error': colors.status.error,
          'error.background': alphaRGBA(colors.status.errorBackground, 0.15),
          'error.border': colors.status.error,

          'warning': colors.status.warning,
          'warning.background': alphaRGBA(colors.status.warningBackground, 0.15),
          'warning.border': colors.status.warning,

          'info': colors.status.info,
          'info.background': alphaRGBA(colors.status.infoBackground, 0.15),
          'info.border': colors.status.info,

          'success': colors.status.success,
          'success.background': alphaRGBA(colors.status.successBackground, 0.15),
          'success.border': colors.status.success,

          // Collaborative editing player colors
          'players': colors.players.map(color => ({
            cursor: color,
            background: color,
            selection: alphaRGBA(color, 0.3),
          })),

          // Syntax highlighting
          'syntax': {
            'attribute': {
              color: colors.syntax.attribute,
            },
            'boolean': {
              color: colors.syntax.boolean,
            },
            'comment': {
              color: colors.syntax.comment,
            },
            'comment.doc': {
              color: colors.syntax.comment,
            },
            'constant': {
              color: colors.syntax.constant,
            },
            'constructor': {
              color: colors.syntax.function,
            },
            'embedded': {
              color: colors.foreground,
            },
            'emphasis': {
              color: colors.foreground,
              font_style: 'italic',
            },
            'emphasis.strong': {
              color: colors.foreground,
              font_weight: 700,
            },
            'enum': {
              color: colors.syntax.type,
            },
            'function': {
              color: colors.syntax.function,
            },
            'hint': {
              color: colors.textMuted,
              font_weight: 700,
            },
            'keyword': {
              color: colors.syntax.keyword,
            },
            'label': {
              color: colors.syntax.constant,
            },
            'link_text': {
              color: colors.syntax.constant,
              font_style: 'underline',
            },
            'link_uri': {
              color: colors.syntax.constant,
            },
            'number': {
              color: colors.syntax.number,
            },
            'operator': {
              color: colors.syntax.operator,
            },
            'predictive': {
              color: alphaRGBA(colors.textMuted, 0.6),
              font_style: 'italic',
            },
            'preproc': {
              color: colors.foreground,
            },
            'primary': {
              color: colors.foreground,
            },
            'property': {
              color: colors.syntax.property,
            },
            'punctuation': {
              color: colors.syntax.punctuation,
            },
            'punctuation.bracket': {
              color: colors.syntax.punctuation,
            },
            'punctuation.delimiter': {
              color: colors.syntax.punctuation,
            },
            'punctuation.list_marker': {
              color: colors.syntax.variable,
            },
            'punctuation.special': {
              color: colors.syntax.stringEscape,
            },
            'string': {
              color: colors.syntax.string,
            },
            'string.escape': {
              color: colors.syntax.stringEscape,
            },
            'string.regex': {
              color: colors.syntax.regex,
            },
            'string.special': {
              color: colors.syntax.stringEscape,
            },
            'string.special.symbol': {
              color: colors.syntax.stringEscape,
            },
            'tag': {
              color: colors.syntax.tag,
            },
            'text.literal': {
              color: colors.syntax.string,
            },
            'title': {
              color: colors.syntax.constant,
              font_weight: 700,
            },
            'type': {
              color: colors.syntax.type,
            },
            'variable': {
              color: colors.syntax.variable,
            },
            'variable.special': {
              color: colors.syntax.variableSpecial,
            },
            'variant': {
              color: colors.syntax.variable,
            },
          },
        },
      },
    ],
  }
}

module.exports = {
  adaptToZed,
}
