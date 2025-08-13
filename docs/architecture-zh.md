## 项目架构与主题生成逻辑（中文）

本文解释该扩展的整体结构、现代主题生成路径，以及颜色来源与适配原则。本项目为 Azir Theme，基于 GitHub Theme v6.3.5 派生，已移除两款兼容（legacy）主题。

### 一、总体流程

1. 入口文件 `src/index.js` 使用 `getTheme`（来自 `src/theme.js`）构建现代主题。
2. 根据预设矩阵（light/dark、high_contrast、dimmed 等）批量生成主题对象（已移除 colorblind）。
3. 序列化为 JSON 写入 `./themes/*.json`，供 VS Code 使用（`package.json` 的 `contributes.themes` 映射这些文件）。

### 二、颜色来源与适配

- 现代主题直接使用 `@primer/primitives` 提供的颜色变量（`src/colors.js` 统一选择与轻量覆盖）。
- `src/colors.js` 会按传入的 `theme` 返回对应的 JSON，并对个别键做临时覆盖（如 `fg.default`、`btn` 等），以便与 GitHub Web 当前视觉保持一致。
- 在 `src/theme.js` 中，首先通过 `getColors(theme)` 取回原始颜色表，然后用 `changeColorToHexAlphas` 将所有可识别的颜色值转换为十六进制（VS Code 主题要求）。
- 通过 `themes(...)`/`lightDark(...)`/`onlyHighContrast(...)` 等辅助方法，为不同主题变体提供差异化取色策略。

关键要点：

- VS Code 主题需要大量 `workbench.*`、`editor.*`、`terminal.*` 等配色键，代码中显式维护这些键与取色逻辑，使主题在 UI 与语法高亮两方面都尽可能与 GitHub Web 保持一致。
- `semanticHighlighting: true` 打开语义高亮，`tokenColors` 定义语法作用域的前景色，优先使用 Primer 的色阶（如 `scale.blue[6]`）。

### 三、现代主题生成（src/theme.js）

入口：`getTheme({ theme, name })`

- `theme`：`"light" | "light_high_contrast" | "light_colorblind" | "dark" | "dark_high_contrast" | "dark_colorblind" | "dark_dimmed"`
- `name`：写入主题名，用于最终 JSON。

主要步骤：

1. 获取颜色：`const rawColors = getColors(theme)`。
2. 统一转为 hex：`const color = changeColorToHexAlphas(rawColors)`。
3. 便捷函数：
   - `themes(opts)`：从对象中挑选当前主题对应键值。
   - `lightDark(light, dark)`：为明暗两组主题同时指定取色。
   - `onlyHighContrast(color)`：仅应用于高对比主题。
   - `alpha(color, a)`：使用 `chroma-js` 添加透明度。
4. 返回对象包含：
   - `colors`：工作台、编辑器、状态栏、面板、滚动条、终端、Git 装饰、PeekView、设置页等键位。
   - `semanticHighlighting: true`。
   - `tokenColors`：语法高亮作用域，如 `comment`、`keyword`、`string`、`entity.name.function` 等。

输出：一个结构化的主题对象，最后由 `src/index.js` 写入 `themes/*.json`。

### 四、经典主题（已删除）

本派生版本不再生成或注册 `GitHub Light` 与 `GitHub Dark` 两款经典主题。`src/classic/*` 目录已移除，不参与构建与发布。

### 五、主题文件输出与 VS Code 识别

- 运行脚本：
  - `yarn start`：监听 `src` 变更，自动重建。
  - `yarn build`：执行 `node src/index.js` 并创建 `themes` 目录与 JSON 文件。
- VS Code 读取：`package.json` 中 `contributes.themes` 指向 `./themes/*.json`，VS Code 通过这些 JSON 渲染主题。

### 六、扩展与新增变体的建议

1. 在 `src/colors.js` 中新增/接入对应的 `@primer/primitives` 颜色 JSON 或自定义配色源。
2. 在 `src/index.js` 中调用 `getTheme({ theme: 'your_theme', name: 'Your Theme Name' })` 并写入 `themes/your-theme.json`。
3. 在 `package.json` 的 `contributes.themes` 中新增一条映射，指定 `label`、`uiTheme` 与 `path`。
4. 若需要差异化更多键位，在 `src/theme.js` 内通过 `themes(...)`、`lightDark(...)` 增强分支取色。

### 七、与 GitHub Web 对齐

`src/colors.js` 中保留了少量“临时覆盖”，用于在上游 `@primer/primitives` 尚未发布时，快速对齐 GitHub Web 的视觉。等上游同步后可移除这些覆盖，以降低维护成本。


