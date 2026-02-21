import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

export default function RoleGate({
  children,
  allowedRoles = [],
  redirectTo = "/unauthorized",
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}