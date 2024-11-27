import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  if (!auth?.token) {
    return <Navigate to="/login" />;
  }

  if (auth?.user?.role !== role) {
    return <Navigate to={`/login/${auth.user.role}`} />;
  }

  return children;
};

export default ProtectedRoute;
