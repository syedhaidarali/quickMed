/** @format */

"use client";
import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { removeHeaders, setHeaders } from "../helpers/auth.helper";
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
  console.log(user);
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
      toast.error(err.response?.data?.message || "Login failed");
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
      toast.error(err.response?.data?.message || "Signup failed");
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
      toast.error(err.response?.data?.message || "Failed to send reset email");
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
      toast.error(err.response?.data?.message || "Password reset failed");
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
      if (navigate) {
        navigate("/");
      }
    } catch (error) {
      console.error("Sign Out Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const singleUser = async (userId) => {
    setLoading(true);
    try {
      const { data } = await authService.singleUser(userId);
      setSingleUserData(data.data.user);
      return data.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch user");
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
        isAuthLoading,
        validateSession,
        singleUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
