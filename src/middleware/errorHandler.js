function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const isMulterError = err.name === "MulterError";
  const status = isMulterError ? 400 : res.statusCode && res.statusCode !== 200 ? res.statusCode : err.status || 500;
  res.status(status).json({
    message: err.message || "Server error",
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {})
  });
}

module.exports = { notFound, errorHandler };
