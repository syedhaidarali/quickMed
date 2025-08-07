/** @format */

// context/DoctorContext.jsx
import { doctorService } from "../services/doctorService";
import { setHeaders } from "../helpers/auth.helper";
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
      const doctorData = await doctorService.login(credentials);
      setHeaders(doctorData.data.data.token);
      navigate("/doctor/upload-documents");
      toast.success("Login Successfully");
      return doctorData.response.data.message;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const DoctorSignUp = async (formData, navigate) => {
    setLoading(true);
    setError(null);
    try {
      await doctorService.signUp(formData);
      toast.success("Form Submitted Successfully");
      navigate("/doctor/login");
    } catch (err) {
      toast.error(err.data.response.data);
    } finally {
      setLoading(false);
    }
  };

  const DoctorProfile = async (data) => {
    try {
      const result = await doctorService.updateProfile(data);
      toast.success(result.data.data.message);
      return result;
    } catch (err) {
      console.log(err, "profile err");
      toast.error(err?.message || "Update failed");
    }
  };

  const DoctorDocumentUpload = async (formData, navigate) => {
    setLoading(true);
    try {
      const result = await doctorService.uploadDocuments(formData);
      console.log(result);
      navigate(``);
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
