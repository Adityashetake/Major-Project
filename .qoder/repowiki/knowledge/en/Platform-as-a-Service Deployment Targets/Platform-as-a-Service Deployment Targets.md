---
kind: external_dependency
name: Platform-as-a-Service Deployment Targets
slug: paas-providers
category: external_dependency
category_hints:
    - client_constraint
scope:
    - '**'
---

### PaaS Deployment Targets
- **Role**: Target deployment environments for this Express app.
- **Port**: Expects `process.env.PORT` (platform-provided) with fallback 8080.