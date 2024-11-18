import React, { useEffect, useState, useRef } from "react";
import TopHeader from "./TopHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  
  const [formValues, setFormValues] = useState({
    title: "",
    subTitle: "",
    content: "",
  });

  // Error and Loading state
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Editing blog state
  const [editingBlog, setEditingBlog] = useState(null); // Add state for editingBlog

  // Timer for inactivity
  const inactivityTimer = useRef(null); // Use useRef to persist timer across renders

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // const handleCancelLogout = () => {
    
  //   window.history.pushState(null, "", window.location.href); // Prevent back button navigation
  // };

  // const handleConfirmLogout = () => {
  //   handleLogout(); // Proceed with logout
  // };

  // Set up the inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = setTimeout(() => {
      alert("Session expired, Please log in again");
      handleLogout(); // Automatically log out after 10 seconds of inactivity
    }, 10000); // 10 seconds
  };

  // Listen for user activity (reset timer on any of these events)
  useEffect(() => {
    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // Clean up event listeners and timeout on unmount
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Fetch blogs from the server
  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        navigate("/"); // Redirect to login if no token is found
        return;
      }

      const response = await axios.get("http://localhost:4000/api/all-blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login page on token expiration
      } else {
        console.error("Error fetching Blog", error);
        setError("Failed to fetch blogs");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [navigate]); // Fetch blogs once when the component mounts

  // Handle Create Blog functionality
  const handleCreateBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/api/blog-create", // Adjust endpoint as necessary
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // After successfully creating the blog, fetch the updated blog list
      setFormValues({ title: "", subTitle: "", content: "" }); // Reset form values
      fetchBlogs(); // Refetch blogs to include newly created blog
      
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("Failed to create blog. Please try again.");
    }
  };

  // Handle Edit functionality
  const handleEdit = (blog) => {
    setEditingBlog(blog); // Set the blog to be edited
    setFormValues({
      title: blog.title,
      subTitle: blog.subTitle,
      content: blog.content,
    });
  };

  // Handle form value changes
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // Handle Update functionality
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Reset any previous errors

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/blog/${editingBlog._id}`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // After successful update, close the form and refresh the blog list
      setEditingBlog(null);
      fetchBlogs(); // Refetch blogs after update
      
    } catch (error) {
      console.error("Error updating blog:", error.response || error.message);
      setError("Failed to update blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete functionality
  const handleDelete = async (blogId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog._id !== blogId)); // Update _id here
      
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  if (!blogs) return <p>Loading...</p>;

  return (
    <section className="w-full mx-auto">
      <TopHeader />
      <div className="flex justify-center mt-10">
        <button
          className="bg-blue-400 text-white hover:bg-blue-500 px-5 py-2"
          onClick={() => navigate("/blog")}
        >
          New Blog
        </button>
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-8 w-4/5 mx-auto">
        {blogs.map((blog) => (
          <div key={blog._id} className="mb-4 p-5 shadow-lg border rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <h3 className="text-lg font-semibold mb-1 text-gray-600">
              {blog.subTitle}
            </h3>
            <p className="text-md text-gray-700 mb-4">{blog.content}</p>
            {/* Edit and Delete buttons */}
            <div>
              <button
                onClick={() => handleEdit(blog)}
                className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(blog._id)} // Use _id here
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Blog Form */}
      {editingBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-96">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Update Blog</h2>
              <button
                onClick={() => setEditingBlog(null)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={formValues.title}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="subTitle">
                  SubTitle
                </label>
                <input
                  id="subTitle"
                  type="text"
                  value={formValues.subTitle}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  value={formValues.content}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="5"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-400 text-white hover:bg-blue-500 px-5 py-2 rounded"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      )}

      
      
    </section>
  );
}

export default Profile;
