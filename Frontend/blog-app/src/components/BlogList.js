import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function BlogList() {
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [selectedBlog, setSelectedBlog] = useState(null); // Selected blog for editing
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // For displaying the existing image URL (if any)
  const [newImageUrl, setNewImageUrl] = useState(""); // For handling new image URL input
  const [isSubmitting, setIsSubmitting] = useState(false); // Flag for submit state

  // Fetch blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/blogs");
        setBlogs(response.data.blogs); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle deleting a blog
  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this blog?"
      );
      if (confirmation) {
        await axios.delete(`http://localhost:4000/api/delete-blog/${id}`);
        setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove the deleted blog from the state
        alert("Blog deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog, please try again.");
    }
  };

  // Open the modal with selected blog data for updating
  const handleUpdate = (blog) => {
    setSelectedBlog(blog);
    setTitle(blog.title);
    setSubtitle(blog.subtitle);
    setContent(blog.content);
    setImageUrl(blog.image || ""); // Set the image URL (if any)
    setNewImageUrl(""); // Reset newImageUrl input
    setShowModal(true); // Show the modal
  };

  // Handle form submission to update blog
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare the data to send
    const updatedBlog = {
      title,
      subtitle,
      content,
      image: newImageUrl || imageUrl, // Use new image URL or the existing one
    };

    try {
      // Send the data as JSON
      await axios.put(
        `http://localhost:4000/api/update-blog/${selectedBlog._id}`,
        updatedBlog, // Send as JSON
        { headers: { "Content-Type": "application/json" } }
      );

      // Optimistically update the blog in the list
      setBlogs(
        blogs.map((blog) =>
          blog._id === selectedBlog._id
            ? { ...blog, title, subtitle, content, image: updatedBlog.image }
            : blog
        )
      );

      setShowModal(false);
      alert("Blog updated successfully");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Error updating blog, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto pb-7">
      {Array.isArray(blogs) && blogs.length > 0 ? (
        <div className="overflow-x-hidden w-4/5 mx-auto">
          <h2 className="text-2xl font-semibold pb-5 text-left">Blogs</h2>
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-r border-gray-300 px-4 py-2 text-left">
                  Title
                </th>
                <th className="border-r border-gray-300 px-4 py-2 text-left">
                  Category
                </th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <td className="border-r border-gray-300 px-4 py-3">
                    {blog.title}
                  </td>
                  <td className="border-r border-gray-300 px-4 py-3">
                    {blog.subtitle}
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center space-x-2">
                    <button
                      onClick={() => handleUpdate(blog)}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <FaRegEdit />
                      <span className="ml-2 hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <MdDelete />
                      <span className="ml-2 hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs found.</p>
      )}

      {/* Modal for updating blog */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-4/5 max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Blog
            </h2>
            <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                ></textarea>
              </div>

              {/* Image URL input */}
              <div className="mb-4">
                <label className="block text-gray-700">Enter Image URL</label>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md"
                >
                  {isSubmitting ? "Updating..." : "Update Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogList;
