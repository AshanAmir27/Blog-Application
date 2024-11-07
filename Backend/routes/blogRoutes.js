// routes/blogRoutes.js
import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js'; // Import the auth middleware
import { Blog } from '../models/Blog.js';

const router = express.Router();

// Post a new blog
router.post('/blog', authenticateToken, async (req, res) => {
  try {
    const { blogText } = req.body;
    if (!blogText || blogText.trim() === '') {
      return res.status(400).json({ message: 'Blog text is required' });
    }

    const userId = req.user.id;  // Extract user ID from the token (authenticated user)

    // Create a new blog post
    const newBlog = new Blog({
      userId,   // Link to the user
      blogText, // Blog content
    });

    await newBlog.save();  // Save the blog to the database

    res.status(200).json({ message: 'Blog uploaded successfully' });
  } catch (error) {
    console.error('Error uploading blog:', error);
    res.status(500).json({ message: 'Error uploading blog' });
  }
});

export default router;
