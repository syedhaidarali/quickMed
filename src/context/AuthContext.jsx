/** @format */

import React, { useContext, useState } from "react";
const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for demonstration - in real app, this would come from your backend
  const [pendingDoctors, setPendingDoctors] = useState([
    {
      id: 1,
      fullName: "Dr. Ahmed Khan",
      email: "ahmed.khan@example.com",
      speciality: "Cardiology",
      phone: "03001234567",
      status: "pending",
      submittedAt: "2024-01-15",
      pmdcVerified: true,
      mainDegree: "MBBS",
      experience: "5",
      hospital: "City Hospital",
      fullAddress: "123 Main Street, Karachi",
      cnic: "12345-1234567-1",
    },
    {
      id: 2,
      fullName: "Dr. Sarah Ahmed",
      email: "sarah.ahmed@example.com",
      speciality: "Dermatology",
      phone: "03001234568",
      status: "pending",
      submittedAt: "2024-01-16",
      pmdcVerified: false,
      mainDegree: "MBBS",
      experience: "3",
      hospital: "General Hospital",
      fullAddress: "456 Park Avenue, Lahore",
      cnic: "12345-1234567-2",
    },
  ]);

  const [approvedDoctors, setApprovedDoctors] = useState([]);

  const Login = async () => {
    setLoading(true);
    try {
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const DoctorLogin = async () => {
    setLoading(true);
    try {
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const AdminLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // Mock admin login - replace with actual API call
      if (
        credentials.email === "admin@quickmid.com" &&
        credentials.password === "admin123"
      ) {
        const adminData = {
          id: 1,
          email: credentials.email,
          name: "Admin User",
          role: "admin",
        };
        setAdmin(adminData);
        localStorage.setItem("admin", JSON.stringify(adminData));
        return { success: true, data: adminData };
      } else {
        throw new Error("Invalid admin credentials");
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const SignUp = async () => {
    setLoading(true);
    try {
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const DoctorSignUp = async (formData) => {
    console.log("Sending doctor signup data:", formData);
    setLoading(true);
    setError(null);
    try {
      // Create a new doctor with pending status
      const newDoctor = {
        id: Date.now(),
        ...formData,
        status: "pending",
        submittedAt: new Date().toISOString().split("T")[0],
        profilePicture: null,
        availability: [],
        fee: "",
        documents: [],
      };

      // Add to pending doctors list
      setPendingDoctors((prev) => [...prev, newDoctor]);

      // Here you can send the formData object directly to your backend API
      console.log("Sending doctor signup data:", formData);

      // Example API call (replace with your actual API endpoint)
      // const response = await fetch('/api/doctor/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });

      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // setDoctor(data.doctor);
      return { success: true, data: newDoctor };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const approveDoctor = async (doctorId) => {
    try {
      const doctorToApprove = pendingDoctors.find((doc) => doc.id === doctorId);
      if (doctorToApprove) {
        const approvedDoctor = { ...doctorToApprove, status: "approved" };
        setApprovedDoctors((prev) => [...prev, approvedDoctor]);
        setPendingDoctors((prev) => prev.filter((doc) => doc.id !== doctorId));
        return { success: true };
      }
      throw new Error("Doctor not found");
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const rejectDoctor = async (doctorId, reason) => {
    try {
      const doctorToReject = pendingDoctors.find((doc) => doc.id === doctorId);
      if (doctorToReject) {
        const rejectedDoctor = {
          ...doctorToReject,
          status: "rejected",
          rejectionReason: reason,
        };
        setPendingDoctors((prev) => prev.filter((doc) => doc.id !== doctorId));
        return { success: true };
      }
      throw new Error("Doctor not found");
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const updateDoctorProfile = async (doctorId, profileData) => {
    try {
      setApprovedDoctors((prev) =>
        prev.map((doc) =>
          doc.id === doctorId ? { ...doc, ...profileData } : doc
        )
      );
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setDoctor(null);
    setAdmin(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    localStorage.removeItem("doctor");
  };

  const values = {
    user,
    doctor,
    admin,
    loading,
    error,
    pendingDoctors,
    approvedDoctors,
    Login,
    DoctorLogin,
    AdminLogin,
    SignUp,
    DoctorSignUp,
    approveDoctor,
    rejectDoctor,
    updateDoctorProfile,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
