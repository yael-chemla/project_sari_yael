import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Hooks/UserContext";

export default function ProtectedRoute() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  // 1. בדיקה אם המשתמש מחובר בכלל
  // אם user הוא null (כמו שהגדרנו ב-Context המעודכן), הוא יישלח ל-Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. בדיקה אם המשתמש מנסה לגשת לנתיב לא רלוונטי כשהוא כבר מחובר
  // אם הוא מנסה להיכנס ל-Login, Register או לשורש (/) - נשלח אותו לדף הבית שלו
  const authRoutes = ["/", "/login", "/register"];
  
  if (authRoutes.includes(location.pathname)) {
    return (
      <Navigate
        to={`/users/${user.id}/home`}
        replace
      />
    );
  }

  // 3. הצגת התוכן (Outlet) אם המשתמש מחובר והנתיב תקין
  return <Outlet />;
}