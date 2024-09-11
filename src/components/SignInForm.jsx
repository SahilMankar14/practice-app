import React, { useState } from "react";
import axios from "axios";
import "./SignUpForm.css";

const SignInForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the error message when the user starts typing
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/signin",
        formData
      );

      if (response) {
        alert("Sign in successfully");
      } else {
        alert("User not found");
      }
    } catch (error) {
      alert("User not found");
      console.log("Error:", error);
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
    </div>
  );
};

export default SignInForm;
