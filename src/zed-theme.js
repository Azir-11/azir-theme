const chroma = require('chroma-js')
const { getColors } = require('./colors')

/**
 * Convert VS Code theme to Zed theme format
 * Zed theme format documentation: https://zed.dev/docs/themes
 */
function getZedTheme({ theme, name }) {
  const { variables, scale } = getColors(theme)

  // Helper function to get variable value and ensure hex color format
  const v = (varName) => {
    const color = variables[varName] || '#000000'
    return ensureHexColor(color)
  }

  const isLight = theme === 'light' || theme === 'light_high_contrast'
  const appearance = isLight ? 'light' : 'dark'

  // Helper to add alpha to color
  const alpha = (color, alphaValue) => {
    return chroma(color).alpha(alphaValue).hex('rgba')
  }

  // Helper to select color based on theme
  const lightDark = (light, dark) => {
    return isLight ? light : dark
  }

  return {
    $schema: 'https://zed.dev/schema/themes/v0.1.0.json',
    name,
    author: 'Azir-11',
    themes: [
      {
        name,
        appearance,
        style: {
          // Editor colors
          'background': v('bgColor-default'),
          'foreground': v('fgColor-default'),

          // UI elements
          'border': v('borderColor-default'),
          'border.variant': v('borderColor-muted'),
          'border.focused': v('bgColor-accent-emphasis'),
          'border.selected': v('borderColor-accent-emphasis'),
          'border.transparent': alpha(v('borderColor-default'), 0),
          'border.disabled': alpha(v('borderColor-default'), 0.3),

          // Elevated surfaces
          'elevated_surface.background': v('overlay-bgColor') || v('bgColor-default'),

          // Surface colors
          'surface.background': v('bgColor-muted'),

          // Element colors
          'element.background': v('bgColor-default'),
          'element.hover': v('bgColor-neutral-muted'),
          'element.active': alpha(v('fgColor-default'), 0.12),
          'element.selected': v('bgColor-neutral-muted'),
          'element.disabled': alpha(v('fgColor-default'), 0.05),

          // Ghost element (subtle interactive elements)
          'ghost_element.background': 'transparent',
          'ghost_element.hover': v('bgColor-neutral-muted'),
          'ghost_element.active': alpha(v('fgColor-default'), 0.12),
          'ghost_element.selected': v('bgColor-accent-muted'),
          'ghost_element.disabled': alpha(v('fgColor-default'), 0.05),

          // Drop target
          'drop_target.background': alpha(v('bgColor-accent-emphasis'), 0.2),

          // Text colors
          'text': v('fgColor-default'),
          'text.muted': v('fgColor-muted'),
          'text.placeholder': v('fgColor-muted'),
          'text.disabled': alpha(v('fgColor-default'), 0.5),
          'text.accent': v('fgColor-accent'),

          // Icon colors
          'icon': v('fgColor-muted'),
          'icon.muted': alpha(v('fgColor-muted'), 0.7),
          'icon.disabled': alpha(v('fgColor-default'), 0.5),
          'icon.placeholder': v('fgColor-muted'),
          'icon.accent': v('fgColor-accent'),

          // Status colors
          'status_bar.background': v('bgColor-default'),
          'title_bar.background': v('bgColor-default'),

          // Toolbar
          'toolbar.background': v('bgColor-default'),

          // Tab bar
          'tab_bar.background': v('bgColor-muted'),
          'tab.inactive_background': v('bgColor-muted'),
          'tab.active_background': v('bgColor-default'),

          // Editor colors
          'editor.foreground': v('fgColor-default'),
          'editor.background': v('bgColor-default'),
          'editor.gutter.background': v('bgColor-default'),
          'editor.subheader.background': v('bgColor-muted'),
          'editor.active_line.background': v('codeMirror-activeline-bgColor') || alpha(lightDark(scale.gray[3], scale.gray[7]), 0.2),
          'editor.highlighted_line.background': v('bgColor-neutral-muted'),
          'editor.line_number': lightDark(scale.gray[4], scale.gray[4]),
          'editor.active_line_number': v('fgColor-default'),
          'editor.invisible': lightDark(scale.gray[5], scale.gray[5]),
          'editor.wrap_guide': alpha(v('borderColor-default'), 0.3),
          'editor.active_wrap_guide': alpha(v('borderColor-default'), 0.6),
          'editor.document_highlight.read_background': alpha(v('bgColor-neutral-emphasis'), 0.1),
          'editor.document_highlight.write_background': alpha(scale.green[3], 0.25),

          // Terminal
          'terminal.background': v('bgColor-default'),
          'terminal.foreground': v('fgColor-default'),
          'terminal.bright_foreground': v('fgColor-default'),
          'terminal.dim_foreground': v('fgColor-muted'),
          'terminal.ansi.black': v('color-ansi-black'),
          'terminal.ansi.red': v('color-ansi-red'),
          'terminal.ansi.green': v('color-ansi-green'),
          'terminal.ansi.yellow': v('color-ansi-yellow'),
          'terminal.ansi.blue': v('color-ansi-blue'),
          'terminal.ansi.magenta': v('color-ansi-magenta'),
          'terminal.ansi.cyan': v('color-ansi-cyan'),
          'terminal.ansi.white': v('color-ansi-white'),
          'terminal.ansi.bright_black': v('color-ansi-black-bright'),
          'terminal.ansi.bright_red': v('color-ansi-red-bright'),
          'terminal.ansi.bright_green': v('color-ansi-green-bright'),
          'terminal.ansi.bright_yellow': v('color-ansi-yellow-bright'),
          'terminal.ansi.bright_blue': v('color-ansi-blue-bright'),
          'terminal.ansi.bright_magenta': v('color-ansi-magenta-bright'),
          'terminal.ansi.bright_cyan': v('color-ansi-cyan-bright'),
          'terminal.ansi.bright_white': v('color-ansi-white-bright'),

          // Link
          'link_text.hover': v('fgColor-accent'),

          // Conflict
          'conflict': v('fgColor-danger'),
          'conflict.background': alpha(v('bgColor-danger-emphasis'), 0.15),
          'conflict.border': v('fgColor-danger'),

          // Created
          'created': v('fgColor-success'),
          'created.background': alpha(v('bgColor-success-emphasis'), 0.15),
          'created.border': v('fgColor-success'),

          // Modified
          'modified': v('fgColor-done'),
          'modified.background': alpha(v('bgColor-accent-muted'), 0.15),
          'modified.border': v('fgColor-done'),

          // Deleted
          'deleted': v('fgColor-danger'),
          'deleted.background': alpha(v('bgColor-danger-emphasis'), 0.15),
          'deleted.border': v('fgColor-danger'),

          // Error
          'error': v('fgColor-danger'),
          'error.background': alpha(v('bgColor-danger-emphasis'), 0.15),
          'error.border': v('fgColor-danger'),

          // Warning
          'warning': v('fgColor-attention'),
          'warning.background': alpha(v('bgColor-attention-muted'), 0.15),
          'warning.border': v('fgColor-attention'),

          // Info
          'info': v('fgColor-accent'),
          'info.background': alpha(v('bgColor-accent-muted'), 0.15),
          'info.border': v('fgColor-accent'),

          // Success
          'success': v('fgColor-success'),
          'success.background': alpha(v('bgColor-success-emphasis'), 0.15),
          'success.border': v('fgColor-success'),

          // Players (for collaborative editing)
          'players': [
            {
              cursor: lightDark(scale.blue[5], scale.blue[8]),
              background: lightDark(scale.blue[5], scale.blue[8]),
              selection: alpha(lightDark(scale.blue[3], scale.blue[8]), 0.3),
            },
            {
              cursor: lightDark(scale.green[5], scale.green[8]),
              background: lightDark(scale.green[5], scale.green[8]),
              selection: alpha(lightDark(scale.green[3], scale.green[8]), 0.3),
            },
            {
              cursor: lightDark(scale.yellow[5], scale.yellow[8]),
              background: lightDark(scale.yellow[5], scale.yellow[8]),
              selection: alpha(lightDark(scale.yellow[3], scale.yellow[8]), 0.3),
            },
            {
              cursor: lightDark(scale.red[5], scale.red[8]),
              background: lightDark(scale.red[5], scale.red[8]),
              selection: alpha(lightDark(scale.red[3], scale.red[8]), 0.3),
            },
            {
              cursor: lightDark(scale.pink[5], scale.pink[8]),
              background: lightDark(scale.pink[5], scale.pink[8]),
              selection: alpha(lightDark(scale.pink[3], scale.pink[8]), 0.3),
            },
            {
              cursor: lightDark(scale.purple[5], scale.purple[8]),
              background: lightDark(scale.purple[5], scale.purple[8]),
              selection: alpha(lightDark(scale.purple[3], scale.purple[8]), 0.3),
            },
          ],

          // Syntax highlighting
          'syntax': {
            'attribute': {
              color: lightDark(scale.blue[5], scale.blue[9]),
            },
            'boolean': {
              color: lightDark(scale.blue[5], scale.blue[8]),
            },
            'comment': {
              color: lightDark(scale.gray[5], scale.gray[7]),
            },
            'comment.doc': {
              color: lightDark(scale.gray[5], scale.gray[7]),
            },
            'constant': {
              color: lightDark(scale.blue[5], scale.blue[8]),
            },
            'constructor': {
              color: lightDark(scale.purple[5], scale.purple[8]),
            },
            'embedded': {
              color: v('fgColor-default'),
            },
            'emphasis': {
              color: v('fgColor-default'),
              font_style: 'italic',
            },
            'emphasis.strong': {
              color: v('fgColor-default'),
              font_weight: 700,
            },
            'enum': {
              color: lightDark(scale.orange[5], scale.orange[8]),
            },
            'function': {
              color: lightDark(scale.purple[5], scale.purple[8]),
            },
            'hint': {
              color: v('fgColor-muted'),
              font_weight: 700,
            },
            'keyword': {
              color: lightDark(scale.red[5], scale.red[7]),
            },
            'label': {
              color: lightDark(scale.blue[5], scale.blue[8]),
            },
            'link_text': {
              color: lightDark(scale.blue[5], scale.blue[8]),
              font_style: 'underline',
            },
            'link_uri': {
              color: lightDark(scale.blue[5], scale.blue[8]),
            },
            'number': {
              color: lightDark(scale.blue[5], scale.blue[8]),
            },
            'operator': {
              color: v('fgColor-default'),
            },
            'predictive': {
              color: alpha(v('fgColor-muted'), 0.6),
              font_style: 'italic',
            },
            'preproc': {
              color: v('fgColor-default'),
            },
            'primary': {
              color: v('fgColor-default'),
            },
            'property': {
              color: lightDark(scale.blue[5], scale.blue[9]),
            },
            'punctuation': {
              color: v('fgColor-default'),
            },
            'punctuation.bracket': {
              color: v('fgColor-default'),
            },
            'punctuation.delimiter': {
              color: v('fgColor-default'),
            },
            'punctuation.list_marker': {
              color: lightDark(scale.orange[5], scale.orange[8]),
            },
            'punctuation.special': {
              color: lightDark(scale.red[5], scale.red[7]),
            },
            'string': {
              color: lightDark(scale.blue[7], scale.blue[6]),
            },
            'string.escape': {
              color: lightDark(scale.red[5], scale.red[7]),
            },
            'string.regex': {
              color: lightDark(scale.blue[5], scale.blue[9]),
            },
            'string.special': {
              color: lightDark(scale.red[5], scale.red[7]),
            },
            'string.special.symbol': {
              color: lightDark(scale.red[5], scale.red[7]),
            },
            'tag': {
              color: lightDark(scale.green[5], scale.green[8]),
            },
            'text.literal': {
              color: lightDark(scale.blue[7], scale.blue[6]),
            },
            'title': {
              color: lightDark(scale.blue[5], scale.blue[8]),
              font_weight: 700,
            },
            'type': {
              color: lightDark(scale.green[5], scale.green[9]),
            },
            'variable': {
              color: lightDark(scale.orange[5], scale.orange[8]),
            },
            'variable.special': {
              color: lightDark(scale.blue[5], scale.blue[8]),
            },
            'variant': {
              color: lightDark(scale.orange[5], scale.orange[8]),
            },
          },
        },
      },
    ],
  }
}

// Convert colors to hex format if needed
function ensureHexColor(color) {
  if (chroma.valid(color)) {
    return chroma(color).hex()
  }
  return color
}

module.exports = getZedTheme
