import React from "react";
import { useLocation } from "react-router-dom";
import TopHeader from './TopHeader'
import { FaHeart } from "react-icons/fa";
function ReadBlog() {
  const location = useLocation();
  const { blog } = location.state || {};

  if (!blog) {
    return (
      <div>
        No blog details available. Please go back and select another blog to
        read.
      </div>
    );
  }

  return (
    <>
    <TopHeader/>
    <div className="flex flex-col min-h-screen">
      <section className="w-full max-w-4xl mx-auto mt-5 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          {blog.title}
        </h1>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto object-cover rounded-lg mb-4"
          />
        )}
        <p className="text-lg text-gray-800 leading-relaxed mt-10 text-justify">{blog.content}</p>
      </section>
    </div>
       {/* Footer Section */}
       <section className="bg-gray-900 text-white p-3 mt-10">
        <footer className="w-full">
          <p className="flex justify-center">
            Created with <FaHeart className="mx-2 mt-1 text-red-500" /> by Ashan
          </p>
        </footer>
      </section>
    </>
  );
}

export default ReadBlog;
