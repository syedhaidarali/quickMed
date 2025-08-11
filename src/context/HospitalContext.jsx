/** @format */

import React, { createContext, useContext, useEffect, useState } from "react";
import { hospitalService } from "../services/hospitalService";
import { toast } from "sonner";

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [hospital, setHospital] = useState(null);
  const [allPublicHospital, setAllPublicHospital] = useState([]);
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [approvedHospitals, setApprovedHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateSession = async () => {
    setLoading(true);
    try {
      const { data } = await hospitalService.validateToken();
      console.log(data, "data");
      setHospital(data.data);
    } catch (err) {
      // console.log(err);
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
      localStorage.setItem("token", data.data.token);
      setHospital(data.data.hospital);
      toast.success("Login Successfully");
      navigate("/");
      return data.data.message;
    } catch (err) {
      toast.error(err.response.data.data || "Login failed");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const HospitalSignUp = async (formData, navigate) => {
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
      toast.error(err.response?.data?.message || "Update failed");
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
      console.log(err);
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
      }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => useContext(HospitalContext);
