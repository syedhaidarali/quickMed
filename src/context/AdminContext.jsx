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
  // const [getAllDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rejectedDoctors, setRejectedDoctors] = useState([]);
  const [rejectedHospitals, setRejectedHospitals] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [hospitalStatistics, setHospitalStatistics] = useState(null);

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
    DoctorsStatistics();
    HospitalStatistics();
    // getAllDoctor();
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

  const fetchPendingDoctors = async () => {
    try {
      const res = await adminService.getPendingDoctors();
      // console.log(res.data.data.doctors);
      setPendingDoctors(res.data.data.doctors);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingHospitals = async () => {
    try {
      const res = await adminService.getPendingHospitals();
      // console.log(res.data.data.hospitals);
      setPendingHospitals(res.data.data.hospitals);
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
      // console.log("rejected doctors", res);
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
      // console.log("doctors statistics", result.data.data.statistics);
    } catch (err) {
      // console.log(err, "doctor statistics error");
    } finally {
      setLoading(false);
    }
  };
  const HospitalStatistics = async () => {
    try {
      const result = await adminService.getHospitalStatistics();
      setHospitalStatistics(result.data.data.statistics);
      console.log(result.data.data.statistics);
      console.log("doctors statistics", result.data.data.statistics);
    } catch (err) {
      console.log(err, "doctor statistics error");
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

  const approveHospital = async (hospitalId) => {
    try {
      const response = await adminService.approveHospital(hospitalId);
      setPendingHospitals((prev) =>
        prev.filter((doc) => doc._id !== hospitalId)
      );
      toast.success("Hospital approved successfully!");
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

  const rejectHospital = async (hospitalId, reason) => {
    try {
      const response = await adminService.rejectHospital(hospitalId, reason);
      setPendingHospitals((prev) =>
        prev.filter((doc) => doc._id !== hospitalId)
      );
      toast.success("Hospital rejected successfully!");
      return response;
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
      console.log(res);
      setRejectedHospitals(res.data.data.hospitals);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const doctorAction = async (doctorId, action) => {
    try {
      const response = await adminService.doctorAction(doctorId, action);
      console.log(response, "doctor Action");
      toast.success("Doctor Action Updated Successfully");
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

  const hospitalProfilePicture = async (hospitalId, formData) => {
    try {
      const res = await adminService.hospitalProfilePicture(
        hospitalId,
        formData
      );
      toast.success("Profile Picture Change Successfully");
      console.log(res);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const updateDoctorDetails = async (doctorId, data) => {
    console.log(doctorId, "doctorId");
    console.log(data, "data");
    try {
      const res = await adminService.updateDoctorDetails(doctorId, data);
      const updatedDoc =
        res?.data?.data?.doctor || res?.data?.data || res?.data || null;

      // Optimistically update any lists that might contain this doctor
      const mergeUpdate = (doc) => ({ ...doc, ...data, ...(updatedDoc || {}) });

      setPendingDoctors((prev) =>
        Array.isArray(prev)
          ? prev.map((doc) => (doc._id === doctorId ? mergeUpdate(doc) : doc))
          : prev
      );
      setApprovedDoctors((prev) =>
        Array.isArray(prev)
          ? prev.map((doc) => (doc._id === doctorId ? mergeUpdate(doc) : doc))
          : prev
      );
      setRejectedDoctors((prev) =>
        Array.isArray(prev)
          ? prev.map((doc) => (doc._id === doctorId ? mergeUpdate(doc) : doc))
          : prev
      );
      // setAllDoctors((prev) =>
      //   Array.isArray(prev)
      //     ? prev.map((doc) => (doc._id === doctorId ? mergeUpdate(doc) : doc))
      //     : prev
      // );

      toast.success("Details updated successfully");
      return updatedDoc || res;
    } catch (err) {
      console.log(err);
    } finally {
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
        updateDoctorDetails,
        hospitalProfilePicture,
        hospitalStatistics,
      }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
