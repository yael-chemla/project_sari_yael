import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../API/users.js";
import { UserContext } from "../../Hooks/UserContext.jsx";
import "../../CSS/RegisterComplete.css";

export default function RegisterComplete() {
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext); // שימוש ב-login מה-Context

  const [errors, setErrors] = useState({});

  // צמצמתי את השדות למה שסביר שיהיה בטבלה שלך ב-MySQL
  const [form, setForm] = useState({
    name: user?.name || "", 
    email: user?.email || "",
    phone: "",
    city: "",
    street: "",
  });

  // הגדרת שדות חובה (צמצמתי כדי להקל על המשתמש ועל הטבלה)
  const REQUIRED_FIELDS = ["name", "email", "phone", "city", "street"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let tempErrors = {};
    REQUIRED_FIELDS.forEach((field) => {
      if (!form[field]?.trim()) {
        tempErrors[field] = "שדה חובה";
      }
    });
    // ולידציות נוספות נשארות אותו דבר
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // שליחת המידע בצורה שטוחה לשרת (Flat structure)
      // השרת יקבל req.body עם השדות האלו ויעדכן את ה-SQL
      const updatedUser = await updateUser(user.id, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        street: form.street
      });

      // עדכון ה-Context וה-LocalStorage
      login(updatedUser);

      // ניווט לעמוד הבית של המשתמש
      navigate(`/users/${updatedUser.id}/home`);
    } catch (err) {
      setErrors({ general: "שגיאה בשמירת הנתונים. נסה שוב מאוחר יותר." });
    }
  };

  return (
    <div className="register-complete-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Complete Your Profile</h2>
        <p>Please provide a few more details to get started.</p>
        
        {errors.general && <p className="error">{errors.general}</p>}

        <div className="form-grid">
          {[
            ["name", "Full Name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["city", "City"],
            ["street", "Street"],
          ].map(([key, label]) => (
            <div key={key} className="input-field">
              <input
                name={key}
                placeholder={label}
                value={form[key]}
                onChange={handleChange}
              />
              {errors[key] && <p className="error-text">{errors[key]}</p>}
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">Finish Registration</button>
      </form>
    </div>
  );
}