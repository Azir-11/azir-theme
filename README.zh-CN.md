## Azir 主题（中文）

### 简介

本项目基于 GitHub Theme v6.3.5 修改而来，提供与 `github.com` 外观一致的多套主题。包含明亮、暗色、高对比度与色盲优化等多个变体，兼顾可读性与可访问性。

现已支持 **VS Code** 和 **Zed** 编辑器！

### 可用主题

- **Azir Light Default**
- **Azir Light High Contrast**（高对比）
- **Azir Dark Default**
- **Azir Dark High Contrast**（高对比）
- **Azir Dark Dimmed**（暗淡）

### 安装

#### VS Code

1. 打开 VS Marketplace 页面：[`GitHub Theme`](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme)
2. 点击"Install"。
3. 在 VS Code 中通过"首选项 → 颜色主题"选择想要的主题。

#### Zed

1. 将 `themes/zed/` 目录下的主题文件复制到 Zed 主题文件夹：
   - **macOS/Linux**: `~/.config/zed/themes/`
   - **Windows**: `%APPDATA%\Zed\themes\`
2. 打开 Zed 设置并选择 Azir 主题：
   - 打开命令面板 (`Cmd/Ctrl + Shift + P`)
   - 输入 "theme selector" 并选择
   - 从可用的 Azir 主题中选择

可用的 Zed 主题文件：
- 使用 `azir.json` 获取包含所有变体的组合主题文件
- 或使用单独的主题文件：
  - `light.json` - Azir Light Default
  - `light-high-contrast.json` - Azir Light High Contrast
  - `dark.json` - Azir Dark Default
  - `dark-high-contrast.json` - Azir Dark High Contrast
  - `dark-dimmed.json` - Azir Dark Dimmed

### 定制与覆盖

若仅做少量个性化调整，推荐在 VS Code 用户设置中覆盖颜色键值。参考官方文档"Color Theme"中关于自定义主题颜色的说明：`https://code.visualstudio.com/api/extension-guides/color-theme`。

### 本地开发

1. 克隆并用 VS Code 打开仓库。
2. 运行 `yarn` 安装依赖。
3. 开发调试：按 `F5` 启动"Extension Development Host"。
4. 在扩展宿主窗口中选择任一 "Azir …" 主题进行验证。
5. 修改主题源文件：推荐从 `src/theme.js` 入手。
6. 构建：
   - `yarn start` 热构建（监听 `src` 目录变化）
   - `yarn build` 生成 `themes/*.json`

### 打包与发布

- 本地打包 VSIX：`yarn build && yarn package`（产物位于 `build/github-vscode-theme.vsix`）
- 发布到市场（维护者专用）：`npm run prepublishOnly` 或 `vsce publish`

### 目录结构（摘）

```
src/
  colors.js           # 选择并微调 @primer/primitives 的主题色
  theme.js            # 现代主题定义与生成
  zed-theme.js        # Zed 编辑器主题生成
  index.js            # 入口，生成并写出各主题 JSON 到 ./themes
themes/               # 构建产物（运行构建脚本后生成）
  *.json              # VS Code 主题文件
  zed/                # Zed 主题文件
```

更多关于主题生成的实现细节，请见 `docs/architecture-zh.md`。

### 许可协议

基于 MIT 协议发布，详见仓库根目录的 `LICENSE`。
