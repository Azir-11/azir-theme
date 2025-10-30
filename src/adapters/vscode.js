const chroma = require('chroma-js')

/**
 * @typedef {import('./schema').UnifiedThemeSchema} UnifiedThemeSchema
 */

/**
 * Helper to add alpha to color
 * @param {string} color - Base color
 * @param {number} alphaValue - Alpha value (0-1)
 * @returns {string} Color with alpha in hex format
 */
function alphaHex(color, alphaValue) {
  return chroma(color).alpha(alphaValue).hex()
}

/**
 * Convert unified theme schema to VS Code theme format
 *
 * @param {UnifiedThemeSchema} schema - Unified theme schema
 * @returns {object} VS Code theme object
 */
function adaptToVSCode(schema) {
  const { name, colors, _meta } = schema
  const { scale } = _meta

  // Helper for theme-specific values (legacy support)
  const themes = options => options[schema.type]

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
    return themes({
      light,
      light_high_contrast: light,
      light_colorblind: light,
      dark,
      dark_high_contrast: dark,
      dark_colorblind: dark,
      dark_dimmed: dark,
    })
  }

  return {
    name,
    colors: {
      'focusBorder': colors.borderFocused,
      'foreground': colors.foreground,
      'descriptionForeground': colors.textMuted,
      'errorForeground': colors.status.error,

      'textLink.foreground': colors.textAccent,
      'textLink.activeForeground': colors.textAccent,
      'textBlockQuote.background': colors.surfaceBackground,
      'textBlockQuote.border': colors.border,
      'textCodeBlock.background': colors.elementHover,
      'textPreformat.foreground': colors.textMuted,
      'textPreformat.background': colors.elementHover,
      'textSeparator.foreground': colors.borderMuted,

      'icon.foreground': colors.iconColor,
      'keybindingLabel.foreground': colors.foreground,

      'button.background': colors.buttonPrimaryBackground,
      'button.foreground': colors.buttonPrimaryForeground,
      'button.hoverBackground': colors.buttonPrimaryHover,

      'button.secondaryBackground': colors.buttonSecondaryBackground,
      'button.secondaryForeground': colors.buttonSecondaryForeground,
      'button.secondaryHoverBackground': colors.buttonSecondaryHover,

      'checkbox.background': colors.surfaceBackground,
      'checkbox.border': colors.border,

      'dropdown.background': colors.overlayBackground,
      'dropdown.border': colors.border,
      'dropdown.foreground': colors.foreground,
      'dropdown.listBackground': colors.overlayBackground,

      'input.background': colors.inputBackground,
      'input.border': colors.inputBorder,
      'input.foreground': colors.inputForeground,
      'input.placeholderForeground': colors.inputPlaceholder,

      'badge.foreground': colors.badgeForeground,
      'badge.background': colors.badgeBackground,

      'progressBar.background': colors.borderFocused,

      'titleBar.activeForeground': colors.titleBarForeground,
      'titleBar.activeBackground': colors.titleBarBackground,
      'titleBar.inactiveForeground': colors.titleBarForeground,
      'titleBar.inactiveBackground': colors.titleBarInactiveBackground,
      'titleBar.border': colors.border,

      'activityBar.foreground': colors.activityBarForeground,
      'activityBar.inactiveForeground': colors.activityBarInactiveForeground,
      'activityBar.background': colors.activityBarBackground,
      'activityBarBadge.foreground': colors.activityBarBadgeForeground,
      'activityBarBadge.background': colors.activityBarBadgeBackground,
      'activityBar.activeBorder': colors.borderFocused,
      'activityBar.border': colors.activityBarBorder,

      'sideBar.foreground': colors.sidebarForeground,
      'sideBar.background': colors.sidebarBackground,
      'sideBar.border': colors.border,
      'sideBarTitle.foreground': colors.foreground,
      'sideBarSectionHeader.foreground': colors.foreground,
      'sideBarSectionHeader.background': colors.sidebarBackground,
      'sideBarSectionHeader.border': colors.border,

      'list.hoverForeground': colors.foreground,
      'list.inactiveSelectionForeground': colors.foreground,
      'list.activeSelectionForeground': colors.foreground,
      'list.hoverBackground': colors.listHoverBackground,
      'list.inactiveSelectionBackground': colors.listActiveBackground,
      'list.activeSelectionBackground': colors.listActiveBackground,
      'list.focusForeground': colors.foreground,
      'list.focusBackground': colors.listFocusBackground,
      'list.inactiveFocusBackground': colors.listFocusBackground,
      'list.highlightForeground': colors.listHighlight,

      'tree.indentGuidesStroke': colors.borderMuted,

      'notificationCenterHeader.foreground': colors.textMuted,
      'notificationCenterHeader.background': colors.surfaceBackground,
      'notifications.foreground': colors.foreground,
      'notifications.background': colors.overlayBackground,
      'notifications.border': colors.border,
      'notificationsErrorIcon.foreground': colors.status.error,
      'notificationsWarningIcon.foreground': colors.status.warning,
      'notificationsInfoIcon.foreground': colors.status.info,

      'pickerGroup.border': colors.border,
      'pickerGroup.foreground': colors.textMuted,
      'quickInput.background': colors.overlayBackground,
      'quickInput.foreground': colors.foreground,

      'statusBar.foreground': colors.statusBarForeground,
      'statusBar.background': colors.statusBarBackground,
      'statusBar.border': colors.border,
      'statusBar.focusBorder': alphaHex(colors.borderFocused, 0.5),
      'statusBar.noFolderBackground': colors.statusBarBackground,
      'statusBar.debuggingForeground': colors.textOnEmphasis,
      'statusBar.debuggingBackground': colors.status.errorBackground,
      'statusBarItem.prominentBackground': colors.elementHover,
      'statusBarItem.remoteForeground': colors.foreground,
      'statusBarItem.remoteBackground': scale.gray[6],
      'statusBarItem.hoverBackground': alphaHex(colors.foreground, 0.08),
      'statusBarItem.activeBackground': alphaHex(colors.foreground, 0.12),
      'statusBarItem.focusBorder': colors.borderFocused,

      'editorGroupHeader.tabsBackground': colors.tabBarBackground,
      'editorGroupHeader.tabsBorder': colors.border,
      'editorGroup.border': colors.border,

      'tab.activeForeground': colors.tabActiveForeground,
      'tab.inactiveForeground': colors.tabInactiveForeground,
      'tab.inactiveBackground': colors.tabInactiveBackground,
      'tab.activeBackground': colors.tabActiveBackground,
      'tab.hoverBackground': colors.tabActiveBackground,
      'tab.unfocusedHoverBackground': colors.elementHover,
      'tab.border': colors.border,
      'tab.unfocusedActiveBorderTop': colors.border,
      'tab.activeBorder': colors.tabActiveBackground,
      'tab.unfocusedActiveBorder': colors.tabActiveBackground,
      'tab.activeBorderTop': colors.tabActiveBorder,

      'breadcrumb.foreground': colors.textMuted,
      'breadcrumb.focusForeground': colors.foreground,
      'breadcrumb.activeSelectionForeground': colors.textMuted,
      'breadcrumbPicker.background': colors.overlayBackground,

      'editor.foreground': colors.editorForeground,
      'editor.background': colors.editorBackground,
      'editorWidget.background': colors.overlayBackground,
      'editor.foldBackground': alphaHex(colors.elementHover, 0.1),
      'editor.lineHighlightBackground': colors.editorActiveLine,
      'editor.lineHighlightBorder': onlyDarkHighContrast(colors.textAccent),
      'editorLineNumber.foreground': colors.editorLineNumber,
      'editorLineNumber.activeForeground': colors.editorActiveLineNumber,
      'editorIndentGuide.background': alphaHex(colors.foreground, 0.12),
      'editorIndentGuide.activeBackground': alphaHex(colors.foreground, 0.24),
      'editorWhitespace.foreground': colors.editorInvisible,
      'editorCursor.foreground': colors.editorCursor,

      'editor.findMatchBackground': alphaHex(colors.status.warning, 0.6),
      'editor.findMatchHighlightBackground': alphaHex(colors.textAccent, 0.5),
      'editor.linkedEditingBackground': alphaHex(colors.textAccent, 0.07),
      'editor.inactiveSelectionBackground': alphaHex(colors.editorSelection, 0.7),
      'editor.selectionBackground': alphaHex(colors.editorSelection, 0.2),
      'editor.selectionHighlightBackground': alphaHex(scale.green[3], 0.25),
      'editor.wordHighlightBackground': alphaHex(colors.elementHover, 0.5),
      'editor.wordHighlightBorder': alphaHex(colors.elementHover, 0.6),
      'editor.wordHighlightStrongBackground': alphaHex(colors.elementHover, 0.3),
      'editor.wordHighlightStrongBorder': alphaHex(colors.elementHover, 0.6),
      'editorBracketMatch.background': alphaHex(scale.green[3], 0.25),
      'editorBracketMatch.border': alphaHex(scale.green[3], 0.6),
      'editor.selectionForeground': onlyHighContrast(colors.textOnEmphasis),
      'editor.selectionBackground': onlyHighContrast(colors.borderFocused),
      'editor.inactiveSelectionBackground': onlyHighContrast(colors.elementHover),

      'editorInlayHint.background': alphaHex(scale.gray[7], 0.2),
      'editorInlayHint.foreground': colors.textMuted,
      'editorInlayHint.typeBackground': alphaHex(scale.gray[7], 0.2),
      'editorInlayHint.typeForeground': colors.textMuted,
      'editorInlayHint.paramBackground': alphaHex(scale.gray[7], 0.2),
      'editorInlayHint.paramForeground': colors.textMuted,

      'editorGutter.modifiedBackground': colors.git.modified,
      'editorGutter.addedBackground': colors.git.added,
      'editorGutter.deletedBackground': colors.git.deleted,

      'diffEditor.insertedLineBackground': colors.diff.insertedBackground,
      'diffEditor.insertedTextBackground': alphaHex(colors.diff.insertedText, 0.3),
      'diffEditor.removedLineBackground': colors.diff.removedBackground,
      'diffEditor.removedTextBackground': alphaHex(colors.diff.removedText, 0.3),

      'scrollbar.shadow': alphaHex(colors.scrollbar.shadow, 0.2),
      'scrollbarSlider.background': alphaHex(colors.scrollbar.background, 0.2),
      'scrollbarSlider.hoverBackground': alphaHex(colors.scrollbar.background, 0.24),
      'scrollbarSlider.activeBackground': alphaHex(colors.scrollbar.background, 0.28),
      'editorOverviewRuler.border': lightDark(scale.white, scale.black),

      'minimapSlider.background': alphaHex(colors.scrollbar.background, 0.2),
      'minimapSlider.hoverBackground': alphaHex(colors.scrollbar.background, 0.24),
      'minimapSlider.activeBackground': alphaHex(colors.scrollbar.background, 0.28),

      'panel.background': colors.surfaceBackground,
      'panel.border': colors.border,
      'panelTitle.activeBorder': colors.tabActiveBorder,
      'panelTitle.activeForeground': colors.foreground,
      'panelTitle.inactiveForeground': colors.textMuted,
      'panelInput.border': colors.border,

      'debugIcon.breakpointForeground': colors.status.error,

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

      'terminal.foreground': colors.terminalForeground,
      'terminal.ansiBlack': colors.terminal.black,
      'terminal.ansiRed': colors.terminal.red,
      'terminal.ansiGreen': colors.terminal.green,
      'terminal.ansiYellow': colors.terminal.yellow,
      'terminal.ansiBlue': colors.terminal.blue,
      'terminal.ansiMagenta': colors.terminal.magenta,
      'terminal.ansiCyan': colors.terminal.cyan,
      'terminal.ansiWhite': colors.terminal.white,
      'terminal.ansiBrightBlack': colors.terminal.brightBlack,
      'terminal.ansiBrightRed': colors.terminal.brightRed,
      'terminal.ansiBrightGreen': colors.terminal.brightGreen,
      'terminal.ansiBrightYellow': colors.terminal.brightYellow,
      'terminal.ansiBrightBlue': colors.terminal.brightBlue,
      'terminal.ansiBrightMagenta': colors.terminal.brightMagenta,
      'terminal.ansiBrightCyan': colors.terminal.brightCyan,
      'terminal.ansiBrightWhite': colors.terminal.brightWhite,

      'editorBracketHighlight.foreground1': colors.brackets[0],
      'editorBracketHighlight.foreground2': colors.brackets[1],
      'editorBracketHighlight.foreground3': colors.brackets[2],
      'editorBracketHighlight.foreground4': colors.brackets[3],
      'editorBracketHighlight.foreground5': colors.brackets[4],
      'editorBracketHighlight.foreground6': colors.brackets[5],
      'editorBracketHighlight.unexpectedBracket.foreground': colors.textMuted,

      'gitDecoration.addedResourceForeground': colors.git.added,
      'gitDecoration.modifiedResourceForeground': colors.git.modified,
      'gitDecoration.deletedResourceForeground': colors.git.deleted,
      'gitDecoration.untrackedResourceForeground': colors.git.untracked,
      'gitDecoration.ignoredResourceForeground': colors.git.ignored,
      'gitDecoration.conflictingResourceForeground': colors.git.conflict,
      'gitDecoration.submoduleResourceForeground': colors.textMuted,

      'debugToolBar.background': colors.overlayBackground,
      'editor.stackFrameHighlightBackground': colors.status.warningBackground,
      'editor.focusedStackFrameHighlightBackground': colors.status.successBackground,

      'peekViewEditor.matchHighlightBackground': onlyDark(colors.status.warningBackground),
      'peekViewResult.matchHighlightBackground': onlyDark(colors.status.warningBackground),
      'peekViewEditor.background': onlyDark(colors.elementHover),
      'peekViewResult.background': onlyDark(colors.background),

      'settings.headerForeground': colors.foreground,
      'settings.modifiedItemIndicator': colors.status.warningBackground,
      'welcomePage.buttonBackground': colors.buttonSecondaryBackground,
      'welcomePage.buttonHoverBackground': colors.buttonSecondaryHover,
    },
    semanticHighlighting: true,
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: {
          foreground: colors.syntax.comment,
        },
      },
      {
        scope: ['string', 'string punctuation.section.embedded source'],
        settings: {
          foreground: colors.syntax.string,
        },
      },
      {
        scope: ['constant.other.placeholder', 'constant.character'],
        settings: {
          foreground: colors.syntax.stringEscape,
        },
      },
      {
        scope: ['constant', 'entity.name.constant', 'variable.other.enummember', 'variable.language', 'entity'],
        settings: {
          foreground: colors.syntax.constant,
        },
      },
      {
        scope: ['entity.name', 'meta.export.default', 'meta.definition.variable'],
        settings: {
          foreground: colors.syntax.variable,
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
          foreground: colors.foreground,
        },
      },
      {
        scope: 'entity.name.function',
        settings: {
          foreground: colors.syntax.function,
        },
      },
      {
        scope: ['entity.name.tag', 'support.class.component'],
        settings: {
          foreground: colors.syntax.tag,
        },
      },
      {
        scope: 'keyword',
        settings: {
          foreground: colors.syntax.keyword,
        },
      },
      {
        scope: ['storage', 'storage.type'],
        settings: {
          foreground: colors.syntax.storage,
        },
      },
      {
        scope: ['meta.object-literal.key'],
        settings: {
          foreground: colors.syntax.property,
          fontStyle: '',
        },
      },
      {
        scope: ['entity.name.type'],
        settings: {
          foreground: colors.syntax.type,
        },
      },
      {
        scope: ['entity.other.attribute-name', 'keyword.control.conditional.vue'],
        settings: {
          foreground: colors.syntax.attribute,
        },
      },
      {
        scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: ['string punctuation.section.embedded source'],
        settings: {
          foreground: colors.syntax.punctuation,
        },
      },
      {
        scope: 'support',
        settings: {
          foreground: colors.syntax.property,
        },
      },
      {
        scope: 'meta.property-name',
        settings: {
          foreground: colors.syntax.property,
        },
      },
      {
        scope: [
          'variable.other.constant',
          'variable.other',
          'support.type.property-name',
          'support.type.vendored.property-name',
        ],
        settings: {
          foreground: colors.foreground,
        },
      },
      {
        scope: ['variable.other.property', 'variable'],
        settings: {
          foreground: colors.syntax.variable,
        },
      },
      {
        scope: ['meta.attribute.class.html'],
        settings: {
          foreground: colors.syntax.class,
        },
      },
      {
        scope: 'invalid.broken',
        settings: {
          fontStyle: 'italic',
          foreground: colors.syntax.invalid,
        },
      },
      {
        scope: 'invalid.deprecated',
        settings: {
          fontStyle: 'italic',
          foreground: colors.syntax.invalid,
        },
      },
      {
        scope: 'invalid.illegal',
        settings: {
          fontStyle: 'italic',
          foreground: colors.syntax.invalid,
        },
      },
      {
        scope: 'invalid.unimplemented',
        settings: {
          fontStyle: 'italic',
          foreground: colors.syntax.invalid,
        },
      },
      {
        scope: 'carriage-return',
        settings: {
          fontStyle: 'italic underline',
          background: colors.status.errorBackground,
          foreground: colors.foreground,
          content: '^M',
        },
      },
      {
        scope: 'message.error',
        settings: {
          foreground: colors.status.error,
        },
      },
      {
        scope: ['source.regexp', 'string.regexp'],
        settings: {
          foreground: colors.syntax.regex,
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
          foreground: colors.syntax.regex,
        },
      },
      {
        scope: 'string.regexp constant.character.escape',
        settings: {
          fontStyle: 'bold',
          foreground: colors.syntax.stringEscape,
        },
      },
      {
        scope: 'support.constant',
        settings: {
          foreground: colors.syntax.constant,
        },
      },
      {
        scope: 'support.variable',
        settings: {
          foreground: colors.syntax.variableSpecial,
        },
      },
      {
        scope: 'support.type.property-name.json',
        settings: {
          foreground: colors.syntax.property,
        },
      },
      {
        scope: 'meta.module-reference',
        settings: {
          foreground: colors.syntax.constant,
        },
      },
      {
        scope: 'punctuation.definition.list.begin.markdown',
        settings: {
          foreground: colors.syntax.variable,
        },
      },
      {
        scope: ['markup.heading', 'markup.heading entity.name'],
        settings: {
          fontStyle: 'bold',
          foreground: colors.syntax.constant,
        },
      },
      {
        scope: 'markup.quote',
        settings: {
          foreground: colors.syntax.type,
        },
      },
      {
        scope: 'markup.italic',
        settings: {
          fontStyle: 'italic',
          foreground: colors.foreground,
        },
      },
      {
        scope: 'markup.bold',
        settings: {
          fontStyle: 'bold',
          foreground: colors.foreground,
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
          foreground: colors.syntax.constant,
        },
      },
      {
        scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
        settings: {
          background: colors.diff.removedBackground,
          foreground: colors.diff.removedText,
        },
      },
      {
        scope: ['punctuation.section.embedded'],
        settings: {
          foreground: colors.syntax.stringEscape,
        },
      },
      {
        scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
        settings: {
          background: colors.diff.insertedBackground,
          foreground: colors.diff.insertedText,
        },
      },
      {
        scope: ['markup.changed', 'punctuation.definition.changed'],
        settings: {
          background: colors.status.warningBackground,
          foreground: colors.status.warning,
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
          foreground: colors.syntax.function,
          fontStyle: 'bold',
        },
      },
      {
        scope: 'meta.diff.header',
        settings: {
          foreground: colors.syntax.constant,
        },
      },
      {
        scope: 'meta.separator',
        settings: {
          fontStyle: 'bold',
          foreground: colors.syntax.constant,
        },
      },
      {
        scope: 'meta.output',
        settings: {
          foreground: colors.syntax.constant,
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
          foreground: colors.syntax.comment,
        },
      },
      {
        scope: 'brackethighlighter.unmatched',
        settings: {
          foreground: colors.status.error,
        },
      },
      {
        scope: ['constant.other.reference.link', 'string.other.link'],
        settings: {
          foreground: colors.syntax.constant,
        },
      },
    ],
  }
}

module.exports = {
  adaptToVSCode,
}
