import { useState } from "react";
import { AuthContext } from "./auth";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const isAuthenticated = !!token;

  const login = (newToken) => {
    // Simpan token JWT asli ke Local Storage
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    // Hapus token dan data user saat user keluar
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};