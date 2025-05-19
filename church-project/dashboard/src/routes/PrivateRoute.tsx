import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();

//   if (!user) {
//     // Not logged in — redirect to login
//     return <Navigate to="/login" replace />;
//   }

  return <>{children}</>;
};

export default PrivateRoute;
