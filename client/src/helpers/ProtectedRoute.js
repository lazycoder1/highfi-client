import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();

  if (!state.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoute;
