exports.getProfile = async (req, res) => {
  return res.json({
    message: "You are authenticated",
    user: req.user,
  });
};

exports.getAdminWelcome = async (req, res) => {
  return res.json({
    message: "Welcome admin",
    user: req.user,
  });
};