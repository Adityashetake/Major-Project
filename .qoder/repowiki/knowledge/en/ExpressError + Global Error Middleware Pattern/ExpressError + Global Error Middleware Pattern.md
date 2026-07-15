---
kind: error_handling
name: ExpressError + Global Error Middleware Pattern
category: error_handling
scope:
    - '**'
source_files:
    - utils/ExpressError.js
    - utils/wrapAsync.js
    - middleware.js
    - app.js
    - views/error.ejs
---

The application uses a lightweight, convention-based error handling strategy built around three core pieces: a custom ExpressError class, an async wrapper for route handlers, and a single global Express error-handling middleware.

Custom error type — utils/ExpressError.js defines class ExpressError extends Error that attaches a numeric statusCode alongside the message. All validation failures in shared middleware (middleware.js) throw this typed error with a 400 status and a comma-joined Joi validation message, so callers never need to handle validation errors explicitly.

Async handler wrapping — utils/wrapAsync.js exports a higher-order function that returns an Express middleware which .catch(next) on the promise returned by the wrapped handler. This lets route controllers write plain async (req,res,next) => { ... } functions without try/catch blocks; any rejected promise is forwarded to the global error handler automatically.

Global error middleware — app.js registers a standard four-argument (err, req, res, next) Express error handler as the last middleware. It destructures { statusCode = 500, message = "Something went wrong" } from the thrown error object and renders the views/error.ejs template via res.status(statusCode).render("error", { err }). A catch-all app.all(/.*/, ...) route throws new ExpressError(404, "page not found") for unmatched URLs, ensuring every unknown path follows the same error path.

Flash messages for non-fatal flows — Authentication and authorization checks in middleware.js do not throw; instead they call req.flash("error", ...) and redirect, relying on the session-flash middleware (configured in app.js) to surface the message through res.locals.error into the EJS layout.

No panics or recover — The codebase does not use throw new Error(...) outside of ExpressError, nor does it use try/catch inside controllers or process.on('uncaughtException'). Errors are either typed ExpressError instances (propagated to the global handler) or flash-and-redirect flows.