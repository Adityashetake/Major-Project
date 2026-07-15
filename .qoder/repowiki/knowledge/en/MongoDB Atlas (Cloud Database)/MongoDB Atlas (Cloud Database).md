---
kind: external_dependency
name: MongoDB Atlas (Cloud Database)
slug: mongodb-atlas
category: external_dependency
category_hints:
    - vendor_identity
    - client_constraint
scope:
    - '**'
---

### MongoDB Atlas
- **Role**: Primary database for listings, users, and reviews; session store via connect-mongo.
- **Session persistence**: `connect-mongo` MongoStore configured with the same `dbUrl`, so user sessions survive process restarts.
- **Deployment constraint**: Production deployments require a real Atlas connection string; free-tier clusters work but have network/region constraints.
- **Verify exact API/params against official docs**