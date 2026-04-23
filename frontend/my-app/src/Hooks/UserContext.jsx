import { createContext, useState } from "react";

export const UserContext = createContext();

function getInitialUser() {
  try {
    const savedUser = localStorage.getItem("user");
    // אם אין משתמש, נחזיר null - זה הרבה יותר נוח לבדיקה (if user)
    if (!savedUser) return null; 
    
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  // פונקציה לעדכון משתמש שגם שומרת ב-LocalStorage
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // פונקציית התנתקות (שלב ג' בדרישות - מחיקת LS)
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}