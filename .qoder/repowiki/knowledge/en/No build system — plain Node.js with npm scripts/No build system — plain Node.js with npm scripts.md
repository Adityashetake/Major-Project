---
kind: build_system
name: No build system — plain Node.js with npm scripts
category: build_system
scope:
    - '**'
source_files:
    - package.json
---

This repository does not contain a build system. There are no Makefiles, Dockerfiles, CI pipelines, bundler configs (Webpack/Rollup/Vite), or shell-based build scripts anywhere in the project. The application is a single-process Express server (`app.js`) launched directly via `node`. Build and run tooling is limited to two npm scripts declared in `package.json`: `npm start` runs `node app.js`, and `npm run dev` uses `nodemon` for hot-reload during development. Dependencies are managed through `package.json`/`package-lock.json` with an `engines.node >=18.0.0` constraint. Static assets under `public/` are served as-is by Express without any compilation or minification step.