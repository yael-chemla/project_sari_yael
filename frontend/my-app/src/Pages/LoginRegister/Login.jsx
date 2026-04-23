import { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { LoginUser } from "../../API/users.js"; // שימוש בפונקציה מה-API
import { UserContext } from "../../Hooks/UserContext.jsx";
import "../../CSS/Login.css";

export default function Login() {
  const [email, setEmail] = useState(""); // שיניתי את השם ל-email שיהיה ברור
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login } = useContext(UserContext); // שימוש ב-login מה-Context
  const navigate = useNavigate();

  // אם המשתמש כבר מחובר, העברה לעמוד הבית
  if (user) {
    return <Navigate to={`/users/${user.id}/home`} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // קריאה לפונקציית ה-API שיצרנו
      const userData = await LoginUser(email, password);

      if (userData) {
        // עדכון ה-Context וה-LocalStorage (הפונקציה שבנינו ב-Provider)
        login(userData); 
        
        // ניווט לעמוד הבית
        navigate(`/users/${userData.id}/home`);
      }
    } catch (err) {
      // טיפול בשגיאה - הודעה מתאימה לפי שלב ג'
      setError(err.message || "Invalid email or password");
    }
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <h2>Welcome back</h2>

      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

      <input
        type="email" // שינוי ל-email לטובת ולידציה של דפדפן
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      <p className="switch">
        Don’t have an account? <Link to="/register">Create one</Link>
      </p>
    </form>
  );
}