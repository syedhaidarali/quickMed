/** @format */

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminStatsCards from "../components/admin/AdminStatsCards";
import ReviewTable from "../components/admin/ReviewTable";
import RejectModal from "../components/admin/RejectModal";
import AdminHeader from "../components/admin/AdminHeader";

const AdminDashboard = () => {
  const {
    admin,
    pendingDoctors,
    approvedDoctors,
    pendingHospitals,
    approvedHospitals,
    approveDoctor,
    rejectDoctor,
    approveHospital,
    rejectHospital,
    logout,
  } = useAuth();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "doctor" or "hospital"

  if (!admin) {
    navigate("/admin/login");
    return null;
  }

  const handleApprove = async (itemId, type) => {
    const approveFunction = type === "doctor" ? approveDoctor : approveHospital;
    const result = await approveFunction(itemId);
    if (result.success) {
      alert(
        `${type.charAt(0).toUpperCase() + type.slice(1)} approved successfully!`
      );
    }
  };

  const handleReject = async (itemId, type) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    const rejectFunction = type === "doctor" ? rejectDoctor : rejectHospital;
    const result = await rejectFunction(itemId, rejectionReason);
    if (result.success) {
      alert(
        `${type.charAt(0).toUpperCase() + type.slice(1)} rejected successfully!`
      );
      setShowRejectModal(false);
      setRejectionReason("");
      setSelectedItem(null);
      setModalType("");
    }
  };

  const openRejectModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
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
          pendingDoctorsCount={pendingDoctors.length}
          approvedDoctorsCount={approvedDoctors.length}
          totalDoctorsCount={pendingDoctors.length + approvedDoctors.length}
          pendingHospitalsCount={pendingHospitals.length}
          approvedHospitalsCount={approvedHospitals.length}
          totalHospitalsCount={
            pendingHospitals.length + approvedHospitals.length
          }
        />

        {/* Doctor Applications Section */}
        <div className='bg-white rounded-lg shadow mb-8'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Pending Doctor Applications
            </h2>
            <p className='text-sm text-gray-600 mt-1'>
              Review and approve or reject doctor applications
            </p>
          </div>

          <ReviewTable
            pendingItems={pendingDoctors}
            type='doctor'
            onApprove={(id) => handleApprove(id, "doctor")}
            onReject={(id) => handleReject(id, "doctor")}
            onOpenRejectModal={(item) => openRejectModal(item, "doctor")}
          />
        </div>

        {/* Hospital Applications Section */}
        <div className='bg-white rounded-lg shadow'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Pending Hospital Applications
            </h2>
            <p className='text-sm text-gray-600 mt-1'>
              Review and approve or reject hospital applications
            </p>
          </div>

          <ReviewTable
            pendingItems={pendingHospitals}
            type='hospital'
            onApprove={(id) => handleApprove(id, "hospital")}
            onReject={(id) => handleReject(id, "hospital")}
            onOpenRejectModal={(item) => openRejectModal(item, "hospital")}
          />
        </div>
      </div>

      <RejectModal
        isOpen={showRejectModal}
        selectedItem={selectedItem}
        type={modalType}
        rejectionReason={rejectionReason}
        onRejectionReasonChange={(e) => setRejectionReason(e.target.value)}
        onReject={() => handleReject(selectedItem.id, modalType)}
        onCancel={() => {
          setShowRejectModal(false);
          setRejectionReason("");
          setSelectedItem(null);
          setModalType("");
        }}
      />
    </div>
  );
};

export default AdminDashboard;
