/** @format */

import React from "react";

const RejectDoctorModal = ({ 
  isOpen, 
  selectedDoctor, 
  rejectionReason, 
  onRejectionReasonChange, 
  onReject, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <div className='mt-3'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Reject Doctor Application
          </h3>
          <p className='text-sm text-gray-600 mb-4'>
            Please provide a reason for rejecting {selectedDoctor?.fullName}'s application:
          </p>
          <textarea
            value={rejectionReason}
            onChange={onRejectionReasonChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500'
            rows={4}
            placeholder='Enter rejection reason...'
          />
          <div className='flex justify-end space-x-3 mt-4'>
            <button
              onClick={onCancel}
              className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors'>
              Cancel
            </button>
            <button
              onClick={onReject}
              className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'>
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectDoctorModal; 