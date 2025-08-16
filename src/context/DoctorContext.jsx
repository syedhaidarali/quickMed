/** @format */

// context/DoctorContext.jsx
import { removeHeaders, setHeaders } from "../helpers";
import { doctorService } from "../services";
import React, { createContext, useContext, useEffect, useState } from "react";

import { toast } from "sonner";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const validateSession = async () => {
    setLoading(true);
    try {
      const { data } = await doctorService.validateToken();
      setDoctor(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateSession();
    GetAllPublicDoctors();
  }, []);

  const DoctorLogin = async (credentials, navigate) => {
    setLoading(true);
    setError(null);
    try {
      const doctorData = await doctorService.login(credentials);
      setDoctor(doctorData.data.data.user);
      setHeaders(doctorData.data.data.token);
      if (!doctorData.data.data.user.hasDocuments) {
        navigate("/doctor/upload-documents");
      } else {
        navigate("/");
      }
      toast.success("Login Successfully");
      return doctorData.response.data.message;
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
      await doctorService.signUp(formData);
      toast.success("Form Submitted Successfully");
      navigate("/doctor/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const UpdateProfilePic = async (data) => {
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
    console.log("formdata", formData);
    setLoading(true);
    try {
      const result = await doctorService.uploadDocuments(formData);
      console.log("document", result);
      console.log(result.data.data.documents[0].documentUrl);
      navigate(``);
      toast.success("Documents Uploaded");
      return result;
    } catch (err) {
      toast.error(err?.data || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const DoctorProfileUpdate = async (data) => {
    console.log(data);
    try {
      const result = await doctorService.updateDoctorProfile(data);
      console.log(result);
      toast.success(result.data.data.message);
      return result;
    } catch (err) {
      console.log(err, "profile err");
      toast.error(err?.message || "Update failed");
    }
  };

  const GetAllPublicDoctors = async () => {
    try {
      const result = await doctorService.getAllPublicDoctors();
      setAllDoctors(result.data.data.doctors);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const DoctorRecommendationsApiSearch = async (prompt) => {
    try {
      const res = await doctorService.recommendationsApiSearch(prompt);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = (navigate) => {
    navigate("/doctor/login");
    removeHeaders();
    setDoctor(null);
  };

  return (
    <DoctorContext.Provider
      value={{
        doctor,
        loading,
        error,
        DoctorLogin,
        DoctorSignUp,
        UpdateProfilePic,
        DoctorProfileUpdate,
        DoctorDocumentUpload,
        logout,
        allDoctors,
        DoctorRecommendationsApiSearch,
      }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
