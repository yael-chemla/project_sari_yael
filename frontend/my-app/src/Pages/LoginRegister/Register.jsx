import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser, createUser } from "../../API/users.js";
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

    // בדיקות תקינות בסיסיות
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // 1. בדיקה אם המשתמש קיים (לפי אימייל עכשיו)
      const userExists = await RegisterUser(email); 
      if (userExists) {
        setError("Email already registered");
        return;
      }

      // 2. יצירת האובייקט לשליחה לשרת
      const newUser = {
        name,
        email,
        password // עכשיו הסיסמה נשלחת כסיסמה לשרת!
      };

      // 3. יצירת המשתמש בשרת
      const createdUser = await createUser(newUser);

      // 4. שמירה ב-Context וב-LocalStorage
      login(createdUser);

      // 5. ניווט - אפשר לעבור ישירות לדף הבית או לדף הצלחה
      navigate(`/users/${createdUser.id}/home`);

    } catch (err) {
      setError("Registration failed. Please try again.");
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