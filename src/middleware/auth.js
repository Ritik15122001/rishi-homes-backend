const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    res.status(401);
    return next(new Error("Not authorized, no token"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401);
    next(new Error("Not authorized, invalid token"));
  }
}

function optionalAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next();
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // ignore invalid token on public routes
  }
  next();
}

module.exports = { requireAdmin, optionalAdmin };
