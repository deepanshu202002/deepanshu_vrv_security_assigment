const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    credentials: true, // Allow cookies and authorization headers
  })
);
// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected successfully"))
  .catch((err) => console.error(err));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
