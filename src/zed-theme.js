const chroma = require('chroma-js')
const { getColors } = require('./colors')

/**
 * Generate Zed theme from Azir color scheme
 * Zed theme format reference: https://zed.dev/docs/themes
 */
function getZedTheme({ theme, name }) {
  const { variables, scale } = getColors(theme)

  // Helper function to get variable value and ensure hex format
  const v = (varName) => {
    const color = variables[varName] || '#000000'
    return ensureHexColor(color)
  }

  const alpha = (color, alphaValue) => {
    return chroma(color).alpha(alphaValue).hex()
  }

  // Determine appearance (light or dark)
  const isLight = theme.includes('light')
  const appearance = isLight ? 'light' : 'dark'

  // Map VS Code colors to Zed theme format
  return {
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

          // Border colors
          'border': v('borderColor-default'),
          'border.variant': v('borderColor-muted'),
          'border.focused': v('bgColor-accent-emphasis'),
          'border.selected': v('borderColor-accent-emphasis'),
          'border.transparent': alpha(v('borderColor-default'), 0),
          'border.disabled': v('borderColor-muted'),

          // Elevated surfaces
          'elevated_surface.background': v('overlay-bgColor') || v('bgColor-default'),

          // Surface backgrounds
          'surface.background': v('bgColor-muted'),

          // Element backgrounds and states
          'element.background': v('bgColor-default'),
          'element.hover': v('bgColor-neutral-muted'),
          'element.active': v('bgColor-accent-muted'),
          'element.selected': v('bgColor-accent-muted'),
          'element.disabled': v('bgColor-muted'),

          // Ghost element (subtle UI elements)
          'ghost_element.background': 'transparent',
          'ghost_element.hover': v('bgColor-neutral-muted'),
          'ghost_element.active': v('bgColor-accent-muted'),
          'ghost_element.selected': v('bgColor-accent-muted'),
          'ghost_element.disabled': 'transparent',

          // Text colors
          'text': v('fgColor-default'),
          'text.muted': v('fgColor-muted'),
          'text.placeholder': v('fgColor-muted'),
          'text.disabled': v('fgColor-muted'),
          'text.accent': v('fgColor-accent'),

          // Icon colors
          'icon': v('fgColor-muted'),
          'icon.muted': v('fgColor-muted'),
          'icon.disabled': v('fgColor-muted'),
          'icon.placeholder': v('fgColor-muted'),
          'icon.accent': v('fgColor-accent'),

          // Status colors
          'status_bar.background': v('bgColor-default'),

          // Title bar
          'title_bar.background': v('bgColor-default'),

          // Toolbar
          'toolbar.background': v('bgColor-muted'),

          // Tab bar
          'tab_bar.background': v('bgColor-muted'),
          'tab.inactive_background': v('bgColor-muted'),
          'tab.active_background': v('bgColor-default'),

          // Editor
          'editor.background': v('bgColor-default'),
          'editor.gutter.background': v('bgColor-default'),
          'editor.subheader.background': v('bgColor-muted'),
          'editor.active_line.background': v('codeMirror-activeline-bgColor') || alpha(v('bgColor-neutral-muted'), 0.2),
          'editor.highlighted_line.background': alpha(v('bgColor-accent-muted'), 0.3),
          'editor.line_number': scale.gray[4],
          'editor.active_line_number': v('fgColor-default'),

          // Editor selections and highlights
          'editor.selection.background': alpha(v('fgColor-accent'), 0.2),
          'editor.match.background': alpha(v('fgColor-severe'), 0.6),
          'editor.match_bracket.background': alpha(scale.green[3], 0.25),

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

          // Links
          'link_text.hover': v('fgColor-accent'),

          // Diagnostic colors
          'error': v('fgColor-danger'),
          'error.background': alpha(v('fgColor-danger'), 0.1),
          'error.border': v('fgColor-danger'),

          'warning': v('fgColor-attention'),
          'warning.background': alpha(v('fgColor-attention'), 0.1),
          'warning.border': v('fgColor-attention'),

          'info': v('fgColor-accent'),
          'info.background': alpha(v('fgColor-accent'), 0.1),
          'info.border': v('fgColor-accent'),

          'success': v('fgColor-success'),
          'success.background': alpha(v('fgColor-success'), 0.1),
          'success.border': v('fgColor-success'),

          // Git colors
          'created': v('fgColor-success'),
          'modified': v('fgColor-upsell'),
          'deleted': v('fgColor-danger'),
          'conflict': v('fgColor-sponsors'),
          'ignored': v('fgColor-muted'),

          // Scrollbar
          'scrollbar_thumb.background': alpha(scale.gray[7], 0.2),
          'scrollbar.track.background': 'transparent',
          'scrollbar.track.border': 'transparent',

          // Syntax highlighting
          'syntax': {
            'comment': {
              color: isLight ? scale.gray[5] : scale.gray[7],
            },
            'string': {
              color: isLight ? scale.blue[7] : scale.blue[6],
            },
            'number': {
              color: isLight ? scale.blue[5] : scale.blue[8],
            },
            'boolean': {
              color: isLight ? scale.blue[5] : scale.blue[8],
            },
            'constant': {
              color: isLight ? scale.blue[5] : scale.blue[8],
            },
            'variable': {
              color: isLight ? scale.green[3] : scale.green[8],
            },
            'variable.special': {
              color: isLight ? scale.blue[5] : scale.blue[8],
            },
            'keyword': {
              color: isLight ? scale.yellow[5] : scale.green[8],
            },
            'operator': {
              color: isLight ? scale.red[5] : scale.red[7],
            },
            'function': {
              color: isLight ? scale.yellow[5] : scale.blue[8],
            },
            'type': {
              color: isLight ? scale.green[5] : scale.green[9],
            },
            'class': {
              color: isLight ? scale.orange[5] : scale.orange[8],
            },
            'interface': {
              color: isLight ? scale.orange[5] : scale.orange[8],
            },
            'struct': {
              color: isLight ? scale.orange[5] : scale.orange[8],
            },
            'enum': {
              color: isLight ? scale.orange[5] : scale.orange[3],
            },
            'property': {
              color: isLight ? scale.red[5] : scale.red[8],
            },
            'attribute': {
              color: isLight ? scale.blue[5] : scale.blue[9],
            },
            'tag': {
              color: isLight ? scale.yellow[5] : scale.coral[6],
            },
            'tag.attribute': {
              color: isLight ? scale.blue[5] : scale.blue[9],
            },
            'label': {
              color: isLight ? scale.blue[5] : scale.blue[8],
            },
            'namespace': {
              color: isLight ? scale.red[5] : scale.red[7],
            },
            'module': {
              color: isLight ? scale.red[5] : scale.red[7],
            },
            'constructor': {
              color: isLight ? scale.purple[5] : scale.purple[8],
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
              color: isLight ? scale.orange[5] : scale.orange[8],
            },
            'punctuation.special': {
              color: isLight ? scale.red[5] : scale.red[7],
            },
            'escape': {
              color: isLight ? scale.blue[5] : scale.blue[8],
            },
            'embedded': {
              color: isLight ? scale.red[5] : scale.red[7],
            },
            'title': {
              color: isLight ? scale.blue[5] : scale.blue[8],
              font_weight: 700,
            },
            'heading': {
              color: isLight ? scale.blue[5] : scale.blue[8],
              font_weight: 700,
            },
            'link_uri': {
              color: isLight ? scale.blue[5] : scale.blue[8],
            },
            'link_text': {
              color: isLight ? scale.blue[5] : scale.blue[8],
            },
            'emphasis': {
              font_style: 'italic',
            },
            'emphasis.strong': {
              font_weight: 700,
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
