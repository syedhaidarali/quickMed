/** @format */

// context/DoctorContext.jsx
import { data, useNavigate } from "react-router-dom";
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
  const [pendingValidation, setPendingValidation] = useState(false);
  const [doctorDocumentsPending, setDoctorDocumentsPending] = useState(false);
  const navigate = useNavigate();

  const validateSession = async () => {
    setLoading(true);
    try {
      const { data } = await doctorService.validateToken();
      console.log(data);
      setDoctor(data.data);
    } catch (err) {
      if (
        err.response?.data?.data ===
        "Your documents have been uploaded. Please wait until verification is complete or contact support at <b> quickmed0023.info@gmail.com </b>"
      ) {
        setPendingValidation(true);
        toast.error(
          "Your Request is in pending once it complete then you will receive an email"
        );
      } else if (
        err.response.data.data ===
        "Please upload your documents and profile picture for verification."
      ) {
        setDoctorDocumentsPending(true);
        navigate("/doctor/upload-documents");
      }
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
      console.log(doctorData.data.data.user);
      setHeaders(doctorData.data.data.token);
      if (!doctorData.data.data.user.hasDocuments) {
        setDoctorDocumentsPending(true);
        navigate("/doctor/upload-documents");
      } else {
        setDoctor(doctorData.data.data.user);
        navigate("/");
      }
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
      console.log(err);
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const DoctorForgotPassword = async (credentials, navigate) => {
    console.log(credentials, "credentials");
    setLoading(true);
    try {
      const { data } = await doctorService.forgotPassword(credentials);
      toast.success("Password reset email sent");
      if (navigate) {
        navigate("/doctor/reset-password");
      }
    } catch (err) {
      toast.error(err.response?.data?.data || "Failed to send reset email");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const DoctorResetPassword = async (credentials, navigate) => {
    console.log(credentials, "credentials");
    setLoading(true);
    try {
      const { data } = await doctorService.resetPassword(credentials);
      toast.success("Password reset successful");
      if (navigate) {
        navigate("/doctor/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.data || "Password reset failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const DoctorChangePassword = async (credentials, navigate) => {
    console.log(credentials, "credentials");
    setLoading(true);
    try {
      const { data } = await doctorService.changePassword(credentials);
      toast.success("Password changed successfully");
      if (navigate) {
        navigate("/doctor/profile");
      }
    } catch (err) {
      toast.error(err.response?.data?.data || "Password change failed");
      setError(err);
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
      toast.error(err.response.data.data);
    }
  };

  const DoctorDocumentUpload = async (formData, navigate) => {
    setLoading(true);
    try {
      const result = await doctorService.uploadDocuments(formData);
      console.log("document", result);
      console.log(result.data.data.documents[0].documentUrl);
      navigate(``);
      toast.success("Documents Uploaded");
      return result;
    } catch (err) {
      toast.error(err.response.data.data);
    } finally {
      setLoading(false);
    }
  };

  const DoctorProfileUpdate = async (data) => {
    try {
      const result = await doctorService.updateDoctorProfile(data);
      toast.success("Doctor Profile Updated Successfully");
      return result;
    } catch (err) {
      toast.error(err.response.data.data);
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

  const updateDoctorRating = (doctorId, updatedRating) => {
    setAllDoctors((prev) =>
      prev.map((doc) =>
        doc._id === doctorId ? { ...doc, rating: updatedRating } : doc
      )
    );
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
        DoctorForgotPassword,
        DoctorResetPassword,
        DoctorChangePassword,
        UpdateProfilePic,
        DoctorProfileUpdate,
        DoctorDocumentUpload,
        logout,
        allDoctors,
        updateDoctorRating,
        pendingValidation,
        doctorDocumentsPending,
      }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => useContext(DoctorContext);
