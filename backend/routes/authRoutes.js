const express = require("express");
const {
  register,
  login,
  getAllUsers,
  updateUserRole,
} = require("../controllers/authController");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Authentication routes
router.post("/register", register);
router.post("/login", login);

// Admin routes
router.get("/users", authenticateToken, isAdmin, getAllUsers);
router.put("/users/:userId", authenticateToken, isAdmin, updateUserRole);

module.exports = router;
