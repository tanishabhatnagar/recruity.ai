import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "@/supabaseClient";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [session, setSession] = useState({})

  useEffect(() => {
    // Check the current session and update state
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session,"session")
      if (session) {
        setSession(session)
        setIsAuthenticated(true);
        setCurrentUser(session.user.email);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    });
  
    // Listen for auth state changes
    const { data: {subscription} } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        setCurrentUser(session?.user.email);
      }
    );
  
    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    session,
    signOut,
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
