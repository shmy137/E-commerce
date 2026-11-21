import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    setLoading(null);
  },[]);
  const login = async (email, password) => {
    const loggedUser = await loginUser(email, password);

    const { password: _, ...safeUser } = loggedUser;
    localStorage.setItem("user", JSON.parse(safeUser));
    setUser(safeUser);
    return safeUser;
  };




  const register = async (data) => {
    const newUser = await registerUser(data);
    const { password: _, ...safeUser } = newUser;

    return safeUser;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (<>
  <AuthContext.Provider value={{user, loading, login, register, logout}}> 
    {children}
  </AuthContext.Provider> 
  </>)
}
