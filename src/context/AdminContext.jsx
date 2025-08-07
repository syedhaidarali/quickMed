/** @format */

import { toast } from "sonner";
import { adminService } from "../services/adminService";
import React, { createContext, useContext, useEffect, useState } from "react";
import { setHeaders } from "../helpers/auth.helper";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [approvedHospitals, setApprovedHospitals] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateSession = async () => {
    setLoading(true);
    try {
      const { data } = await adminService.validateToken();
      console.log(data, "admin data");
      setAdmin(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  const login = async (credentials, navigate) => {
    console.log(credentials, "admin Login");
    try {
      setLoading(true);
      const res = await adminService.login(credentials);
      setAdmin(res.data.data.user);
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

  const fetchPendingDoctors = async () => {
    try {
      setLoading(true);
      const res = await adminService.getPendingDoctors();
      setPendingDoctors(res.data);
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
      setLoading(true);
      const res = await adminService.getApprovedDoctors();
      setApprovedDoctors(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedHospitals = async () => {
    try {
      setLoading(true);
      const res = await adminService.getApprovedHospitals();
      setApprovedHospitals(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const approveDoctor = async (doctorId) => {
    try {
      setLoading(true);
      return await adminService.approveDoctor(doctorId);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectDoctor = async (doctorId, reason) => {
    try {
      setLoading(true);
      return await adminService.rejectDoctor(doctorId, reason);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveHospital = async (hospitalId) => {
    try {
      setLoading(true);
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
      setLoading(true);
      return await adminService.rejectHospital(hospitalId, reason);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        login,
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
      }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
