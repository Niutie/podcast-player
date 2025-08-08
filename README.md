# 培训播客（Cloudflare Pages 版本）

这是一个基于 React + Vite 的前端项目，已适配 Cloudflare Pages。

## 本地开发
```bash
npm i
npm run dev
```

## 构建
```bash
npm run build
# 产物在 dist/
```

## 部署到 Cloudflare Pages
1. 推送此仓库到 GitHub。
2. Cloudflare Dashboard → Pages → Create a project → Connect to Git → 选择此仓库。
3. Build settings：
   - Framework preset: **None**
   - Build command: **npm run build**
   - Build output directory: **dist**
4. 首次部署完成后即可访问。

> 注意
- 已自动修复 `@radix-ui/*` 等 import 中的 `@版本号` 后缀（0 处变更）。
- 依赖列表已最小化，若运行时报缺包，再补充安装相应依赖。
