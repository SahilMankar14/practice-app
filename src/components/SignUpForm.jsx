import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SignUpForm.css";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const initialState = {
    name: "",
    middleName: "",
    lastName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    age: 0,
    gender: "",
    role: "",
    mobileno: "",
    profilePhoto: null,
  };
  const [formData, setFormData] = useState(initialState);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      fullName:
        `${prevState.name} ${prevState.middleName} ${prevState.lastName}`.trim(),
    }));
  }, [formData.name, formData.middleName, formData.lastName]);

  useEffect(() => {
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();

      let calculateAge = today.getFullYear() - dob.getFullYear();
      const monthDifference = today.getMonth() - dob.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < dob.getDate())
      ) {
        calculateAge--;
      }

      setFormData({ ...formData, age: calculateAge });
    }
  }, [formData.dateOfBirth]);

  const passwordValidator = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one digit.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handleChange = (e) => {
    if (e.target.name === "password") {
      const error = passwordValidator(e.target.value);
      setPasswordError(error);
    }

    if (e.target.name === "confirmPassword") {
      if (e.target.value !== formData.password) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }

    if (e.target.name === "profilePhoto") {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePhoto: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    // Append form data fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key !== "profilePhoto") {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.profilePhoto) {
      formDataToSend.append("profilePhoto", formData.profilePhoto);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Congratulations! You have successfully signed up.");

      // Reset the form state including the profile photo and preview
      setFormData(initialState);
      setPreviewUrl(null);

      // Reset the file input field manually
      document.getElementById("profilePhoto").value = null;
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <label htmlFor="name">
          First Name<span className="required-asterisk">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>
          Middle Name <span className="required-asterisk">*</span>
        </label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          required
        />
        <label>
          Last Name <span className="required-asterisk">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <label>
          Full Name <span className="required-asterisk">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          readOnly
        />
        <label>
          Email <span className="required-asterisk">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>
          Password <span className="required-asterisk">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
        <label>
          Confirm Password <span className="required-asterisk">*</span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {confirmPasswordError && (
          <div className="error-message">{confirmPasswordError}</div>
        )}
        <label>
          Date of Birth <span className="required-asterisk">*</span>
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <label>Age </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          readOnly
        />
        <label>
          Gender <span className="required-asterisk">*</span>
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label>
          Role <span className="required-asterisk">*</span>
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="developer">Developer</option>
          <option value="tester">Tester</option>
          <option value="Other">Other</option>
        </select>
        <label>Mobile No</label>
        <input
          type="number"
          id="mobileno"
          name="mobileno"
          value={formData.mobileno}
          onChange={handleChange}
        />
        <label>
          Upload Photo <span className="required-asterisk">*</span>
        </label>
        <input
          type="file"
          id="profilePhoto"
          name="profilePhoto"
          onChange={handleChange}
          accept="image/*"
          required
        ></input>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Profile preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              margin: "12px",
            }}
          />
        )}
        <button>Submit</button>
      </form>
      <div className="signup-footer">
        <p>
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
