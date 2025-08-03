/** @format */

import React from "react";

const RejectModal = ({
  isOpen,
  selectedItem,
  type, // "doctor" or "hospital"
  rejectionReason,
  onRejectionReasonChange,
  onReject,
  onCancel,
}) => {
  if (!isOpen) return null;

  const getItemName = () => {
    if (type === "doctor") {
      return selectedItem?.fullName;
    } else {
      return selectedItem?.hospitalName;
    }
  };

  const getIcon = () => {
    return type === "doctor" ? "👨‍⚕️" : "🏥";
  };

  const getTitle = () => {
    return `Reject ${type.charAt(0).toUpperCase() + type.slice(1)} Application`;
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <div className='mt-3 text-center'>
          <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
            <span className='text-2xl'>{getIcon()}</span>
          </div>
          <h3 className='text-lg font-medium text-gray-900 mt-4'>
            {getTitle()}
          </h3>
          <div className='mt-2 px-7 py-3'>
            <p className='text-sm text-gray-500'>
              Are you sure you want to reject the application for{" "}
              <span className='font-semibold text-gray-700'>
                {getItemName()}
              </span>
              ?
            </p>
            <div className='mt-4'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Reason for Rejection
              </label>
              <textarea
                value={rejectionReason}
                onChange={onRejectionReasonChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
                rows={3}
                placeholder='Please provide a reason for rejection...'
              />
            </div>
          </div>
          <div className='flex justify-center space-x-3 mt-4'>
            <button
              onClick={onCancel}
              className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors'>
              Cancel
            </button>
            <button
              onClick={onReject}
              className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'>
              Reject Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectModal; 