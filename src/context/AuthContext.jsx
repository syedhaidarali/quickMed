/** @format */

// context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { UserLogin, UserSignUp, AdminLogin as AdminLoginAPI } from "../api/api";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await UserLogin(credentials);
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token);
      return { success: true, data: userData };
    } catch (err) {
      toast.error(err.message || "Login failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const SignUp = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await UserSignUp(formData);
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token);
      return { success: true, data: userData };
    } catch (err) {
      toast.error(err.message || "Signup failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const AdminLogin = async (credentials) => {
    setLoading(true);
    try {
      const adminData = await AdminLoginAPI(credentials);
      setAdmin(adminData.admin);
      localStorage.setItem("admin", JSON.stringify(adminData.admin));
      localStorage.setItem("token", adminData.token);
      return { success: true, data: adminData };
    } catch (err) {
      toast.error(err.message || "Admin login failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        error,
        Login,
        SignUp,
        AdminLogin,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
