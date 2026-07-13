class ExpressError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;   // ✅ Correct variable
  }
}

module.exports = ExpressError;
