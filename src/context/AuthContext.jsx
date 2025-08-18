/** @format */

"use client";
import { removeHeaders, setHeaders } from "../helpers";
import { authService } from "../services";
import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [singleUserData, setSingleUserData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);
  console.log(allUsers);
  const validateSession = async () => {
    try {
      const { data } = await authService.validateToken();
      setUser(data.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    validateSession();
    getAllUsers();
  }, []);

  const signIn = async (credentials, navigate) => {
    setLoading(true);
    try {
      const { data } = await authService.signInRequest(credentials);
      setHeaders(data.data.token);
      setUser(data?.data?.user);
      setIsAuthenticated(true);
      toast.success("Login successful");
      if (navigate) {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.data || "Login failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const signUpFun = async (credentials, navigate) => {
    console.log(credentials);
    setLoading(true);
    try {
      const { data } = await authService.signUpRequest(credentials);
      setUser(data.data.user);
      setIsAuthenticated(true);
      toast.success("Signup successful");
      if (navigate) {
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.data || "Signup failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const ForgotPassword = async (credentials, navigate) => {
    setLoading(true);
    try {
      const { data } = await authService.forgotPassword(credentials);
      toast.success("Password reset email sent");
      if (navigate) {
        navigate("/reset-password");
      }
    } catch (err) {
      toast.error(err.response?.data?.data || "Failed to send reset email");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const ResetPassword = async (credentials, navigate) => {
    setLoading(true);
    try {
      const { data } = await authService.resetPassword(credentials);
      toast.success("Password reset successful");
      if (navigate) {
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.data || "Password reset failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const ChangePassword = async (credentials, navigate) => {
    setLoading(true);
    try {
      const { data } = await authService.changePassword(credentials);
      toast.success("Password changed successfully");
      if (navigate) {
        navigate("/profile");
      }
    } catch (err) {
      toast.error(err.response?.data?.data || "Password change failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (navigate) => {
    setLoading(true);
    try {
      removeHeaders();
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Sign Out Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const { data } = await authService.allUsers();
      setAllUsers(data.data);
      return data.data;
    } catch (err) {
      toast.error(err.response?.data?.data || "Failed to fetch user");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        isAuthenticated,
        signIn,
        signUpFun,
        signOut,
        loading,
        error,
        ForgotPassword,
        ResetPassword,
        ChangePassword,
        isAuthLoading,
        validateSession,
        allUsers,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
