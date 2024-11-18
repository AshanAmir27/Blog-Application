import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]); // State to store blogs
  const [error, setError] = useState(""); // State to store error message
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/blogs"); // API call to fetch blogs
        // Assuming response.data.blogs contains the array of blogs
        if (Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs); // Set the blogs if it's an array
        } else {
          setError("Invalid response format. Blogs data not found.");
        }
        setError(""); // Reset error if the data is valid
      } catch (error) {
        setError("Failed to fetch blogs. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading when the request completes
      }
    };

    fetchBlogs(); // Call the function to fetch blogs when the component mounts
  }, []);

  const handleReadBlog = (blog) => {
    navigate("/readBlog", {state: {blog}});
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Section */}
      <section>
        <nav className="bg-gray-900 text-white h-[60px] flex items-center">
          <div className="w-fit">
            <h1 className="text-lg md:text-2xl font-bold pl-4">Blog App</h1>
          </div>
        </nav>
      </section>

      {/* Blogs Section */}
      <section className="w-full max-w-7xl mx-auto mt-5 px-4 md:px-6 flex-grow">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left text-gray-800">
          Recent Blogs
        </h2>

        {/* Loading or Error States */}
        {isLoading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                {/* Display Blog Image */}
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                )}
                <div className="p-4">
                  {/* Blog Title */}
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {blog.title}
                  </h3>
                  {/* Blog Content Preview */}
                  <p className="text-sm md:text-base text-gray-700 mt-2 line-clamp-3">
                    {blog.content.split(" ").slice(0, 12).join(" ")}...
                  </p>

                  <button
                    className="mt-3 bg-gray-900 px-2 py-1 rounded-sm text-white"
                    onClick={()=>handleReadBlog(blog)}
                  >
                    Read Blog
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer Section */}
      <section className="bg-gray-900 text-white p-3 mt-10">
        <footer className="w-full">
          <p className="flex justify-center">
            Created with <FaHeart className="mx-2 mt-1 text-red-500" /> by Ashan
          </p>
        </footer>
      </section>
    </div>
  );
}

export default Home;
