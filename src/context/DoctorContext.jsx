/** @format */

// context/DoctorContext.jsx
import { setHeaders } from "../helpers/auth.helper";
import { doctorApi } from "../api/doctor.api";
import React, { createContext, useContext, useState } from "react";

import { toast } from "sonner";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const DoctorLogin = async (credentials, navigate) => {
    console.log(credentials, navigate);
    setLoading(true);
    setError(null);
    try {
      const doctorData = await doctorApi.login(credentials);
      setHeaders(doctorData.data.data.token);
      navigate("/doctor/upload-documents");
      toast.success("Login Successfully");
      return doctorData.data.message;
    } catch (err) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const DoctorSignUp = async (formData, navigate) => {
    setLoading(true);
    setError(null);
    try {
      await doctorApi.signUp(formData);
      toast.success("Form Submitted Successfully");
      navigate("/doctor/login");
    } catch (err) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const DoctorProfile = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const result = await doctorApi.updateProfile(data);
      return result;
    } catch (err) {
      toast.error(err?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const DoctorDocumentUpload = async (formData) => {
    setLoading(true);
    try {
      const result = await doctorApi.uploadDocuments(formData);
      toast.success("Documents Uploaded");
      return result;
    } catch (err) {
      toast.error(err?.data || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        doctor,
        loading,
        error,
        DoctorLogin,
        DoctorSignUp,
        DoctorProfile,
        DoctorDocumentUpload,
      }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
