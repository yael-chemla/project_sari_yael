import { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { LoginUser } from "../../API/users.js";
import { UserContext } from "../../Hooks/UserContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to={`/users/${user.name}/home`} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userData = await LoginUser(email, password);
      if (userData && userData.user) { // השרת שלך מחזיר {user: {...}}
        login(userData.user);
        console.log("User from server:", userData.user); // תבדקי אם יש שם id
        navigate(`/users/${userData.user.name}/home`);
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
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
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}