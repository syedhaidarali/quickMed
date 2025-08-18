/** @format */

import { hospitalService } from "../services";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [hospital, setHospital] = useState(null);
  const [allPublicHospital, setAllPublicHospital] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateSession = async () => {
    setLoading(true);
    try {
      const { data } = await hospitalService.validateToken();
      console.log(data, "data");
      setHospital(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateSession();
    GetAllPublicHospital();
  }, []);

  const HospitalLogin = async (credentials, navigate) => {
    setLoading(true);
    try {
      const { data } = await hospitalService.login(credentials);
      console.log(data.data.hospital.status === "rejected");
      localStorage.setItem("token", data.data.token);
      setHospital(data.data.hospital);
      toast.success("Login Successfully");
      navigate("/hospital/profile");
      return data.data.message;
    } catch (err) {
      toast.error(err.response.data.data || "Login failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const HospitalSignUp = async (formData, navigate) => {
    console.log("hospital SignUp", formData);
    setLoading(true);
    setError(null);
    try {
      await hospitalService.signUp(formData);
      toast.success("Form Submitted Successfully");
      navigate("/hospital/login");
    } catch (err) {
      console.log("err", err.response.data.data);
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const HospitalForgotPassword = async (credentials, navigate) => {
    setLoading(true);
    try {
      const { data } = await hospitalService.forgotPassword(credentials);
      toast.success("Password reset email sent");
      if (navigate) {
        navigate("/hospital/reset-password");
      }
    } catch (err) {
      toast.error(err.response?.data?.data || "Failed to send reset email");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const HospitalResetPassword = async (credentials, navigate) => {
    setLoading(true);
    try {
      const { data } = await hospitalService.resetPassword(credentials);
      toast.success("Password reset successful");
      if (navigate) {
        navigate("/hospital/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.data || "Password reset failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const HospitalChangePassword = async (credentials, navigate) => {
    setLoading(true);
    try {
      const { data } = await hospitalService.changePassword(credentials);
      toast.success("Password changed successfully");
      if (navigate) {
        navigate("/hospital/profile");
      }
    } catch (err) {
      toast.error(err.response?.data?.data || "Password change failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const HospitalProfile = async (hospitalId, profileData) => {
    // setLoading(true);
    try {
      const response = await hospitalService.updateProfile(
        hospitalId,
        profileData
      );
      toast.success("Profile updated successfully");
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.data || "Update failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const GetAllPublicHospital = async () => {
    try {
      const res = await hospitalService.getAllPublicHospital();
      setAllPublicHospital(res.data.data.hospitals);
    } catch (err) {
      console.log(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HospitalContext.Provider
      value={{
        hospital,
        allPublicHospital,
        loading,
        error,
        HospitalLogin,
        HospitalSignUp,
        HospitalForgotPassword,
        HospitalResetPassword,
        HospitalChangePassword,
        HospitalProfile,
      }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => useContext(HospitalContext);
