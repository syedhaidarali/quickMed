/** @format */

import React, { useState } from "react";
import DoctorReviewModal from "./DoctorReviewModal";
import HospitalReviewModal from "./HospitalReviewModal";

const ReviewTable = ({
  pendingItems,
  type, // "doctor" or "hospital"
  onApprove,
  onReject,
  isRejected,
  onOpenRejectModal,
  onActivatePayment, // Add this prop for payment activation
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  if (pendingItems.length === 0) {
    return (
      <div className='p-8 text-center'>
        <span className='text-4xl mb-4 block'>
          {type === "doctor" ? "👨‍⚕️" : "🏥"}
        </span>
        <p className='text-gray-600'>
          No pending {type} applications to review!
        </p>
      </div>
    );
  }

  const handleViewDetails = (item) => {
    if (type === "doctor") {
      setSelectedDoctor(item);
      setShowDoctorModal(true);
    } else if (type === "hospital") {
      setSelectedHospital(item);
      setShowHospitalModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowDoctorModal(false);
    setSelectedDoctor(null);
    setShowHospitalModal(false);
    setSelectedHospital(null);
  };

  const handleApproveFromModal = (itemId) => {
    onApprove(itemId);
    handleCloseModal();
  };

  const renderInitials = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    const textSize =
      initials.length <= 2
        ? "text-base"
        : initials.length === 3
        ? "text-sm"
        : "text-xs";

    return (
      <span className={`text-emerald-600 font-medium ${textSize}`}>
        {initials}
      </span>
    );
  };

  const getColumns = () => {
    if (type === "doctor") {
      return [
        {
          key: "name",
          label: "Doctor",
          render: (item) => (
            <div className='flex items-center'>
              <div className='flex-shrink-0 h-10 w-10'>
                <div className='h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden'>
                  {item.profilePicture || item.profileImageUrl ? (
                    <img
                      src={item.profilePicture || item.profileImageUrl}
                      alt='Profile'
                      className='h-10 w-10 object-cover rounded-full'
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display =
                          "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center ${
                      item.profilePicture || item.profileImageUrl
                        ? "hidden"
                        : ""
                    }`}>
                    {renderInitials(item.name)}
                  </div>
                </div>
              </div>
              <div className='ml-4'>
                <div className='text-sm font-medium text-gray-900'>
                  {item.name}
                </div>
                <div className='text-sm text-gray-500'>{item.email}</div>
              </div>
            </div>
          ),
        },
        {
          key: "speciality",
          label: "Speciality",
          render: (item) => (
            <div>
              <div className='text-sm text-gray-900'>{item.speciality}</div>
              <div className='text-sm text-gray-500'>{item.mainDegree}</div>
            </div>
          ),
        },
        {
          key: "contact",
          label: "Contact",
          render: (item) => (
            <div>
              <div className='text-sm text-gray-900'>{item.phone}</div>
              <div className='text-sm text-gray-500'>{item.hospital}</div>
            </div>
          ),
        },
        {
          key: "pmdc",
          label: "PMDC Status",
          render: (item) => (
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                item.pmdcVerified
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
              {item.pmdcVerified ? "Verified" : "Not Verified"}
            </span>
          ),
        },
        {
          key: "paymentStatus",
          label: "Payment Status",
          render: (item) => (
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                item.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
              {item.isActive ? "Active" : "Inactive"}
            </span>
          ),
        },
      ];
    } else {
      return [
        {
          key: "name",
          label: "Hospital",
          render: (item) => (
            <div className='flex items-center'>
              <div className='flex-shrink-0 h-10 w-10'>
                <div className='h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden'>
                  {item.profilePicture || item.profileImageUrl || item.image ? (
                    <img
                      src={
                        item.profilePicture ||
                        item.profileImageUrl ||
                        item.image
                      }
                      alt='Profile'
                      className='h-10 w-10 object-cover rounded-full'
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display =
                          "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center ${
                      item.profilePicture || item.profileImageUrl || item.image
                        ? "hidden"
                        : ""
                    }`}>
                    {renderInitials(item.name)}
                  </div>
                </div>
              </div>
              <div className='ml-4'>
                <div className='text-sm font-medium text-gray-900'>
                  {item.name}
                </div>
                <div className='text-sm text-gray-500'>{item.email}</div>
              </div>
            </div>
          ),
        },
        {
          key: "type",
          label: "Type & Category",
          render: (item) => (
            <div>
              <div className='text-sm text-gray-900'>{item.hospitalType}</div>
              <div className='text-sm text-gray-500'>{item.category}</div>
            </div>
          ),
        },
        {
          key: "contact",
          label: "Contact",
          render: (item) => (
            <div>
              <div className='text-sm text-gray-900'>{item.phone}</div>
              <div className='text-sm text-gray-500'>{item.city}</div>
            </div>
          ),
        },
        {
          key: "services",
          label: "Services",
          render: (item) => (
            <div className='flex flex-wrap gap-1'>
              {item.emergencyServices && (
                <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'>
                  Emergency
                </span>
              )}
              {item.ambulanceServices && (
                <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                  Ambulance
                </span>
              )}
              {item.icuServices && (
                <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'>
                  ICU
                </span>
              )}
            </div>
          ),
        },
      ];
    }
  };

  const columns = getColumns();

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {column.label}
              </th>
            ))}
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {pendingItems.map((item) => (
            <tr
              key={item._id}
              className='hover:bg-gray-50'>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className='px-6 py-4 whitespace-nowrap'>
                  {column.render(item)}
                </td>
              ))}
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => onApprove(item._id)}
                    className='bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors'>
                    Approve
                  </button>
                  {!isRejected && (
                    <button
                      onClick={() => onReject(item._id)}
                      className='bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors'>
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleViewDetails(item)}
                    className='bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors'>
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDoctorModal && selectedDoctor && (
        <DoctorReviewModal
          isOpen={showDoctorModal}
          onClose={handleCloseModal}
          onApprove={handleApproveFromModal}
          doctor={selectedDoctor}
          handleDoctorReject={onReject}
          isRejected={isRejected}
        />
      )}
      {showHospitalModal && selectedHospital && (
        <HospitalReviewModal
          isOpen={showHospitalModal}
          onClose={handleCloseModal}
          onApprove={handleApproveFromModal}
          hospital={selectedHospital}
          handleHospitalReject={onReject}
          isRejected={isRejected}
        />
      )}
    </div>
  );
};

export default ReviewTable;
