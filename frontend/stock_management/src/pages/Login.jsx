// Import React and useState hook for state management
import React, { useState } from "react";
// Import useNavigate hook for navigation
import { useNavigate } from "react-router-dom";

// Define Login functional component
const Login = () => {
  // State to hold form data for username and password
  const [form, setForm] = useState({ username: "", password: "" });
  // State to hold error message
  const [error, setError] = useState("");
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Send POST request to login API
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token to localStorage on successful login
        localStorage.setItem("token", data.token);
        // Navigate to users page
        navigate("/users");
      } else {
        // Set error message from response or default
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      // Log error and set generic error message
      console.error("Login error:", err);
      setError("Unable to connect to server. Please try again later.");
    }
  };

  // Render login form UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        {/* Display error message if any */}
        {error && (
          <div className="text-red-500 bg-red-100 border border-red-200 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Username input field */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password input field */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

// Export Login component as default export
export default Login;
