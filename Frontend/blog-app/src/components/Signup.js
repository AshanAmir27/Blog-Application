import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For eye icons

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for controlling visibility of passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Handles changes for each input field
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Send data to the backend
    try {
      // Updated API endpoint to match your backend route
      const response = await axios.post("http://localhost:4000/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert(response.data.message);

      // Optionally navigate to the login page after successful signup
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Error registering user");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-[100vh] justify-center">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="mx-auto bg-slate-200 w-full max-w-md p-5">
          <h1 className="text-center text-2xl">Signup</h1>
          
          {/* Username Field */}
          <div className="pt-5">
            <label>Username</label>
            <input
              name="username"
              className="w-full px-3 py-2 border rounded"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div className="pt-5">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="pt-5 relative">
            <label>Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"} // Toggle input type
              className="w-full px-3 py-2 border rounded pr-10"
              value={formData.password}
              onChange={handleChange}
            />
            {/* Eye icon to toggle password visibility inside input */}
            <button
              type="button"
              className="absolute right-3 top-[56px] text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="pt-5 relative">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"} // Toggle input type
              className="w-full px-3 py-2 border rounded pr-10"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {/* Eye icon to toggle confirm password visibility inside input */}
            <button
              type="button"
              className="absolute right-3 top-[56px] text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="text-center pt-5">
            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-400 text-white px-5 py-2 hover:bg-blue-500"
            >
              Login
            </button>
            <button
              type="submit"
              className="bg-blue-400 text-white px-5 py-2 hover:bg-blue-500 ml-2"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
