import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState([]);

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

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <ul>
        {userData.map((user, index) => (
          <div key={index}>
            {Object.entries(user).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value.toString()}
              </p>
            ))}
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
