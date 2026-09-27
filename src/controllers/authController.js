const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

function sign(admin) {
  return jwt.sign({ id: admin._id, email: admin.email, name: admin.name }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin || !(await admin.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    const token = sign(admin);
    res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  res.json({ admin: req.admin });
}

module.exports = { login, me };
