## Azir 主题（中文）

### 简介

本项目基于 GitHub Theme v6.3.5 修改而来，提供与 `github.com` 外观一致的多套主题。支持 VS Code 和 Zed 编辑器，包含明亮、暗色、高对比度与色盲优化等多个变体，兼顾可读性与可访问性。

### 可用主题

- **Azir Light Default**
- **Azir Light High Contrast**（高对比）
- **Azir Dark Default**
- **Azir Dark High Contrast**（高对比）
- **Azir Dark Dimmed**（暗淡）

### 安装（VS Code）

1. 打开 VS Marketplace 页面：[`GitHub Theme`](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme)
2. 点击"Install"。
3. 在 VS Code 中通过"首选项 → 颜色主题"选择想要的主题。

### 安装（Zed 编辑器）

Zed 主题文件位于 `themes/zed/` 目录。安装步骤：

1. 打开 Zed 编辑器
2. 打开命令面板（macOS: `Cmd+Shift+P`，Linux/Windows: `Ctrl+Shift+P`）
3. 输入 "zed: open themes folder" 并选择
4. 将 `themes/zed/` 目录下的主题文件复制到 Zed 主题文件夹：
   - `azir-light-default.json`
   - `azir-light-high-contrast.json`
   - `azir-dark-default.json`
   - `azir-dark-high-contrast.json`
   - `azir-dark-dimmed.json`
5. 重启 Zed 或重新加载配置
6. 从主题选择器中选择您喜欢的 Azir 主题

或者，您可以手动将主题文件复制到：
- **macOS/Linux**: `~/.config/zed/themes/`
- **Windows**: `%APPDATA%\Zed\themes\`

### 定制与覆盖

若仅做少量个性化调整，推荐在 VS Code 用户设置中覆盖颜色键值。参考官方文档"Color Theme"中关于自定义主题颜色的说明：`https://code.visualstudio.com/api/extension-guides/color-theme`。

### 本地开发

1. 克隆并在 VS Code 中打开本仓库。
2. 运行 `pnpm install` 安装依赖。
3. 按 `F5` 打开包含当前扩展的新窗口。
4. 打开"首选项 → 颜色主题"并选择 Azir 主题进行测试。
5. 修改 [`/src/theme.js`](https://github.com/Azir-11/azir-theme/blob/master/src/theme.js) 文件：
   - **UI 部分**：关于状态栏、文件导航等外层 UI 的更改，请参阅"Theme Color"官方文档。
   - **语法部分**：若需修改代码高亮，可在扩展开发窗口中通过命令面板执行"Developer: Inspect Editor Tokens and Scopes"检查作用域。
6. 运行 `pnpm build` 更新主题。也可以运行 `pnpm start` 以自动重新构建主题（无需重新加载）。
7. 完成后提交更改并开 PR。

**备注**：
- 尽可能使用 Primer 的颜色系统，参见 [Primer's color system](https://primer.style/primitives/colors)。

### 发布（内部）

> 注意：发布新版本仅限维护者操作。

本仓库使用 [changesets](https://github.com/atlassian/changesets) 自动更新 [CHANGELOG.md](https://github.com/Azir-11/azir-theme/blob/main/CHANGELOG.md) 并发布新版本至 [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme)。
