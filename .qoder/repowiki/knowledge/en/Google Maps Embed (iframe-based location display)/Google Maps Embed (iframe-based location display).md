---
kind: external_dependency
name: Google Maps Embed (iframe-based location display)
slug: google-maps-embed
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
---

### Google Maps Embed
- **Role**: Displays a static map pinpointing each listing's location above the reviews section.
- **Integration**: Rendered as an `<iframe>` pointing at `https://maps.google.com/maps?q=<location>,<country>&output=embed` — no JS API key or SDK required.
- **Behavior note**: This is the embed URL form (no API key), not the Google Maps JavaScript API; it cannot be programmatically controlled beyond the query string.