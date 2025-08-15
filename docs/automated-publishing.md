## 自动发布

本项目现在支持通过 GitHub Actions 自动发布到 VS Code Marketplace 和 OpenVSX。

### 设置 Secrets

为了使 GitHub Actions 能够发布扩展，你需要在仓库的 Secrets 中添加以下内容：

1. `VSCE_PAT`: 用于发布到 VS Code Marketplace 的个人访问令牌 (PAT)。
2. `OVSX_PAT`: 用于发布到 OpenVSX 的个人访问令牌 (PAT)。

### 发布流程

1. 当你合并一个包含 Changeset 的 Pull Request 到 `main` 分支时，Changesets bot 会自动生成一个版本发布 Pull Request。
2. 合并这个版本发布 Pull Request。
3. GitHub Actions 会自动触发 `release` 工作流，该工作流会：
   - 使用 `changeset publish` 命令发布新的版本到 npm (如果需要)。
   - 构建 VS Code 扩展包。
   - 使用 `vsce` 将扩展发布到 VS Code Marketplace。
   - 使用 `ovsx` 将扩展发布到 OpenVSX。