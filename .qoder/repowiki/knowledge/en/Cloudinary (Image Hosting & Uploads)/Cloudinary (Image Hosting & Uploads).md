---
kind: external_dependency
name: Cloudinary (Image Hosting & Uploads)
slug: cloudinary
category: external_dependency
category_hints:
    - vendor_identity
    - auth_protocol
scope:
    - '**'
---

### Cloudinary
- **Role**: Image upload storage for listing photos; multer uses `multer-storage-cloudinary` as the destination.
- **Auth**: Requires three credentials injected through environment variables — never hardcode.
- **File policy**: Only `png`, `jpg`, `jpeg` formats accepted per the storage params.