---
kind: configuration_system
name: dotenv-based Environment Configuration
category: configuration_system
scope:
    - '**'
source_files:
    - app.js
    - cloudConfig.js
    - init/index.js
    - .gitignore
    - package.json
---

The application uses a straightforward dotenv-based configuration system with no centralized config module. All runtime settings are loaded from environment variables via the `dotenv` package (v17.4.2), which is required at the top of both `app.js` and `init/index.js`. The `.env` file itself is gitignored (along with `.env.local`, `.env.production`, and `.env.*.local`) per `.gitignore`, so secrets must be provided externally in deployment environments.

**Loading strategy**
- `dotenv.config()` is called unconditionally in both entry points — the conditional `NODE_ENV !== "production"` check around it has no effect since the same call runs in both branches.
- There is no schema validation, default-value orchestration, or typed config object; each consumer reads `process.env` directly where needed.

**Environment variables consumed**
- `ATLASDB_URL` — MongoDB connection string (falls back to `mongodb://127.0.0.1:27017/wanderlust`)
- `SECRET` — Express session / MongoStore signing secret (fallback `mySecret@123`)
- `PORT` — HTTP server port (fallback `8080`)
- `NODE_ENV` — used only to toggle `cookie.secure` for production sessions
- `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` — Cloudinary credentials, read inside `cloudConfig.js`

**Where values are consumed**
- `app.js`: DB URL, session secret, cookie secure flag, server port.
- `cloudConfig.js`: Cloudinary credentials and storage params.
- `init/index.js`: DB URL (seed script).

**Conventions & gaps**
- No single source-of-truth config object; every module that needs a setting reaches into `process.env` directly, making it easy to miss defaults or introduce drift.
- Hardcoded fallbacks exist for sensitive values (`SECRET = "mySecret@123"`, local MongoDB URL), which is convenient for local dev but risky if accidentally committed.
- No config validation or startup-time checks — missing env vars surface as runtime errors later (e.g., Cloudinary upload failure).
- No feature-flag or per-environment profile mechanism beyond the bare `NODE_ENV` boolean.