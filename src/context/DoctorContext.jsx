/** @format */

// context/DoctorContext.jsx
import React, { createContext, useContext, useState } from "react";
import {
  SignUpDoctor,
  DoctorLogin as DoctorLoginAPI,
  DoctorDocumentUploadApi,
  UpdateDoctorProfile,
  ApproveDoctor,
  RejectDoctor,
} from "../api/api";
import { toast } from "sonner";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const DoctorLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const doctorData = await DoctorLoginAPI(credentials);
      localStorage.setItem("token", doctorData.data.token);
      return doctorData.data.message;
    } catch (err) {
      toast.error(err.data);
    } finally {
      setLoading(false);
    }
  };

  const DoctorSignUp = async (formData, navigate) => {
    setLoading(true);
    setError(null);
    try {
      await SignUpDoctor(formData);
      toast.success("Form Submitted Successfully");
      navigate("/doctor/login");
    } catch (err) {
      toast.error(err.data);
    } finally {
      setLoading(false);
    }
  };

  const DoctorDocumentUpload = async (formData) => {
    setLoading(true);
    try {
      const result = await DoctorDocumentUploadApi(formData);
      toast.success("Documents Uploaded");
      return result;
    } catch (err) {
      toast.error(err?.data || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const approveDoctor = async (doctorId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await ApproveDoctor(doctorId, token);
      const doctorToApprove = pendingDoctors.find((d) => d.id === doctorId);
      if (doctorToApprove) {
        setApprovedDoctors([
          ...approvedDoctors,
          { ...doctorToApprove, status: "approved" },
        ]);
        setPendingDoctors(pendingDoctors.filter((d) => d.id !== doctorId));
      }
      return result;
    } catch (err) {
      toast.error(err?.message || "Failed to approve doctor");
    } finally {
      setLoading(false);
    }
  };

  const rejectDoctor = async (doctorId, reason) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await RejectDoctor(doctorId, reason, token);
      setPendingDoctors(pendingDoctors.filter((d) => d.id !== doctorId));
      return result;
    } catch (err) {
      toast.error(err?.message || "Failed to reject doctor");
    } finally {
      setLoading(false);
    }
  };

  const updateDoctorProfile = async (doctorId, data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await UpdateDoctorProfile(doctorId, data, token);
      setApprovedDoctors((prev) =>
        prev.map((d) => (d.id === doctorId ? { ...d, ...data } : d))
      );
      return result;
    } catch (err) {
      toast.error(err?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        doctor,
        pendingDoctors,
        approvedDoctors,
        loading,
        error,
        DoctorLogin,
        DoctorSignUp,
        DoctorDocumentUpload,
        approveDoctor,
        rejectDoctor,
        updateDoctorProfile,
      }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
