## Azir 的 VS Code 主题（中文）

### 简介

本项目基于 GitHub Theme v6.3.5 修改而来，提供与 `github.com` 外观一致的多套主题。包含明亮、暗色、高对比度与色盲优化等多个变体，兼顾可读性与可访问性。

### 可用主题

- **Azir Light Default**
- **Azir Light High Contrast**（高对比）
- **Azir Dark Default**
- **Azir Dark High Contrast**（高对比）
- **Azir Dark Dimmed**（暗淡）

### 安装

1. 打开 VS Marketplace 页面：[`GitHub Theme`](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme)
2. 点击“Install”。
3. 在 VS Code 中通过“首选项 → 颜色主题”选择想要的主题。

### 定制与覆盖

若仅做少量个性化调整，推荐在 VS Code 用户设置中覆盖颜色键值。参考官方文档“Color Theme”中关于自定义主题颜色的说明：`https://code.visualstudio.com/api/extension-guides/color-theme`。

示例（在 `settings.json` 中）：

```json
"workbench.colorCustomizations": {
  "editor.lineHighlightBackground": "#00000010"
}
```

### 本地开发

1. 克隆并用 VS Code 打开仓库。
2. 运行 `yarn` 安装依赖。
3. 开发调试：按 `F5` 启动“Extension Development Host”。
4. 在扩展宿主窗口中选择任一 “Azir …” 主题进行验证。
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
  index.js            # 入口，生成并写出各主题 JSON 到 ./themes
themes/               # 构建产物（运行构建脚本后生成）
```

更多关于主题生成的实现细节，请见 `docs/architecture-zh.md`。

### 许可协议

基于 MIT 协议发布，详见仓库根目录的 `LICENSE`。


