import React, { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
// ...other imports...

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    getSession();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null; // or a loading spinner
  if (!session) return <Navigate to="/signin" replace />;
  return children;
}

<Routes>
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
  <Route path="/profile" element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } />
  {/* ...other routes... */}
</Routes>