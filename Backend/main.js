import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Import the User model
import { User } from './models/User.js';

dotenv.config();

const app = express();
const port = 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Connect to MongoDB with error handling
mongoose.connect("mongodb://localhost:27017/Blog", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB:", error));

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization" header

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // Attach user data to the request
    next();
  });
};

// User Signup with Password Hashing
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error Registering User:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login endpoint (for generating JWT)
app.post("/login", async (req, res) => {
  console.log("Received login request data:", req.body); // Log incoming data

  try {
    const { email, password } = req.body;

    // Basic validation check
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");  // Log for debugging
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password matches the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If login is successful, generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch user profile data (protected route)
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Send the user data without sensitive information (e.g., password)
    res.json({
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ message: "Error fetching profile data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`);
});
