import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <LoadingSpinner />;
  if (user && user?.logged_user_email && user?.logged_user_role == "admin") {
    return children;
  }
  return <Navigate to={"/"} />;
};

export default AdminRoute;
