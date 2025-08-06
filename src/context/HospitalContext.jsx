/** @format */

// context/HospitalContext.jsx
import React, { createContext, useContext, useState } from "react";
import {
  SignUpHospital,
  ApproveHospital,
  RejectHospital,
  UpdateHospitalProfile,
} from "../api/api";
import { toast } from "sonner";

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [approvedHospitals, setApprovedHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const HospitalSignUp = async (formData) => {
    setLoading(true);
    try {
      const response = await SignUpHospital(formData);
      const newHospital = {
        id: Date.now(),
        ...formData,
        status: "pending",
        submittedAt: new Date().toISOString().split("T")[0],
      };
      setPendingHospitals((prev) => [...prev, newHospital]);
      toast.success("Hospital registered successfully");
      return { success: true, data: response };
    } catch (err) {
      toast.error(err.message || "Signup failed");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const approveHospital = async (hospitalId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await ApproveHospital(hospitalId, token);
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
      return result;
    } catch (err) {
      toast.error(err.message || "Approval failed");
    } finally {
      setLoading(false);
    }
  };

  const rejectHospital = async (hospitalId, reason) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await RejectHospital(hospitalId, reason, token);
      setPendingHospitals((prev) => prev.filter((h) => h.id !== hospitalId));
      return result;
    } catch (err) {
      toast.error(err.message || "Rejection failed");
    } finally {
      setLoading(false);
    }
  };

  const updateHospitalProfile = async (hospitalId, profileData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await UpdateHospitalProfile(
        hospitalId,
        profileData,
        token
      );
      setApprovedHospitals((prev) =>
        prev.map((h) => (h.id === hospitalId ? { ...h, ...profileData } : h))
      );
      return result;
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HospitalContext.Provider
      value={{
        pendingHospitals,
        approvedHospitals,
        loading,
        error,
        HospitalSignUp,
        approveHospital,
        rejectHospital,
        updateHospitalProfile,
      }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => useContext(HospitalContext);
