# 班级抽奖网页 (Lucky for Classmates)

本项目是一个功能丰富且体验流畅的班级抽奖网页，采用现代化的 React + TypeScript + Vite 技术栈构建，并配备完善的工程化和 GitHub Actions 自动化部署流水线。

## 环境要求

- **Node.js**: v18.0.0 或更高版本 (推荐 v20+)
- **包管理器**: 推荐使用 `npm` 或 `pnpm`

## 本地启动开发环境

1. **安装依赖**
   请在项目根目录（`package.json` 同级）下，执行以下指令：
   ```bash
   npm install
   ```
2. **启动本地开发服务器**
   执行以下指令以启动开发阶段：
   ```bash
   npm run dev
   ```
   *控制台会输出本地访问地址（类似 `http://localhost:5173`）。打开浏览器进入该地址即可进行实时开发调试（支持热更新）。*

## 编译打包与本地预览

在每次提交重大改动或进行构建调试时，请确保代码能够无错编译。验证方法如下：

1. **执行编译构建 (`build`)**
   ```bash
   npm run build
   ```
   *该命令将首先进行 `tsc -b` 的严格 TypeScript 语法类型检查。如果一切无误，则执行 Vite 的生产环境应用打包流程，并将所有静态文件产出至 `dist` 目录。*

2. **预览构建产物 (`preview`)**
   ```bash
   npm run preview
   ```
   *该命令将启动一个静态文件服务器以代理并提供刚刚打包好的 `dist` 内容。可以在不依赖开发服务器的情况下，真实地验证打包后的网页路由、样式加载是否表现正常。*

## CI/CD 自动化部署 (GitHub Actions)

由于本项目已经内置基于 [GitHub Actions](https://github.com/features/actions) 的自动化发布流（`.github/workflows/deploy.yml`）。无需手动上传构建目录，它能在您将代码 Push 至 `main` 分支时，为您提供零配置的一键部署体验。

### 运作机制
1. 监听推送到 `main` 分支的 Commit。
2. 自动拉取代码并准备好 Node.js v20 环境。
3. 执行 `npm ci` 安装项目依赖。
4. 执行 `npm run build` 正式打出构建产物 (`dist` 目录)。
5. 将 `dist` 作为 Pages 组件上传，并最终通过 GitHub Pages Deploy 发布到公网。

### 如何在 GitHub 仓库中开启？
为了让自动化工作流能够正常生效运行并暴露页面，请务必在您的 GitHub 仓库的 **Settings (设置)** -> **Pages** (侧边栏) 中，进行如下设定：

- 在 **Build and deployment** 区块下，找到 **Source** 下拉菜单。
- 默认它应该是 "Deploy from a branch"，请将它更改为：**GitHub Actions**。

一旦更改，下一次触发 `main` 推送时，整个流水线即可顺畅运行并使您可以访问最终公开的抽奖网页应用地址！
