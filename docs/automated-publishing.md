## 自动发布

本项目支持通过 GitHub Actions 在创建新的 git tag 时，自动发布到 VS Code Marketplace 和 OpenVSX。

### 设置 Secrets

为了使 GitHub Actions 能够发布扩展，你需要在仓库的 Secrets 中添加以下内容：

1. `VSCE_PAT`: 用于发布到 VS Code Marketplace 的个人访问令牌 (PAT)。
2. `OVSX_PAT`: 用于发布到 OpenVSX 的个人访问令牌 (PAT)。

### 发布流程

1. 本地创建一个新的版本 tag，例如 `git tag v1.2.3`。
2. 将 tag 推送到 GitHub，例如 `git push origin v1.2.3`。
3. GitHub Actions 会自动触发 `release` 工作流。
4. 该工作流会：
   - 检出代码并设置 Node.js/pnpm 环境。
   - 安装项目依赖。
   - 使用 `vsce` 将扩展发布到 VS Code Marketplace。
   - 使用 `ovsx` 将扩展发布到 OpenVSX。
