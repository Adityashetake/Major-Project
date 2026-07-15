---
kind: dependency_management
name: npm-based dependency management with lockfile and engine pinning
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - package-lock.json
---

The project uses npm as its package manager for a single Node.js application. Dependencies are declared in the root `package.json` and pinned to exact transitive versions by `package-lock.json` (lockfileVersion 3). No vendoring, private registry, or monorepo tooling is present.

Key elements:
- **Manifest**: `package.json` declares runtime dependencies (Express 5, Mongoose 8, Passport + local strategy, Joi validation, Multer with Cloudinary storage, EJS templating) and devDependencies (`nodemon`).
- **Lockfile**: `package-lock.json` is committed alongside the manifest; all third-party packages resolve from `https://registry.npmjs.org/`, indicating no custom/private registry configuration.
- **Engine constraint**: The `engines.node` field pins the minimum Node version to `>=18.0.0`, ensuring reproducible installs across environments.
- **Scripts**: `start` runs `node app.js`; `dev` runs `nodemon app.js` for hot-reload during development.
- **No additional tooling**: There is no `.npmrc`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lock`, `vendor/`, or CI automation visible — updates are expected to be performed manually via `npm install` / `npm update` at the repository root.

Conventions developers should follow:
- Add new packages only in the root `package.json` under the appropriate `dependencies` or `devDependencies` section.
- Commit the updated `package-lock.json` whenever dependencies change so builds remain deterministic.
- Respect the `engines.node >= 18.0.0` constraint when choosing library versions.
- Avoid introducing private registries or `.npmrc` overrides unless explicitly required by the project.