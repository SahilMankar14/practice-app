import React, { useState } from "react";
import axios from "axios";
import "./SignUpForm.css";
import { Link, useNavigate } from "react-router-dom";

const SignInForm = ({ setAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the error message when the user starts typing
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://practice-app-server.vercel.app/signin",
        formData
      );

      if (response.status === 200) {
        const token = response.headers.get("Authorization");

        if (token) {
          localStorage.setItem("token", token);
          console.log("Sign in successfully");
          setAuthenticated(true);
          navigate("/home");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password.");
      } else if (error.response && error.response.status === 500) {
        setError("Internal server error. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="signin-container">
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />
        <button>Sign In</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="signin-footer">
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
