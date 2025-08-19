const chroma = require('chroma-js')
const { getColors } = require('./colors')

// Choosing colors from primer/primitives
// There are multiple ways to define what color is used:

// 1. Global variable
//    e.g. "textLink.foreground": color.fg.default,
// 2. Color scale
//    e.g. "textLink.foreground": scale.blue[5],
// 3. Per theme. Useful when a certain theme needs an exception
//    e.g. "textLink.foreground": themes({ light: scale.blue[5], light_high_contrast: scale.blue[5], light_colorblind: scale.blue[5], dark: scale.blue[8], dark_high_contrast: scale.blue[3], dark_colorblind: scale.blue[8], dark_dimmed: scale.blue[3] }),

function getTheme({ theme, name }) {
  const themes = options => options[theme] // Usage: themes({ light: "lightblue", light_high_contrast: "lightblue", light_colorblind: "lightblue", dark: "darkblue", dark_high_contrast: "darkblue", dark_colorblind: "darkblue", dark_dimmed: "royalblue" })
  const { variables, scale } = getColors(theme)

  // 辅助函数：获取变量值并确保为十六进制格式
  const v = (varName) => {
    const color = variables[varName] || '#000000'
    return ensureHexColor(color)
  }

  const onlyDark = (color) => {
    return themes({ dark: color, dark_high_contrast: color, dark_colorblind: color, dark_dimmed: color })
  }

  const onlyHighContrast = (color) => {
    return themes({ light_high_contrast: color, dark_high_contrast: color })
  }

  const onlyDarkHighContrast = (color) => {
    return themes({ dark_high_contrast: color })
  }

  const lightDark = (light, dark) => {
    return themes({ light, light_high_contrast: light, light_colorblind: light, dark, dark_high_contrast: dark, dark_colorblind: dark, dark_dimmed: dark })
  }

  const alpha = (color, alpha) => {
    return chroma(color).alpha(alpha).hex()
  }

  return {
    name,
    colors: {
      'focusBorder': v('bgColor-accent-emphasis'),
      'foreground': v('fgColor-default'),
      'descriptionForeground': v('fgColor-muted'),
      'errorForeground': v('fgColor-danger'),

      'textLink.foreground': v('fgColor-accent'),
      'textLink.activeForeground': v('fgColor-accent'),
      'textBlockQuote.background': v('bgColor-muted'),
      'textBlockQuote.border': v('borderColor-default'),
      'textCodeBlock.background': v('bgColor-neutral-muted'),
      'textPreformat.foreground': v('fgColor-muted'),
      'textPreformat.background': v('bgColor-neutral-muted'),
      'textSeparator.foreground': v('borderColor-muted'),

      'icon.foreground': v('fgColor-muted'),
      'keybindingLabel.foreground': v('fgColor-default'),

      'button.background': v('button-primary-bgColor-rest') || v('bgColor-success-emphasis'),
      'button.foreground': v('button-primary-fgColor-rest'),
      'button.hoverBackground': v('button-primary-bgColor-hover'),

      'button.secondaryBackground': v('button-default-bgColor-active'),
      'button.secondaryForeground': v('button-default-fgColor-rest') || v('fgColor-default'),
      'button.secondaryHoverBackground': v('button-default-bgColor-hover'),

      'checkbox.background': v('bgColor-muted'),
      'checkbox.border': v('borderColor-default'),

      'dropdown.background': v('overlay-bgColor') || v('bgColor-default'),
      'dropdown.border': v('borderColor-default'),
      'dropdown.foreground': v('fgColor-default'),
      'dropdown.listBackground': v('overlay-bgColor') || v('bgColor-default'),

      'input.background': v('bgColor-default'),
      'input.border': v('borderColor-default'),
      'input.foreground': v('fgColor-default'),
      'input.placeholderForeground': v('fgColor-muted'),

      'badge.foreground': v('fgColor-onEmphasis'),
      'badge.background': v('bgColor-accent-emphasis'),

      'progressBar.background': v('bgColor-accent-emphasis'),

      'titleBar.activeForeground': v('fgColor-muted'),
      'titleBar.activeBackground': v('bgColor-default'),
      'titleBar.inactiveForeground': v('fgColor-muted'),
      'titleBar.inactiveBackground': v('bgColor-muted'),
      'titleBar.border': v('borderColor-default'),

      'activityBar.foreground': v('fgColor-default'),
      'activityBar.inactiveForeground': v('fgColor-muted'),
      'activityBar.background': v('bgColor-default'),
      'activityBarBadge.foreground': v('fgColor-onEmphasis'),
      'activityBarBadge.background': v('bgColor-accent-emphasis'),
      'activityBar.activeBorder': v('borderColor-accent-emphasis'),
      'activityBar.border': v('borderColor-default'),

      'sideBar.foreground': v('fgColor-default'),
      'sideBar.background': v('bgColor-muted'),
      'sideBar.border': v('borderColor-default'),
      'sideBarTitle.foreground': v('fgColor-default'),
      'sideBarSectionHeader.foreground': v('fgColor-default'),
      'sideBarSectionHeader.background': v('bgColor-muted'),
      'sideBarSectionHeader.border': v('borderColor-default'),

      'list.hoverForeground': v('fgColor-default'),
      'list.inactiveSelectionForeground': v('fgColor-default'),
      'list.activeSelectionForeground': v('fgColor-default'),
      'list.hoverBackground': v('bgColor-neutral-muted'),
      'list.inactiveSelectionBackground': v('bgColor-neutral-muted'),
      'list.activeSelectionBackground': v('bgColor-neutral-muted'),
      'list.focusForeground': v('fgColor-default'),
      'list.focusBackground': v('bgColor-accent-muted'),
      'list.inactiveFocusBackground': v('bgColor-accent-muted'),
      'list.highlightForeground': v('fgColor-accent'),

      'tree.indentGuidesStroke': v('borderColor-muted'),

      'notificationCenterHeader.foreground': v('fgColor-muted'),
      'notificationCenterHeader.background': v('bgColor-muted'),
      'notifications.foreground': v('fgColor-default'),
      'notifications.background': v('overlay-bgColor') || v('bgColor-default'),
      'notifications.border': v('borderColor-default'),
      'notificationsErrorIcon.foreground': v('fgColor-danger'),
      'notificationsWarningIcon.foreground': v('fgColor-attention'),
      'notificationsInfoIcon.foreground': v('fgColor-accent'),

      'pickerGroup.border': v('borderColor-default'),
      'pickerGroup.foreground': v('fgColor-muted'),
      'quickInput.background': v('overlay-bgColor') || v('bgColor-default'),
      'quickInput.foreground': v('fgColor-default'),

      'statusBar.foreground': v('fgColor-muted'),
      'statusBar.background': v('bgColor-default'),
      'statusBar.border': v('borderColor-default'),
      'statusBar.focusBorder': alpha(v('bgColor-accent-emphasis'), 0.5),
      'statusBar.noFolderBackground': v('bgColor-default'),
      'statusBar.debuggingForeground': v('fgColor-onEmphasis'),
      'statusBar.debuggingBackground': v('bgColor-danger-emphasis'),
      'statusBarItem.prominentBackground': v('bgColor-neutral-muted'),
      'statusBarItem.remoteForeground': v('fgColor-default'),
      'statusBarItem.remoteBackground': scale.gray[6],
      'statusBarItem.hoverBackground': alpha(v('fgColor-default'), 0.08),
      'statusBarItem.activeBackground': alpha(v('fgColor-default'), 0.12),
      'statusBarItem.focusBorder': v('bgColor-accent-emphasis'),

      'editorGroupHeader.tabsBackground': v('bgColor-muted'),
      'editorGroupHeader.tabsBorder': v('borderColor-default'),
      'editorGroup.border': v('borderColor-default'),

      'tab.activeForeground': v('fgColor-default'),
      'tab.inactiveForeground': v('fgColor-muted'),
      'tab.inactiveBackground': v('bgColor-muted'),
      'tab.activeBackground': v('bgColor-default'),
      'tab.hoverBackground': v('bgColor-default'),
      'tab.unfocusedHoverBackground': v('bgColor-neutral-muted'),
      'tab.border': v('borderColor-default'),
      'tab.unfocusedActiveBorderTop': v('borderColor-default'),
      'tab.activeBorder': v('bgColor-default'),
      'tab.unfocusedActiveBorder': v('bgColor-default'),
      'tab.activeBorderTop': v('borderColor-accent-emphasis'),

      'breadcrumb.foreground': v('fgColor-muted'),
      'breadcrumb.focusForeground': v('fgColor-default'),
      'breadcrumb.activeSelectionForeground': v('fgColor-muted'),
      'breadcrumbPicker.background': v('overlay-bgColor') || v('bgColor-default'),

      'editor.foreground': v('fgColor-default'),
      'editor.background': v('bgColor-default'),
      'editorWidget.background': v('overlay-bgColor') || v('bgColor-default'),
      'editor.foldBackground': alpha(v('bgColor-neutral-emphasis'), 0.1),
      'editor.lineHighlightBackground': v('codeMirror-activeline-bgColor') || 'rgba(175,184,193,0.2)',
      'editor.lineHighlightBorder': onlyDarkHighContrast(v('fgColor-accent')),
      'editorLineNumber.foreground': scale.gray[4],
      'editorLineNumber.activeForeground': v('fgColor-default'),
      'editorIndentGuide.background': alpha(v('fgColor-default'), 0.12),
      'editorIndentGuide.activeBackground': alpha(v('fgColor-default'), 0.24),
      'editorWhitespace.foreground': scale.gray[5],
      'editorCursor.foreground': v('fgColor-accent'),

      'editor.findMatchBackground': alpha(v('fgColor-severe'), 0.6),
      'editor.findMatchHighlightBackground': alpha(v('fgColor-link'), 0.5),
      'editor.linkedEditingBackground': alpha(v('fgColor-accent'), 0.07),
      'editor.inactiveSelectionBackground': alpha(v('fgColor-accent'), 0.7),
      'editor.selectionBackground': alpha(v('fgColor-accent'), 0.2),
      'editor.selectionHighlightBackground': alpha(scale.green[3], 0.25),
      'editor.wordHighlightBackground': alpha(v('bgColor-neutral-muted'), 0.5),
      'editor.wordHighlightBorder': alpha(v('bgColor-neutral-muted'), 0.6),
      'editor.wordHighlightStrongBackground': alpha(v('bgColor-neutral-muted'), 0.3),
      'editor.wordHighlightStrongBorder': alpha(v('bgColor-neutral-muted'), 0.6),
      'editorBracketMatch.background': alpha(scale.green[3], 0.25),
      'editorBracketMatch.border': alpha(scale.green[3], 0.6),
      // text selection for High Contrast themes
      'editor.selectionForeground': onlyHighContrast(v('fgColor-onEmphasis')),
      'editor.selectionBackground': onlyHighContrast(v('bgColor-emphasis')),
      'editor.inactiveSelectionBackground': onlyHighContrast(v('bgColor-neutral-emphasis')),

      'editorInlayHint.background': alpha(scale.gray[7], 0.2),
      'editorInlayHint.foreground': v('fgColor-muted'),
      'editorInlayHint.typeBackground': alpha(scale.gray[7], 0.2),
      'editorInlayHint.typeForeground': v('fgColor-muted'),
      'editorInlayHint.paramBackground': alpha(scale.gray[7], 0.2),
      'editorInlayHint.paramForeground': v('fgColor-muted'),

      'editorGutter.modifiedBackground': v('fgColor-done'),
      'editorGutter.addedBackground': v('fgColor-success'),
      'editorGutter.deletedBackground': v('fgColor-danger'),

      'diffEditor.insertedLineBackground': alpha(scale.green[5], 0.15),
      'diffEditor.insertedTextBackground': alpha(scale.green[3], 0.3),
      'diffEditor.removedLineBackground': alpha(scale.red[5], 0.15),
      'diffEditor.removedTextBackground': alpha(scale.red[7], 0.3),

      'scrollbar.shadow': alpha(scale.gray[5], 0.2),
      'scrollbarSlider.background': alpha(scale.gray[7], 0.2),
      'scrollbarSlider.hoverBackground': alpha(scale.gray[7], 0.24),
      'scrollbarSlider.activeBackground': alpha(scale.gray[7], 0.28),
      'editorOverviewRuler.border': lightDark(scale.white, scale.black),

      'minimapSlider.background': alpha(scale.gray[7], 0.2),
      'minimapSlider.hoverBackground': alpha(scale.gray[7], 0.24),
      'minimapSlider.activeBackground': alpha(scale.gray[7], 0.28),

      'panel.background': v('bgColor-muted'),
      'panel.border': v('borderColor-default'),
      'panelTitle.activeBorder': v('borderColor-accent-emphasis'),
      'panelTitle.activeForeground': v('fgColor-default'),
      'panelTitle.inactiveForeground': v('fgColor-muted'),
      'panelInput.border': v('borderColor-default'),

      'debugIcon.breakpointForeground': v('fgColor-danger'),

      'debugConsole.infoForeground': lightDark(scale.gray[5], scale.gray[7]),
      'debugConsole.warningForeground': lightDark(scale.yellow[5], scale.yellow[3]),
      'debugConsole.errorForeground': lightDark(scale.red[5], scale.red[8]),
      'debugConsole.sourceForeground': lightDark(scale.yellow[5], scale.yellow[2]),
      'debugConsoleInputIcon.foreground': lightDark(scale.purple[5], scale.purple[3]),

      'debugTokenExpression.name': scale.blue[8],
      'debugTokenExpression.value': scale.blue[1],
      'debugTokenExpression.string': scale.blue[1],
      'debugTokenExpression.boolean': scale.green[2],
      'debugTokenExpression.number': scale.green[2],
      'debugTokenExpression.error': scale.red[8],

      'symbolIcon.arrayForeground': lightDark(scale.orange[5], scale.orange[3]),
      'symbolIcon.booleanForeground': lightDark(scale.blue[5], scale.blue[3]),
      'symbolIcon.classForeground': lightDark(scale.orange[5], scale.orange[3]),
      'symbolIcon.colorForeground': lightDark(scale.blue[5], scale.blue[8]),
      'symbolIcon.constructorForeground': lightDark(scale.purple[5], scale.purple[8]),
      'symbolIcon.enumeratorForeground': lightDark(scale.orange[5], scale.orange[3]),
      'symbolIcon.enumeratorMemberForeground': lightDark(scale.blue[5], scale.blue[3]),
      'symbolIcon.eventForeground': lightDark(scale.gray[5], scale.gray[4]),
      'symbolIcon.fieldForeground': lightDark(scale.orange[5], scale.orange[3]),
      'symbolIcon.fileForeground': lightDark(scale.yellow[5], scale.yellow[3]),
      'symbolIcon.folderForeground': lightDark(scale.yellow[5], scale.yellow[3]),
      'symbolIcon.functionForeground': lightDark(scale.purple[5], scale.purple[3]),
      'symbolIcon.interfaceForeground': lightDark(scale.orange[5], scale.orange[3]),
      'symbolIcon.keyForeground': lightDark(scale.blue[5], scale.blue[3]),
      'symbolIcon.keywordForeground': lightDark(scale.red[5], scale.red[7]),
      'symbolIcon.methodForeground': lightDark(scale.purple[5], scale.purple[3]),
      'symbolIcon.moduleForeground': lightDark(scale.red[5], scale.red[7]),
      'symbolIcon.namespaceForeground': lightDark(scale.red[5], scale.red[7]),
      'symbolIcon.nullForeground': lightDark(scale.blue[5], scale.blue[3]),
      'symbolIcon.numberForeground': lightDark(scale.green[5], scale.green[3]),
      'symbolIcon.objectForeground': lightDark(scale.orange[5], scale.orange[3]),
      'symbolIcon.operatorForeground': lightDark(scale.blue[5], scale.blue[8]),
      'symbolIcon.packageForeground': lightDark(scale.orange[5], scale.orange[3]),
      'symbolIcon.propertyForeground': lightDark(scale.orange[5], scale.orange[3]),
      'symbolIcon.referenceForeground': lightDark(scale.blue[5], scale.blue[3]),
      'symbolIcon.snippetForeground': lightDark(scale.blue[5], scale.blue[3]),
      'symbolIcon.stringForeground': lightDark(scale.blue[5], scale.blue[8]),
      'symbolIcon.structForeground': lightDark(scale.orange[5], scale.orange[3]),
      'symbolIcon.textForeground': lightDark(scale.blue[5], scale.blue[8]),
      'symbolIcon.typeParameterForeground': lightDark(scale.blue[5], scale.blue[8]),
      'symbolIcon.unitForeground': lightDark(scale.blue[5], scale.blue[3]),
      'symbolIcon.variableForeground': lightDark(scale.orange[5], scale.orange[3]),
      'symbolIcon.constantForeground': lightDark(scale.green[5], scale.green[6]),

      'terminal.foreground': v('fgColor-default'),
      'terminal.ansiBlack': v('color-ansi-black'),
      'terminal.ansiRed': v('color-ansi-red'),
      'terminal.ansiGreen': v('color-ansi-green'),
      'terminal.ansiYellow': v('color-ansi-yellow'),
      'terminal.ansiBlue': v('color-ansi-blue'),
      'terminal.ansiMagenta': v('color-ansi-magenta'),
      'terminal.ansiCyan': v('color-ansi-cyan'),
      'terminal.ansiWhite': v('color-ansi-white'),
      'terminal.ansiBrightBlack': v('color-ansi-black-bright'),
      'terminal.ansiBrightRed': v('color-ansi-red-bright'),
      'terminal.ansiBrightGreen': v('color-ansi-green-bright'),
      'terminal.ansiBrightYellow': v('color-ansi-yellow-bright'),
      'terminal.ansiBrightBlue': v('color-ansi-blue-bright'),
      'terminal.ansiBrightMagenta': v('color-ansi-magenta-bright'),
      'terminal.ansiBrightCyan': v('color-ansi-cyan-bright'),
      'terminal.ansiBrightWhite': v('color-ansi-white-bright'),

      // 不同层级的括号
      'editorBracketHighlight.foreground1': lightDark(scale.blue[5], scale.blue[8]),
      'editorBracketHighlight.foreground2': lightDark(scale.green[5], scale.green[8]),
      'editorBracketHighlight.foreground3': lightDark(scale.yellow[5], scale.yellow[8]),
      'editorBracketHighlight.foreground4': lightDark(scale.red[5], scale.red[8]),
      'editorBracketHighlight.foreground5': lightDark(scale.pink[5], scale.pink[8]),
      'editorBracketHighlight.foreground6': lightDark(scale.purple[5], scale.purple[8]),
      'editorBracketHighlight.unexpectedBracket.foreground': v('fgColor-muted'), // gray

      'gitDecoration.addedResourceForeground': v('fgColor-success'),
      'gitDecoration.modifiedResourceForeground': v('fgColor-upsell'),
      'gitDecoration.deletedResourceForeground': v('fgColor-danger'),
      'gitDecoration.untrackedResourceForeground': v('fgColor-success'),
      'gitDecoration.ignoredResourceForeground': v('fgColor-muted'),
      'gitDecoration.conflictingResourceForeground': v('fgColor-sponsors'),
      'gitDecoration.submoduleResourceForeground': v('fgColor-muted'),

      'debugToolBar.background': v('overlay-bgColor') || v('bgColor-default'),
      'editor.stackFrameHighlightBackground': v('bgColor-attention-muted'),
      'editor.focusedStackFrameHighlightBackground': v('bgColor-success-muted'),

      'peekViewEditor.matchHighlightBackground': onlyDark(v('bgColor-attention-muted')),
      'peekViewResult.matchHighlightBackground': onlyDark(v('bgColor-attention-muted')),
      'peekViewEditor.background': onlyDark(v('bgColor-neutral-muted')),
      'peekViewResult.background': onlyDark(v('bgColor-default')),

      'settings.headerForeground': v('fgColor-default'),
      'settings.modifiedItemIndicator': v('bgColor-attention-muted'),
      'welcomePage.buttonBackground': v('button-default-bgColor-rest'),
      'welcomePage.buttonHoverBackground': v('button-default-bgColor-hover'),
    },
    semanticHighlighting: true,
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: {
          foreground: lightDark(scale.gray[5], scale.gray[7]),
        },
      },
      {
        scope: [
          'string',
          'string punctuation.section.embedded source',
        ],
        settings: {
          foreground: lightDark(scale.blue[7], scale.blue[6]),
        },
      },
      {
        scope: [
          'constant.other.placeholder',
          'constant.character',
        ],
        settings: {
          foreground: lightDark(scale.red[5], scale.red[7]),
        },
      },
      {
        scope: [
          'constant',
          'entity.name.constant',
          'variable.other.enummember',
          'variable.language',
          'entity',
        ],
        settings: {
          foreground: lightDark(scale.blue[5], scale.blue[8]),
        },
      },
      {
        scope: [
          'entity.name',
          'meta.export.default',
          'meta.definition.variable',
        ],
        settings: {
          foreground: lightDark(scale.orange[5], scale.orange[8]),
        },
      },
      {
        scope: [
          'variable.parameter.function',
          'meta.jsx.children',
          'meta.block',
          'meta.tag.attributes',
          'entity.name.constant',
          'meta.object.member',
          'meta.embedded.expression',
        ],
        settings: {
          foreground: v('fgColor-default'),
        },
      },
      {
        scope: 'entity.name.function',
        settings: {
          foreground: lightDark(v('display-yellow-scale-5'), v('display-blue-scale-8')),
        },
      },
      {
        scope: [
          'entity.name.tag',
          'support.class.component',
        ],
        settings: {
          foreground: lightDark(scale.yellow[5], scale.coral[6]),
        },
      },
      {
        scope: 'keyword',
        settings: {
          foreground: lightDark(scale.yellow[5], scale.green[8]),
        },
      },
      {
        scope: ['storage', 'storage.type'],
        settings: {
          foreground: lightDark(scale.purple[5], scale.teal[7]),
        },
      },
      {
        scope: [
          'meta.object-literal.key',
        ],
        settings: {
          foreground: lightDark(scale.red[5], scale.red[8]),
          fontStyle: '',
        },
      },
      {
        scope: [
          'entity.name.type',
        ],
        settings: {
          foreground: lightDark(scale.green[5], scale.green[9]),
        },
      },
      {
        scope: [
          'entity.other.attribute-name',
          'keyword.control.conditional.vue',
        ],
        settings: {
          foreground: lightDark(scale.blue[5], scale.blue[9]),
        },
      },
      {
        scope: [
          'storage.modifier.package',
          'storage.modifier.import',
          'storage.type.java',
        ],
        settings: {
          foreground: v('fgColor-default'),
        },
      },
      {
        scope: [
          'string punctuation.section.embedded source',
        ],
        settings: {
          foreground: scale.blue[9],
        },
      },
      {
        scope: 'support',
        settings: {
          foreground: scale.blue[9],
        },
      },
      {
        scope: 'meta.property-name',
        settings: {
          foreground: scale.blue[9],
        },
      },
      {
        scope: [
          'variable.other.constant',
          'variable.other',
        ],
        settings: {
          foreground: v('fgColor-default'),
        },
      },
      {
        scope: [
          'variable.other.property',
        ],
        settings: {
          foreground: lightDark(scale.green[5], scale.green[8]),
        },
      },
      {
        scope: [
          'meta.attribute.class.html',
        ],
        settings: {
          foreground: lightDark(scale.orange[5], scale.orange[8]),
        },
      },
      {
        scope: 'invalid.broken',
        settings: {
          fontStyle: 'italic',
          foreground: scale.red[9],
        },
      },
      {
        scope: 'invalid.deprecated',
        settings: {
          fontStyle: 'italic',
          foreground: scale.red[9],
        },
      },
      {
        scope: 'invalid.illegal',
        settings: {
          fontStyle: 'italic',
          foreground: scale.red[9],
        },
      },
      {
        scope: 'invalid.unimplemented',
        settings: {
          fontStyle: 'italic',
          foreground: scale.red[9],
        },
      },
      {
        scope: 'carriage-return',
        settings: {
          fontStyle: 'italic underline',
          background: lightDark(scale.red[5], scale.red[8]),
          foreground: lightDark(scale.gray[9], scale.gray[9]),
          content: '^M',
        },
      },
      {
        scope: 'message.error',
        settings: {
          foreground: lightDark(scale.red[5], scale.red[9]),
        },
      },
      {
        scope: ['source.regexp', 'string.regexp'],
        settings: {
          foreground: scale.blue[9],
        },
      },
      {
        scope: [
          'string.regexp.character-class',
          'string.regexp constant.character.escape',
          'string.regexp source.ruby.embedded',
          'string.regexp string.regexp.arbitrary-repitition',
        ],
        settings: {
          foreground: lightDark(scale.blue[5], scale.blue[9]),
        },
      },
      {
        scope: 'string.regexp constant.character.escape',
        settings: {
          fontStyle: 'bold',
          foreground: lightDark(scale.green[5], scale.green[9]),
        },
      },
      {
        scope: 'support.constant',
        settings: {
          foreground: lightDark(scale.blue[5], scale.blue[8]),
        },
      },
      {
        scope: 'support.variable',
        settings: {
          foreground: lightDark(scale.blue[5], scale.blue[8]),
        },
      },
      {
        scope: 'support.type.property-name.json',
        settings: {
          foreground: lightDark(scale.red[5], scale.red[8]),
        },
      },
      {
        scope: 'meta.module-reference',
        settings: {
          foreground: lightDark(scale.blue[5], scale.blue[8]),
        },
      },
      {
        scope: 'punctuation.definition.list.begin.markdown',
        settings: {
          foreground: lightDark(scale.orange[5], scale.orange[8]),
        },
      },
      {
        scope: ['markup.heading', 'markup.heading entity.name'],
        settings: {
          fontStyle: 'bold',
          foreground: lightDark(scale.blue[5], scale.blue[8]),
        },
      },
      {
        scope: 'markup.quote',
        settings: {
          foreground: lightDark(scale.green[5], scale.green[9]),
        },
      },
      {
        scope: 'markup.italic',
        settings: {
          fontStyle: 'italic',
          foreground: v('fgColor-default'),
        },
      },
      {
        scope: 'markup.bold',
        settings: {
          fontStyle: 'bold',
          foreground: v('fgColor-default'),
        },
      },
      {
        scope: ['markup.underline'],
        settings: {
          fontStyle: 'underline',
        },
      },
      {
        scope: ['markup.strikethrough'],
        settings: {
          fontStyle: 'strikethrough',
        },
      },
      {
        scope: 'markup.inline.raw',
        settings: {
          foreground: lightDark(scale.blue[5], scale.blue[8]),
        },
      },
      {
        scope: [
          'markup.deleted',
          'meta.diff.header.from-file',
          'punctuation.definition.deleted',
        ],
        settings: {
          background: lightDark(scale.red[5], scale.red[9]),
          foreground: lightDark(scale.red[5], scale.red[8]),
        },
      },
      {
        scope: ['punctuation.section.embedded'],
        settings: {
          foreground: lightDark(scale.red[5], scale.red[7]),
        },
      },
      {
        scope: [
          'markup.inserted',
          'meta.diff.header.to-file',
          'punctuation.definition.inserted',
        ],
        settings: {
          background: lightDark(scale.green[5], scale.green[9]),
          foreground: lightDark(scale.green[5], scale.green[9]),
        },
      },
      {
        scope: ['markup.changed', 'punctuation.definition.changed'],
        settings: {
          background: lightDark(scale.orange[5], scale.orange[8]),
          foreground: lightDark(scale.orange[5], scale.orange[8]),
        },
      },
      {
        scope: ['markup.ignored', 'markup.untracked'],
        settings: {
          foreground: scale.gray[8],
          background: scale.blue[8],
        },
      },
      {
        scope: 'meta.diff.range',
        settings: {
          foreground: lightDark(scale.purple[5], scale.purple[8]),
          fontStyle: 'bold',
        },
      },
      {
        scope: 'meta.diff.header',
        settings: {
          foreground: lightDark(scale.blue[5], scale.blue[8]),
        },
      },
      {
        scope: 'meta.separator',
        settings: {
          fontStyle: 'bold',
          foreground: lightDark(scale.blue[5], scale.blue[8]),
        },
      },
      {
        scope: 'meta.output',
        settings: {
          foreground: lightDark(scale.blue[5], scale.blue[8]),
        },
      },
      {
        scope: [
          'brackethighlighter.tag',
          'brackethighlighter.curly',
          'brackethighlighter.round',
          'brackethighlighter.square',
          'brackethighlighter.angle',
          'brackethighlighter.quote',
        ],
        settings: {
          foreground: lightDark(scale.gray[5], scale.gray[7]),
        },
      },
      {
        scope: 'brackethighlighter.unmatched',
        settings: {
          foreground: lightDark(scale.red[5], scale.red[8]),
        },
      },
      {
        scope: ['constant.other.reference.link', 'string.other.link'],
        settings: {
          foreground: lightDark(scale.blue[5], scale.blue[8]),
        },
      },
    ],
  }
}

// Convert colors to hex format if needed
// VS Code doesn't support other formats like hsl, rgba etc.
function ensureHexColor(color) {
  if (chroma.valid(color)) {
    return chroma(color).hex()
  }
  return color
}

module.exports = getTheme
