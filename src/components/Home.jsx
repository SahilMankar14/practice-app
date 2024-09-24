import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({ setAuthenticated }) => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token:", token);

        const response = await axios.get(
          "http://localhost:5000/get-user-data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setUserData(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated("false");
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="header">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="user-container">
        <h1>Welcome to the Home Page</h1>

        <div className="card-container">
          {userData.map((user, index) => (
            <div className="card" key={index}>
              <h4>
                <strong>FullName:</strong> {user.fullName}
              </h4>
              <h4>
                <strong>Email:</strong> {user.email}
              </h4>
              <h4>
                <strong>Date of Birth:</strong> {user.dateOfBirth}
              </h4>
              <h4>
                <strong>Age:</strong> {user.age}
              </h4>
              <h4>
                <strong>Gender:</strong> {user.gender}
              </h4>
              <h4>
                <strong>Role:</strong> {user.role}
              </h4>
              <h4>
                <strong>Mobile No:</strong> {user.mobileno}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
