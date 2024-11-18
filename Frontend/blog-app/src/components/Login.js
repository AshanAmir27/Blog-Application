import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    let validationErrors = {};

    if (!formData.username) {
      validationErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
      console.error("Error details:", error.response?.data); // Log detailed error response
      alert(
        error.response?.data?.message || "Invalid credentials or server error."
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center px-4 bg-gray-800">
      <div className="flex justify-center">
        <div className="bg-white border border-gray-200 p-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-lg rounded-md">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
            Admin Login
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="pt-5">
              <label className="text-sm sm:text-base font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-gray-600 focus:outline-none"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-600 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field with Eye Icon Inside */}
            <div className="pt-5">
              <label className="text-sm sm:text-base font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border border-gray-300 rounded-md mt-1 pr-10 focus:ring-2 focus:ring-gray-600 focus:outline-none"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <div className="text-center pt-5">
              <button
                type="submit"
                className="bg-gray-800 text-white px-5 py-2 w-full sm:w-auto rounded-md hover:bg-gray-900 focus:ring-2 focus:ring-gray-600 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
