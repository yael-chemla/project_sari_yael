import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Hooks/UserContext";

export default function ProtectedRoute() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const authRoutes = ["/", "/login", "/register"];
  
  if (authRoutes.includes(location.pathname)) {
    return (
      <Navigate
        to={`/users/${user.username || user.id}/home`} 
        replace
      />
    );
  }
  return <Outlet />;
}