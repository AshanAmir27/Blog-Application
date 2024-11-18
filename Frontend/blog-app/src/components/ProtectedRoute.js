import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    // Set up a listener to detect storage changes
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    // Listen for changes to localStorage
    window.addEventListener("storage", handleStorageChange);

    // Clean up the listener on component unmount
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // If no token, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
