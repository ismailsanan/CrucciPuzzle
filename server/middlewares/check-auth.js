const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ data: "Unauthorized" });
  }
  next();
};

module.exports = isAuthenticated;