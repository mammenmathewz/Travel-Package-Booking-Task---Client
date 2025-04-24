import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Services/Context/AuthContext"; 

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user?.token ? children : <Navigate to="/login" replace />;
};

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    return user?.token && user?.role === "admin" ? children : <Navigate to="/" replace />;
  };

  export const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    return user?.token ? <Navigate to="/" replace /> : children;
  };