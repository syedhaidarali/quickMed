/** @format */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminStatsCards from "../components/admin/AdminStatsCards";
import ReviewTable from "../components/admin/ReviewTable";
import { useAdmin } from "../context/AdminContext";
import AdminHeader from "../components/admin/AdminHeader";

const AdminDashboard = () => {
  const {
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
    fetchPendingDoctors,
    fetchApprovedDoctors,
    fetchRejectedDoctors,
    fetchPendingHospitals,
    fetchRejectedHospitals,
    fetchApprovedHospitals,
    statistics,
    logout,
  } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingDoctors();
    fetchApprovedDoctors();
    fetchRejectedDoctors();
    fetchPendingHospitals();
    fetchRejectedHospitals();
    fetchApprovedHospitals();
  }, []);

  const handleApproveDoctor = async (itemId) => await approveDoctor(itemId);
  const handleApproveHospital = async (itemId) => await approveHospital(itemId);
  const handleRejectDoctor = async (itemId) => await rejectDoctor(itemId);
  const handleRejectHospital = async (itemId) => await rejectHospital(itemId);

  return (
    <div className='min-h-screen bg-emerald-50'>
      {/* AdminHeader left as-is */}
      <AdminHeader
        logout={logout}
        navigate={navigate}
      />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <AdminStatsCards statistics={statistics} />
        <div className='bg-white rounded-lg shadow mb-8'>
          <ReviewTable
            title='Pending Doctor Applications'
            pendingItems={pendingDoctors}
            type='doctor'
            onApprove={(id) => handleApproveDoctor(id)}
            onReject={(id) => handleRejectDoctor(id)}
          />
        </div>

        <div className='bg-white rounded-lg shadow mb-8'>
          <ReviewTable
            title='Pending Hospital Applications'
            pendingItems={pendingHospitals}
            type='hospital'
            onApprove={(id) => handleApproveHospital(id)}
            onReject={(id) => handleRejectHospital(id)}
          />
        </div>

        <div className='bg-white rounded-lg shadow mb-8'>
          <ReviewTable
            title='Approved Doctor Applications'
            pendingItems={approvedDoctors}
            type='doctor'
            onApprove={(id) => handleApproveDoctor(id)}
            onReject={(id) => handleRejectDoctor(id)}
          />
        </div>

        <div className='bg-white rounded-lg shadow mb-8'>
          <ReviewTable
            title='Approved Hospital Applications'
            pendingItems={approvedHospitals}
            type='hospital'
            onApprove={(id) => handleApproveHospital(id)}
            onReject={(id) => handleRejectHospital(id)}
          />
        </div>

        <div className='bg-white rounded-lg shadow mb-8'>
          <ReviewTable
            title='Rejected Doctor Applications'
            pendingItems={rejectedDoctors}
            type='doctor'
            onApprove={(id) => handleApproveDoctor(id)}
            onReject={(id) => handleRejectDoctor(id)}
          />
        </div>

        <div className='bg-white rounded-lg shadow mb-8'>
          <ReviewTable
            title='Rejected Hospital Applications'
            pendingItems={rejectedHospitals}
            type='hospital'
            onApprove={(id) => handleApproveHospital(id)}
            onReject={(id) => handleRejectHospital(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
