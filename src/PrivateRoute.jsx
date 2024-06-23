import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUserContext } from "./context/user_context";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useUserContext();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
