import React, { useState, useEffect } from "react";
import axios from "axios";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Set this based on user info

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/blogs/all");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    // Fetch user info to determine if the user is an admin
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "admin") setIsAdmin(true);

    fetchBlogs();
  }, []);

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/blogs/create",
        { title, subTitle, content },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setBlogs([response.data.blog, ...blogs]);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/blogs/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <h1>Blog Management</h1>
      {isAdmin && (
        <div>
          <h2>Create a Blog</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <input value={subTitle} onChange={(e) => setSubTitle(e.target.value)} placeholder="SubTitle" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
          <button onClick={handleCreate}>Create</button>
        </div>
      )}
   
    </div>
  );
}

export default Blog;
