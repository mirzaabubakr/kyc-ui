import { JSX } from "react";
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
interface ProtectedRouteProps {
  children: JSX.Element;
  roles?: string[];
}

export default function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("authToken") || "";
  const decodedUser: any = jwtDecode(token);
  if (!decodedUser) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(decodedUser.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
