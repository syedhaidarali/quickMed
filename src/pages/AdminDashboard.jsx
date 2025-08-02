/** @format */

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminStatsCards from "../components/admin/AdminStatsCards";
import DoctorReviewTable from "../components/admin/DoctorReviewTable";
import RejectDoctorModal from "../components/admin/RejectDoctorModal";
import AdminHeader from "../components/admin/AdminHeader";

const AdminDashboard = () => {
  const {
    admin,
    pendingDoctors,
    approvedDoctors,
    approveDoctor,
    rejectDoctor,
    logout,
  } = useAuth();
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  if (!admin) {
    navigate("/admin/login");
    return null;
  }

  const handleApprove = async (doctorId) => {
    const result = await approveDoctor(doctorId);
    if (result.success) {
      alert("Doctor approved successfully!");
    }
  };

  const handleReject = async (doctorId) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    const result = await rejectDoctor(doctorId, rejectionReason);
    if (result.success) {
      alert("Doctor rejected successfully!");
      setShowRejectModal(false);
      setRejectionReason("");
      setSelectedDoctor(null);
    }
  };

  const openRejectModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowRejectModal(true);
  };

  return (
    <div className='min-h-screen bg-emerald-50'>
      <AdminHeader
        admin={admin}
        onLogout={logout}
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <AdminStatsCards
          pendingCount={pendingDoctors.length}
          approvedCount={approvedDoctors.length}
          totalCount={pendingDoctors.length + approvedDoctors.length}
        />

        <div className='bg-white rounded-lg shadow'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Pending Doctor Applications
            </h2>
            <p className='text-sm text-gray-600 mt-1'>
              Review and approve or reject doctor applications
            </p>
          </div>

          <DoctorReviewTable
            pendingDoctors={pendingDoctors}
            onApprove={handleApprove}
            onReject={handleReject}
            onOpenRejectModal={openRejectModal}
          />
        </div>
      </div>

      <RejectDoctorModal
        isOpen={showRejectModal}
        selectedDoctor={selectedDoctor}
        rejectionReason={rejectionReason}
        onRejectionReasonChange={(e) => setRejectionReason(e.target.value)}
        onReject={() => handleReject(selectedDoctor.id)}
        onCancel={() => {
          setShowRejectModal(false);
          setRejectionReason("");
          setSelectedDoctor(null);
        }}
      />
    </div>
  );
};

export default AdminDashboard;
