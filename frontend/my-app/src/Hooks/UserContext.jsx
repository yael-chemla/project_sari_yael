import { createContext, useState } from "react";

export const UserContext = createContext();

function getInitialUser() {
  try {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null; 
    return JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  
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