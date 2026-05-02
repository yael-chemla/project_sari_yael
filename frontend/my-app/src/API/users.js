import { api } from "./api";

// התחברות
export const LoginUser = (email, password) => api.post("/auth/login", { email, password });
// יצירת משתמש (הפונקציה שנקראת מה-Register.jsx)
export const createUser = (userData) => api.post("/users", userData);

// שליפת משתמש לפי ID
export const getUserById = (id) => api.get(`/users/${id}`);