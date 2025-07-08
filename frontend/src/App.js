import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import { ThemeProvider } from "./ThemeContext";
import ProtectedRoute from "./ProtectedRoute";
import { supabase } from "./supabaseClient";
import LandingPage from "./LandingPage";
import './App.css';

function AuthRedirect({ children, to }) {
  // Redirect authenticated users away from auth pages
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);
  if (loading) return null;
  if (session) return <Navigate to={to} replace />;
  return children;
}

function Navbar() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => listener?.subscription.unsubscribe();
  }, []);
  return (
    <nav style={{ display: "flex", gap: 16, padding: 16, justifyContent: "center" }}>
      <NavLink to="/" end>Home</NavLink>
      {!session && <NavLink to="/signup">Sign Up</NavLink>}
      {!session && <NavLink to="/signin">Sign In</NavLink>}
      {session && <NavLink to="/dashboard">Dashboard</NavLink>}
      {session && <NavLink to="/profile">Profile</NavLink>}
      {session && <NavLink to="/settings">Settings</NavLink>}
      {session && (
        <button
          style={{ marginLeft: 16, background: "#388e3c", color: "#fff", border: "none", borderRadius: 6, padding: "0.3rem 1rem", cursor: "pointer" }}
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/signin";
          }}
        >
          Log Out
        </button>
      )}
    </nav>
  );
}

function App() {
  // Thika is the only region for this app
  // Remove agent role everywhere (handled in SignUp, Profile, etc.)
  return (
    <ThemeProvider>
      <Router>
        <div>
          <header style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ color: "#388e3c", fontWeight: 700 }}>Smart Agri Hub - Thika</h1>
            <p style={{ color: "#555" }}>Your digital farming assistant for Thika region</p>
          </header>

          <Navbar />

          <Routes>
            <Route path="/" element={<LandingPage region="Thika" />} />
            <Route path="/signup" element={
              <AuthRedirect to="/dashboard">
                <SignUp region="Thika" allowedRoles={['farmer','admin']} />
              </AuthRedirect>
            } />
            <Route path="/signin" element={
              <AuthRedirect to="/dashboard">
                <SignIn />
              </AuthRedirect>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile region="Thika" />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={<Settings region="Thika" />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard region="Thika" />
              </ProtectedRoute>
            } />
            <Route path="*" element={<div style={{ textAlign: "center", marginTop: 40 }}>404 - Page Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
