import React, { useState } from "react";
import BlogCreate from "./BlogCreate";
import BlogList from "./BlogList";
import BlogEdit from "./BlogEdit";
import { useNavigate } from "react-router-dom";
import { CiViewTimeline } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi"; // Hamburger Icon

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("blogs");
  const [editBlogId, setEditBlogId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar visibility
  const navigate = useNavigate();

  const handleLinkClick = (component) => {
    setActiveComponent(component);
  };

  const handleEditClick = (blogId) => {
    setActiveComponent("edit");
    setEditBlogId(blogId);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed h-full bg-gray-900 text-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className={`pt-6 pl-6 ${!isSidebarOpen && "hidden"}`}>
          <h1 className="text-3xl font-bold mb-8">Admin</h1>
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick("blogs")}
                  className="flex items-center text-lg font-medium hover:bg-slate-500 px-3 py-1 hover:text-white transition duration-300 ease-in-out w-full text-left"
                >
                  <CiViewTimeline />
                  <span className="pl-2 font-semibold text-lg">View Blogs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("create")}
                  className="flex items-center text-lg font-medium hover:bg-slate-500 px-3 py-1 hover:text-white transition duration-300 ease-in-out w-full text-left"
                >
                  <IoCreateOutline />
                  <span className="pl-2">Create Blog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLogout()}
                  className="flex items-center text-lg font-medium hover:bg-slate-500 px-3 py-1 hover:text-white transition duration-300 ease-in-out w-full text-left"
                >
                  <IoIosLogOut />
                  <span className="pl-2">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Hamburger Button */}
        <div className="bg-white p-4 shadow-md">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 hover:text-gray-600 focus:outline-none"
          >
            <HiOutlineMenuAlt3 className="text-2xl" />
          </button>
        </div>

        {/* Render Components */}
        <div className="p-8 bg-white">
          {activeComponent === "blogs" && <BlogList onEdit={handleEditClick} />}
          {activeComponent === "create" && <BlogCreate />}
          {activeComponent === "edit" && <BlogEdit blogId={editBlogId} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
