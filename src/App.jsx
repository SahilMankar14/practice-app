import "./App.css";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Home from "./components/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated("true");
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!authenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<SignInForm setAuthenticated={setAuthenticated} />}
      />
      <Route path="/signup" element={<SignUpForm />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
