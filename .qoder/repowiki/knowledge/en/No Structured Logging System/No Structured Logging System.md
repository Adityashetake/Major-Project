---
kind: logging_system
name: No Structured Logging System
category: logging_system
scope:
    - '**'
source_files:
    - app.js
---

This repository does not implement a structured logging system. The application uses bare `console.log()` calls scattered across the codebase (e.g., in `app.js`, `init/index.js`, and controllers) for ad-hoc debugging output such as database connection status, server startup, and query results. There is no dedicated logger module, no logging framework dependency (no winston, pino, bunyan, morgan, or similar), no log-level configuration, no structured log fields, and no centralized log routing or sinks. Error handling renders an EJS error page rather than emitting structured logs. As a result, this category does not apply to the project.