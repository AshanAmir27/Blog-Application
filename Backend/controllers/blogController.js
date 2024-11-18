// const { find } = require("../models/Admin");
const Blog = require("../models/Blog"); // Your blog model

const CreateBlog = async (req, res) => {
  const { title, subtitle, content, image } = req.body; // Destructure image as a URL

  if (!title || !subtitle || !content || !image) {
    return res.status(400).json({ message: "All fields are required, including image URL" });
  }

  try {
    const newBlog = new Blog({ title, subtitle, content, image }); // Save the URL
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error. Could not create blog." });
  }
};


const DeleteBlog = async (req, res) => {
  const { id } = req.params; // Extract blog ID from request parameters

  console.log("Attempting to delete blog with ID:", id); // Debug log

  try {
    // Try to find and delete the blog by its ID
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      // If no blog was found to delete, return a 404 error
      console.log("Blog not found with ID:", id); // Debug log
      return res.status(404).json({ message: "Blog not found" });
    }

    // If blog is successfully deleted, return a success message
    console.log("Blog deleted successfully:", deletedBlog); // Debug log
    res
      .status(200)
      .json({ message: "Blog deleted successfully", blog: deletedBlog });
  } catch (error) {
    console.error("Error deleting blog:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error. Could not delete blog." });
  }
};

const UpdateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, content, image } = req.body;
  console.log("Request Body:", req.body);  // Log the incoming request body

  if (!title || !subtitle || !content) {
    return res.status(400).json({ message: "All fields (title, subtitle, content) are required" });
  }

  try {
    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      { title, subtitle, content, image },
      { new: true }
    );

    if (!updateBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog updated successfully", blog: updateBlog });
  } catch (error) {
    console.error("Error updating blog", error);
    return res.status(500).json({ message: "Server error, Could not update blog." });
  }
};


const ViewAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.status(200).json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    console.error("Error viewing blog", error);
    res.status(500).json({ message: "Server error, Could not view blog" });
  }
};

module.exports = {
  CreateBlog,
  DeleteBlog,
  UpdateBlog,
  ViewAllBlog,
};
