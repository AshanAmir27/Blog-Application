// models/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This links each blog to the User model
    required: true,
  },
  blogText: {
    type: String,
    required: true,
    maxlength: 1000, // Optional: Limit blog text length
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Blog = mongoose.model('Blog', blogSchema);
