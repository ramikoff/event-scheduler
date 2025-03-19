import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
