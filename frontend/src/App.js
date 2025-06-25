import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import { ThemeProvider } from "./ThemeContext";
import ProtectedRoute from "./ProtectedRoute";
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <header style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ color: "#388e3c", fontWeight: 700 }}>Smart Agri Hub</h1>
            <p style={{ color: "#555" }}>Your digital farming assistant, inspired by Plantix</p>
          </header>

          <nav style={{ display: "flex", gap: 16, padding: 16, justifyContent: "center" }}>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/settings">Settings</NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
