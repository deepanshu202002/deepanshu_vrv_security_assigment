const jwt = require("jsonwebtoken");

// Authenticate token
exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token." });
    req.user = user;
    next();
  });
};

// Admin authorization
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.redirect(`/login/${req.user.role}`);
  }
  next();
};
