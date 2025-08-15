/** @format */

import { toast } from "sonner";
import { adminService } from "../services/adminService";
import React, { createContext, useContext, useEffect, useState } from "react";
import { removeHeaders, setHeaders } from "../helpers/auth.helper";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [rejectedDoctors, setRejectedDoctors] = useState([]);

  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [approvedHospitals, setApprovedHospitals] = useState([]);
  const [rejectedHospitals, setRejectedHospitals] = useState([]);

  const [statistics, setStatistics] = useState(null);
  const [hospitalStatistics, setHospitalStatistics] = useState(null);

  console.log(statistics, "sssssssssss");
  console.log(hospitalStatistics, "ssssssssssssss");

  // scoped loading/error
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  const setLoadingKey = (key, value) =>
    setLoading((prev) => ({ ...prev, [key]: value }));
  const setErrorKey = (key, value) =>
    setError((prev) => ({ ...prev, [key]: value }));

  // ---------------- AUTH ----------------
  const validateSession = async () => {
    setLoadingKey("session", true);
    try {
      const { data } = await adminService.validateToken();
      const user = data?.data;
      console.log(user);
      setAdmin(user);
      // fetch data only if role is admin
      if (user?.role === "admin") {
        await refreshAllData();
      }
    } catch (err) {
      setErrorKey("session", err);
    } finally {
      setLoadingKey("session", false);
    }
  };

  const login = async (credentials, navigate) => {
    setLoadingKey("login", true);
    try {
      const res = await adminService.login(credentials);
      const token = res?.data?.data?.token;
      setHeaders(token);
      const user = res?.data?.data?.user;
      setAdmin(user);
      toast.success("Admin login successfully");
      await refreshAllData();
      navigate("/admin/dashboard");
      return res;
    } catch (err) {
      setErrorKey("login", err);
      throw err;
    } finally {
      setLoadingKey("login", false);
    }
  };

  const logout = () => {
    removeHeaders();
    setAdmin(null);
  };

  // ---------------- FETCH HELPERS ----------------
  const fetchPendingDoctors = async () => {
    setLoadingKey("pendingDoctors", true);
    try {
      const res = await adminService.getPendingDoctors();
      setPendingDoctors(res.data.data.doctors);
      setErrorKey("pendingDoctors", null);
    } catch (err) {
      setErrorKey("pendingDoctors", err);
    } finally {
      setLoadingKey("pendingDoctors", false);
    }
  };

  const fetchApprovedDoctors = async () => {
    setLoadingKey("approvedDoctors", true);
    try {
      const res = await adminService.getApprovedDoctors();
      setApprovedDoctors(res.data.data.doctors);
      setErrorKey("approvedDoctors", null);
    } catch (err) {
      setErrorKey("approvedDoctors", err);
    } finally {
      setLoadingKey("approvedDoctors", false);
    }
  };

  const fetchRejectedDoctors = async () => {
    setLoadingKey("rejectedDoctors", true);
    try {
      const res = await adminService.getRejectedDoctors();
      setRejectedDoctors(res.data.data.doctors);
      setErrorKey("rejectedDoctors", null);
    } catch (err) {
      setErrorKey("rejectedDoctors", err);
    } finally {
      setLoadingKey("rejectedDoctors", false);
    }
  };

  const fetchPendingHospitals = async () => {
    setLoadingKey("pendingHospitals", true);
    try {
      const res = await adminService.getPendingHospitals();
      setPendingHospitals(res.data.data.hospitals);
      setErrorKey("pendingHospitals", null);
    } catch (err) {
      setErrorKey("pendingHospitals", err);
    } finally {
      setLoadingKey("pendingHospitals", false);
    }
  };

  const fetchApprovedHospitals = async () => {
    setLoadingKey("approvedHospitals", true);
    try {
      const res = await adminService.getApprovedHospitals();
      setApprovedHospitals(res.data.data.hospitals);
      setErrorKey("approvedHospitals", null);
    } catch (err) {
      setErrorKey("approvedHospitals", err);
    } finally {
      setLoadingKey("approvedHospitals", false);
    }
  };

  const fetchRejectedHospitals = async () => {
    setLoadingKey("rejectedHospitals", true);
    try {
      const res = await adminService.getRejectedHospitals();
      setRejectedHospitals(res.data.data.hospitals);
      setErrorKey("rejectedHospitals", null);
    } catch (err) {
      setErrorKey("rejectedHospitals", err);
    } finally {
      setLoadingKey("rejectedHospitals", false);
    }
  };

  const DoctorsStatistics = async () => {
    setLoadingKey("statistics", true);
    try {
      const res = await adminService.getDoctorsStatistics();
      setStatistics(res.data.data.statistics);
      setErrorKey("statistics", null);
    } catch (err) {
      setErrorKey("statistics", err);
    } finally {
      setLoadingKey("statistics", false);
    }
  };

  const HospitalStatistics = async () => {
    setLoadingKey("hospitalStatistics", true);
    try {
      const res = await adminService.getHospitalStatistics();
      setHospitalStatistics(res.data.data.statistics);
      setErrorKey("hospitalStatistics", null);
    } catch (err) {
      setErrorKey("hospitalStatistics", err);
    } finally {
      setLoadingKey("hospitalStatistics", false);
    }
  };

  // ---------------- REFRESH ----------------
  const refreshAllData = async () => {
    await Promise.all([
      DoctorsStatistics(),
      HospitalStatistics(),
      fetchPendingDoctors(),
      fetchApprovedDoctors(),
      fetchRejectedDoctors(),
      fetchPendingHospitals(),
      fetchApprovedHospitals(),
      fetchRejectedHospitals(),
    ]);
  };

  // ---------------- ACTIONS ----------------
  const approveDoctor = async (doctorId) => {
    await adminService.approveDoctor(doctorId);
    toast.success("Doctor approved successfully");
    await refreshAllData();
  };

  const approveHospital = async (hospitalId) => {
    await adminService.approveHospital(hospitalId);
    toast.success("Hospital approved successfully");
    await refreshAllData();
  };

  const rejectDoctor = async (doctorId) => {
    await adminService.rejectDoctor(doctorId);
    toast.success("Doctor rejected successfully");
    await refreshAllData();
  };

  const rejectHospital = async (hospitalId, reason) => {
    await adminService.rejectHospital(hospitalId, reason);
    toast.success("Hospital rejected successfully");
    await refreshAllData();
  };

  const doctorAction = async (doctorId, action) => {
    await adminService.doctorAction(doctorId, action);
    toast.success("Doctor action updated successfully");
  };

  const HospitalAction = async (hospitalId, action) => {
    await adminService.hospitalAction(hospitalId, action);
    toast.success("Hospital action updated successfully");
  };

  const DoctorDocumentUpload = async (formData, doctorId) => {
    const res = await adminService.uploadDocuments(formData, doctorId);
    toast.success("Doctor documents uploaded");
    return res;
  };

  const HospitalDocumentUpload = async (formData, hospitalId) => {
    const res = await adminService.uploadHospitalsDocuments(
      formData,
      hospitalId
    );
    toast.success("Hospital documents uploaded");
    return res;
  };

  const doctorProfilePicture = async (doctorId, formData) => {
    await adminService.doctorProfilePicture(doctorId, formData);
    toast.success("Doctor profile picture updated");
  };

  const hospitalProfilePicture = async (hospitalId, formData) => {
    await adminService.hospitalProfilePicture(hospitalId, formData);
    toast.success("Hospital profile picture updated");
  };

  const updateDoctorDetails = async (doctorId, data) => {
    const res = await adminService.updateDoctorDetails(doctorId, data);
    const updatedDoc = res?.data?.data?.doctor || {};
    const mergeUpdate = (doc) => ({ ...doc, ...data, ...updatedDoc });

    setPendingDoctors((prev) =>
      prev.map((doc) => (doc._id === doctorId ? mergeUpdate(doc) : doc))
    );
    setApprovedDoctors((prev) =>
      prev.map((doc) => (doc._id === doctorId ? mergeUpdate(doc) : doc))
    );
    setRejectedDoctors((prev) =>
      prev.map((doc) => (doc._id === doctorId ? mergeUpdate(doc) : doc))
    );

    toast.success("Doctor details updated");
  };

  // ---------------- INIT ----------------
  useEffect(() => {
    validateSession();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        login,
        logout,
        loading,
        error,
        pendingDoctors,
        approvedDoctors,
        rejectedDoctors,
        pendingHospitals,
        approvedHospitals,
        rejectedHospitals,
        statistics,
        hospitalStatistics,
        fetchPendingDoctors,
        fetchApprovedDoctors,
        fetchRejectedDoctors,
        fetchPendingHospitals,
        fetchApprovedHospitals,
        fetchRejectedHospitals,
        DoctorsStatistics,
        HospitalStatistics,
        approveDoctor,
        approveHospital,
        rejectDoctor,
        rejectHospital,
        doctorAction,
        HospitalAction,
        DoctorDocumentUpload,
        HospitalDocumentUpload,
        doctorProfilePicture,
        hospitalProfilePicture,
        updateDoctorDetails,
      }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
