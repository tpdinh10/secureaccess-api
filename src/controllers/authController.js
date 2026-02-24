const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return typeof password === "string" && password.length >= 8;
}

exports.register = async (req, res) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email format is invalid" });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      // role defaults to "user"
    });

    return res.status(201).json({
      message: "User created",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Email format is invalid" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};