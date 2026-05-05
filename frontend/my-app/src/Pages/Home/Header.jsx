import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Hooks/UserContext.jsx";
import Info from "./Info.jsx";
import "../../CSS/Header.css";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <nav className="nav-links">
            <NavLink to={`/users/${user?.id}/home`}>Home</NavLink>
            <NavLink to={`/users/${user?.id}/todos`}>Todos</NavLink>
            <NavLink to={`/users/${user?.id}/posts`}>Posts</NavLink>
            <button className="info-btn" onClick={() => setShowInfo(true)}>
              Info
            </button>
          </nav>
        </div>

        <div className="header-right">
          <span className="user-name">Hello {user?.name || "Guest"}</span>
          {showInfo && <Info onClose={() => setShowInfo(false)} />}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
    </>
  );
}