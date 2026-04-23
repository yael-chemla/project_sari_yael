import { api } from "./api";

// 1. פונקציית התחברות
export const LoginUser = async (email, password) => {
  // שולחים POST לשרת לנתיב /login
  const response = await api.post("/login", { email, password });
  
  // ב-Axios הנתונים נמצאים בתוך data. 
  // אם השרת מחזיר { user: {...} }, ניגש כך:
  return response.data.user || response.data; 
};

// 2. קבלת משתמש לפי ID
export const getUserById = (id) => api.get(`/users/${id}`);

// 3. רישום משתמש (הפונקציה ש-Register.jsx קוראת לה)
export const RegisterUser = async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
};

/** * תיקון השגיאות מול Vite:
 * הוספת הפונקציות החסרות ש-Vite צעק עליהן
 */

// 4. יצירת משתמש (לפעמים דפים משתמשים בשם הזה במקום ב-RegisterUser)
export const createUser = async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
};

// 5. עדכון פרטי משתמש (נדרש עבור RegisterComplete.jsx)
export const updateUser = async (id, updatedData) => {
    // ב-MySQL אנחנו משתמשים ב-PUT לעדכון
    const response = await api.put(`/users/${id}`, updatedData);
    return response.data;
};