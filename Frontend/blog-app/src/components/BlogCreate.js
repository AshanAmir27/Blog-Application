import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BlogCreate() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // For storing image URL
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const blogData = {
      title,
      subtitle,
      content,
      image: imageUrl, // Use the URL instead of base64
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/create-blog",
        blogData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Blog created successfully!");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error(
        "Error creating blog:",
        error.response?.data || error.message
      );
      alert("Error creating blog, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-24">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
        Create a New Blog
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Image URL Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter the image URL"
          />
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter the title"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            value={subtitle}
            placeholder="Enter the category"
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Enter the content"
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-fit py-3 px-6 bg-gray-700 text-white font-semibold text-lg rounded-md shadow-md hover:bg-gray-900 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

export default BlogCreate;
