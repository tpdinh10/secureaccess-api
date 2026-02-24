const User = require("../models/User");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id email role createdAt updatedAt");
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Role must be 'user' or 'admin'" });
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select("_id email role createdAt updatedAt");

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "Role updated", user: updated });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};