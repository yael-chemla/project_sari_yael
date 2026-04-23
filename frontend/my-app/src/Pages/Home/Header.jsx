import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Hooks/UserContext.jsx";
import Info from "./Info.jsx";
import "../../CSS/Header.css";

export default function Header() {
  // השתמשנו ב-logout שבנינו ב-UserProvider
  const { user, logout } = useContext(UserContext);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // הפונקציה logout מה-Context כבר מטפלת במחיקת LS ואיפוס ה-State
    logout(); 
    navigate("/login"); 
  };

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <nav className="nav-links">
            {/* דף הבית / מידע כללי */}
            <NavLink to={`/users/${user?.id}/home`}>Home</NavLink>
            
            {/* דרישות שלב ד' */}
            <NavLink to={`/users/${user?.id}/home/todos`}>Todos</NavLink>
            
            {/* דרישות שלב ה' */}
            <NavLink to={`/users/${user?.id}/home/posts`}>Posts</NavLink>
            
            {/* אופציונלי - מהפרויקט הקודם */}
            <NavLink to={`/users/${user?.id}/home/albums`}>Albums</NavLink>
            
            {/* כפתור ה-Info לפי שלב ג' */}
            <button className="info-btn" onClick={() => setShowInfo(true)}>
              Info
            </button>
          </nav>
        </div>

        <div className="header-right">
          <span className="user-name">Hello {user?.name || "Guest"}</span>
          
          {/* מודאל המידע האישי */}
          {showInfo && <Info onClose={() => setShowInfo(false)} />}
          
          {/* כפתור יציאה לפי שלב ג' */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
    </>
  );
}