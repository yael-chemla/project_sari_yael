import { api } from "./api";

export const LoginUser = (email, password) => api.post("/auth/login", { email, password });
export const createUser = (userData) => api.post("/users", userData);

