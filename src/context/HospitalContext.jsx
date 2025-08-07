/** @format */

import React, { createContext, useContext, useState } from "react";
import { hospitalService } from "../services/hospitalService";
import { toast } from "sonner";

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [hospital, setHospital] = useState(null);
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [approvedHospitals, setApprovedHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const HospitalLogin = async (credentials, navigate) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await hospitalService.login(credentials);
      localStorage.setItem("token", data.data.token);
      setHospital(data.data.hospital);
      toast.success(data.data.message);
      if (navigate) {
        navigate("/");
      }
      return data.data.message;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const HospitalSignUp = async (formData, navigate) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await hospitalService.signUp(formData);
      toast.success("Form Submitted Successfully");
      if (navigate) {
        navigate("/hospital/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const HospitalProfile = async (hospitalId, profileData) => {
    setLoading(true);
    try {
      const response = await hospitalService.updateProfile(
        hospitalId,
        profileData
      );
      toast.success("Profile updated successfully");
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const approveHospital = async (hospitalId) => {
    setLoading(true);
    try {
      const response = await hospitalService.approveHospital(hospitalId);
      const hospitalToApprove = pendingHospitals.find(
        (h) => h.id === hospitalId
      );
      if (hospitalToApprove) {
        setApprovedHospitals([
          ...approvedHospitals,
          { ...hospitalToApprove, status: "approved" },
        ]);
        setPendingHospitals(
          pendingHospitals.filter((h) => h.id !== hospitalId)
        );
      }
      toast.success("Hospital approved successfully");
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve hospital");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const rejectHospital = async (hospitalId, reason) => {
    setLoading(true);
    try {
      const response = await hospitalService.rejectHospital(hospitalId, reason);
      setPendingHospitals(pendingHospitals.filter((h) => h.id !== hospitalId));
      toast.success("Hospital rejected successfully");
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reject hospital");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HospitalContext.Provider
      value={{
        hospital,
        pendingHospitals,
        approvedHospitals,
        loading,
        error,
        HospitalLogin,
        HospitalSignUp,
        HospitalProfile,
        approveHospital,
        rejectHospital,
      }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => useContext(HospitalContext);
