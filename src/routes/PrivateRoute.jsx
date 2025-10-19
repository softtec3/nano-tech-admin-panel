import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  console.log(user);
  if (isLoading) return <LoadingSpinner />;
  if (user && user?.logged_user_email) {
    return children;
  }
  return <Navigate to={"/"} />;
};

export default PrivateRoute;
