module.exports = function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient role" });
    }

    next();
  };
};