import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  createUser } from "../../API/users.js";
import { UserContext } from "../../Hooks/UserContext.jsx";
import "../../CSS/Register.css";

export default function Register() {
  const [name, setName] = useState(""); // הוספת שדה שם
  const [email, setEmail] = useState(""); // שימוש באימייל
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext); // שימוש בקיצור הדרך שבנינו
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. בדיקות צד לקוח (Client-side validation)
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // 2. שליחה לשרת - הפונקציה בשרת כבר תבדוק אם האימייל קיים
      const createdUser = await createUser({ name, email, password });

      if (createdUser) {
        login(createdUser);
        // שלב ג': ניווט לכתובת אינפורמטיבית עם שם המשתמש
        navigate(`/users/${createdUser.name}/home`);
      }
    } catch (err) {
      // טיפול בשגיאה מהשרת (למשל אימייל תפוס)
      setError("Registration failed. Email might already be in use.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <p className="error" style={{color: 'red'}}>{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Create Account</button>

        <p className="switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}