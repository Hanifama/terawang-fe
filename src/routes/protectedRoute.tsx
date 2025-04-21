import React from "react";
import { Navigate } from "react-router-dom";
import { tokenService } from "../services/authService";


interface ProtectedRouteProps {
  component: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const isAuthenticated = !!tokenService.getUserToken(); 

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
