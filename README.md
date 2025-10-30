# Azir Theme

> Forked and adapted from GitHub Theme v6.3.5.

A beautiful theme for VS Code and Zed editor that aims to match GitHub's appearance.

## Install for VS Code

1. Go to [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme).
2. Click on the "Install" button.
3. Then [select a theme](https://code.visualstudio.com/docs/getstarted/themes#_selecting-the-color-theme). The Azir themes aim to match GitHub-like appearance:
    - `Azir Light Default`
    - `Azir Light High Contrast` ✨ new ✨
    - `Azir Dark Default`
    - `Azir Dark High Contrast`
    - `Azir Dark Dimmed`

## Install for Zed

Zed themes are available in the `themes/zed/` directory. To install:

1. Open Zed
2. Open the command palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Linux/Windows)
3. Type "zed: open themes folder" and select it
4. Copy the theme files from `themes/zed/` to your Zed themes folder:
   - `azir-light-default.json`
   - `azir-light-high-contrast.json`
   - `azir-dark-default.json`
   - `azir-dark-high-contrast.json`
   - `azir-dark-dimmed.json`
5. Restart Zed or reload your configuration
6. Select your preferred Azir theme from the theme selector

Alternatively, you can manually copy the theme files to:
- **macOS/Linux**: `~/.config/zed/themes/`
- **Windows**: `%APPDATA%\Zed\themes\`

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
