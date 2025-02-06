import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: ProtectedRouteProps) => {
  const token =
    useSelector((state: RootState) => state.auth.token) ||
    localStorage.getItem("token");

  return token ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;
