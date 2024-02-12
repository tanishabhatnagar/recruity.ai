import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContext } from "@/context/AuthContext";
import Hero from "./pages/hero/Hero";
import NotFound from "./pages/notFound/NotFound";
import ForgotPassword from "./pages/authentication/forgotPassword/ForgotPassword";
import EmailVerification from "./pages/authentication/emailVerification/EmailVerification";
import ResetPassword from "./pages/authentication/resetPassword/ResetPassword";
import UserProfile from "./pages/authentication/userProfile/UserProfile";
import Contact from "./pages/contact/Contact";
import CodeCompletion from "./pages/utilityModule/CodeCompletion/CodeCompletion";
import Auth from "./utils/auth/AuthRouteManager";
import Signup from "./pages/authentication/signup/Signup";
import Signin from "./pages/authentication/signin/Signin";
import ChatInterface from "./pages/utilityModule/chatInterface/chatInterface";
const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ChakraProvider>
  );
};

const AppRoutes = () => {
  const { isAuthenticated, setCurrentUser, session } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Hero />} />
      <Route path="/contact" element={<Contact />} />

      {/* Authentication Routes */}
      {/* {!isAuthenticated && (
        <> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/accountVerification" element={<EmailVerification />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        {/* </>
      )} */}

      {/* Private Routes */}
      {isAuthenticated && (
        <>
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/chatAssistant" element={<CodeCompletion />} />
          <Route path="/chat" element={<ChatInterface />} />
          
        </>
      )}

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
