/** @format */

import { toast } from "sonner";
import { adminService } from "../services/adminService";
import React, { createContext, useContext, useEffect, useState } from "react";
import { removeHeaders, setHeaders } from "../helpers/auth.helper";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [approvedHospitals, setApprovedHospitals] = useState([]);
  const [getAllDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rejectedDoctors, setRejectedDoctors] = useState([]);
  const [rejectedHospitals, setRejectedHospitals] = useState([]);
  const [statistics, setStatistics] = useState(null);

  const validateSession = async () => {
    setLoading(true);
    try {
      const { data } = await adminService.validateToken();
      setAdmin(data.data);
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateSession();
    getAllDoctor();
    DoctorsStatistics();
  }, []);

  const login = async (credentials, navigate) => {
    console.log(credentials, "admin Login");
    try {
      setLoading(true);
      const res = await adminService.login(credentials);
      setAdmin(res.data.data.user);
      DoctorsStatistics();
      fetchApprovedDoctors();
      fetchRejectedDoctors();
      toast.success("Admin login Successfully");
      setHeaders(res.data.data.token);
      navigate("/admin/dashboard");
      return res;
    } catch (err) {
      console.log(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeHeaders();
    setAdmin(null);
  };

  const getAllDoctor = async () => {
    try {
      const response = await adminService.getAllDoctor();
      setAllDoctors(response.data.data.doctors);
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingDoctors = async () => {
    try {
      const res = await adminService.getPendingDoctors();
      console.log(res.data.data.doctors);
      setPendingDoctors(res.data.data.doctors);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingHospitals = async () => {
    try {
      setLoading(true);
      const res = await adminService.getPendingHospitals();
      setPendingHospitals(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedDoctors = async () => {
    try {
      const res = await adminService.getApprovedDoctors();
      setApprovedDoctors(res.data.data.doctors);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedHospitals = async () => {
    try {
      const res = await adminService.getApprovedHospitals();
      setApprovedHospitals(res.data);
      console.log(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRejectedDoctors = async () => {
    try {
      const res = await adminService.getRejectedDoctors();
      console.log("rejected doctors", res);
      setRejectedDoctors(res.data.data.doctors);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const DoctorsStatistics = async () => {
    try {
      const result = await adminService.getDoctorsStatistics();
      setStatistics(result.data.data.statistics);
      console.log("doctors statistics", result.data.data.statistics);
    } catch (err) {
      // console.log(err, "doctor statistics error");
    } finally {
      setLoading(false);
    }
  };

  const approveDoctor = async (doctorId) => {
    console.log(doctorId, "approveDoctor");
    try {
      const response = await adminService.approveDoctor(doctorId);
      setPendingDoctors((prev) => prev.filter((doc) => doc._id !== doctorId));
      toast.success("Doctor approved successfully!");
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectDoctor = async (doctorId) => {
    try {
      const response = await adminService.rejectDoctor(doctorId);
      setPendingDoctors((prev) => prev.filter((doc) => doc._id !== doctorId));
      toast.success("Doctor rejected successfully!");
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveHospital = async (hospitalId) => {
    try {
      return await adminService.approveHospital(hospitalId);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectHospital = async (hospitalId, reason) => {
    try {
      return await adminService.rejectHospital(hospitalId, reason);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchRejectedHospitals = async () => {
    try {
      const res = await adminService.getRejectedHospitals();
      setRejectedHospitals(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const doctorAction = async (doctorId, action) => {
    setLoading(true);
    try {
      const response = await adminService.doctorAction(doctorId, action);
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const DoctorDocumentUpload = async (formData, doctorId) => {
    // setLoading(true);
    try {
      const result = await adminService.uploadDocuments(formData, doctorId);
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

  const doctorProfilePicture = async (doctorId, formData) => {
    // setLoading(true);
    try {
      const res = await adminService.doctorProfilePicture(doctorId, formData);
      toast.success("Profile Picture Change Successfully");
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        login,
        logout,
        pendingDoctors,
        pendingHospitals,
        approvedDoctors,
        approvedHospitals,
        loading,
        error,
        fetchPendingDoctors,
        fetchPendingHospitals,
        fetchApprovedDoctors,
        fetchApprovedHospitals,
        approveDoctor,
        rejectDoctor,
        approveHospital,
        rejectHospital,
        admin,
        rejectedDoctors,
        rejectedHospitals,
        fetchRejectedDoctors,
        fetchRejectedHospitals,
        statistics,
        doctorAction,
        DoctorDocumentUpload,
        doctorProfilePicture,
      }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
