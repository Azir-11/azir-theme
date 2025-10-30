# Azir Theme

> Forked and adapted from GitHub Theme v6.3.5.

A beautiful theme collection available for **VS Code** and **Zed** editors.

## Install

### VS Code

1. Go to [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme).
2. Click on the "Install" button.
3. Then [select a theme](https://code.visualstudio.com/docs/getstarted/themes#_selecting-the-color-theme). The Azir themes aim to match GitHub-like appearance:
    - `Azir Light Default`
    - `Azir Light High Contrast` ✨ new ✨
    - `Azir Dark Default`
    - `Azir Dark High Contrast`
    - `Azir Dark Dimmed`

### Zed

1. Copy the theme files from `themes/zed/` directory to your Zed themes folder:
   - **macOS/Linux**: `~/.config/zed/themes/`
   - **Windows**: `%APPDATA%\Zed\themes\`
2. Open Zed settings and select the Azir theme:
   - Open the command palette (`Cmd/Ctrl + Shift + P`)
   - Type "theme selector" and select it
   - Choose from the available Azir themes

Available Zed themes:
- Use `azir.json` for a combined theme file with all variants
- Or use individual theme files:
  - `light.json` - Azir Light Default
  - `light-high-contrast.json` - Azir Light High Contrast
  - `dark.json` - Azir Dark Default
  - `dark-high-contrast.json` - Azir Dark High Contrast
  - `dark-dimmed.json` - Azir Dark Dimmed

<!-- Legacy themes removed in Azir fork -->

## Override this theme

To override this (or any other) theme in your personal config file, please follow the guide in the [color theme](https://code.visualstudio.com/api/extension-guides/color-theme) documentation. This is handy for small tweaks to the theme without having to fork and maintain your own theme.

## Contribute

1. Clone and open this [repo](https://github.com/primer/github-vscode-theme) in VS Code
2. Run `pnpm` to install the dependencies.
3. Press `F5` to open a new window with your extension loaded
4. Open `Code > Preferences > Color Theme` [`⌘k ⌘t`] and pick the "Azir ..." theme you want to test. Note: It seems this has to be done 2x because the first time it switches back to the default light theme. This might be a bug?
5. Make changes to the [`/src/theme.js`](https://github.com/primer/github-vscode-theme/blob/master/src/theme.js) file.
    - **UI**: For all changes to the "outer UI", like (status bar, file navigation etc.), take a look at the [Theme Color](https://code.visualstudio.com/api/references/theme-color) reference.
    - **Syntax**: For changes to the "code highlighting", examine the syntax scopes by invoking the [`Developer: Inspect Editor Tokens and Scopes`](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#scope-inspector) command from the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) in the Extension Development Host window.
6. Run `pnpm build` to update the theme. You can also run `pnpm start` instead to automatically rebuild the theme while making changes and no reloading should be necessary.
7. Once you're happy, commit your changes and open a PR.

Note:

- If possible use colors from [Primer's color system](https://primer.style/primitives/colors).

## Publish (internal)

> Note: Publishing a new version of this theme is only meant for maintainers.

This repo uses [changesets](https://github.com/atlassian/changesets) to automatically make updates to [CHANGELOG.md](https://github.com/primer/github-vscode-theme/blob/main/CHANGELOG.md) and publish a new version to the [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme).
