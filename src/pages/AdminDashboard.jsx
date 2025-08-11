/** @format */

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminStatsCards from "../components/admin/AdminStatsCards";
import ReviewTable from "../components/admin/ReviewTable";
import RejectModal from "../components/admin/RejectModal";
import AdminHeader from "../components/admin/AdminHeader";
import { useAdmin } from "../context/AdminContext";

const AdminDashboard = () => {
  const {
    admin,
    pendingDoctors,
    approvedDoctors,
    rejectedDoctors,
    pendingHospitals,
    approvedHospitals,
    rejectedHospitals,
    approveDoctor,
    rejectDoctor,
    approveHospital,
    rejectHospital,
    logout,
    fetchPendingDoctors,
    fetchApprovedDoctors,
    fetchRejectedDoctors,
    fetchPendingHospitals,
    fetchRejectedHospitals,
    statistics,
  } = useAdmin();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    fetchPendingDoctors();
    fetchApprovedDoctors();
    fetchRejectedDoctors();
    // fetchPendingHospitals();
    fetchRejectedHospitals();
  }, []);
  const handleApproveDoctor = async (itemId, type) => {
    if (type === "doctor") {
      await approveDoctor(itemId);
    } else if (type === "hospital") {
      await approveHospital(itemId);
    }
  };

  const handleApproveHospital = async (itemId) => {
    await approveHospital(itemId);
  };

  const handleRejectDoctor = async (itemId) => {
    await rejectDoctor(itemId);
  };

  const handleRejectHospital = async (itemId) => {
    rejectHospital(itemId);
  };

  const openRejectModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setShowRejectModal(true);
  };

  return (
    <div className='min-h-screen bg-emerald-50'>
      <AdminHeader
        logout={logout}
        navigate={navigate}
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <AdminStatsCards statistics={statistics} />

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
            onApprove={(id) => handleApproveDoctor(id, "doctor")}
            onReject={(id) => handleRejectDoctor(id, "doctor")}
            onOpenRejectModal={(item) => openRejectModal(item, "doctor")}
            // onToggleActive={onToggleActive}
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
            onApprove={(id) => handleApproveHospital(id, "hospital")}
            onReject={(id) => handleRejectHospital(id, "hospital")}
            onOpenRejectModal={(item) => openRejectModal(item, "hospital")}
          />
        </div>

        {/* Rejected Doctor Applications Section */}
        <div className='bg-white rounded-lg shadow my-8'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Rejected Doctor Applications
            </h2>
            <p className='text-sm text-gray-600 mt-1'>
              List of rejected doctor applications
            </p>
          </div>
          <ReviewTable
            pendingItems={rejectedDoctors}
            type='doctor'
            isRejected={true}
          />
        </div>
        {/* Rejected Hospital Applications Section */}
        <div className='bg-white rounded-lg shadow'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Rejected Hospital Applications
            </h2>
            <p className='text-sm text-gray-600 mt-1'>
              List of rejected hospital applications
            </p>
          </div>
          <ReviewTable
            pendingItems={rejectedHospitals}
            type='hospital'
            isRejected={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
