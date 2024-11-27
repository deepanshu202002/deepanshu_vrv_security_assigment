const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register a new userr

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate inputs
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required." });
  }

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Email or username already exists. Please use a different one.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
};

// Login user

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Generate an access token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN } // Expire time (e.g., 1 hour)
    );

    res.status(200).json({
      message: `Welcome, ${user.username}!`,
      accessToken: token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
};

// Fetch all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Update user role (Admin only)
exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found." });

    user.role = "moderator";
    await user.save();

    res.status(200).json({ message: "User role updated to moderator." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user role." });
  }
};
