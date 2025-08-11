/** @format */
import React from "react";

// Reusable InfoRow
const InfoRow = ({ label, value }) => (
  <div className='flex justify-between'>
    <span className='text-sm font-medium text-gray-500'>{label}:</span>
    <span className='text-sm text-gray-900'>{value || "Not provided"}</span>
  </div>
);

// Reusable Badge
const Badge = ({ condition, trueLabel, falseLabel }) => (
  <span
    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
      condition ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
    }`}>
    {condition ? trueLabel : falseLabel}
  </span>
);

// Reusable Status Badge
const StatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    verified: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        colors[status] || "bg-gray-100 text-gray-800"
      }`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1) || "Unknown"}
    </span>
  );
};

// Main Modal
const DoctorReviewModal = ({
  isOpen,
  doctor,
  onClose,
  onApprove,
  onReject,
  handleDoctorReject,
}) => {
  if (!isOpen || !doctor) return null;

  const formatDate = (date) => {
    if (!date) return "Not available";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  // Generate personal fields dynamically
  const personalFields = [
    { key: "name", label: "Name", value: doctor.name },
    { key: "email", label: "Email", value: doctor.email },
    { key: "phone", label: "Phone", value: doctor.phone },
    { key: "cnic", label: "CNIC", value: doctor.cnic },
    { key: "gender", label: "Gender", value: doctor.gender },
    { key: "religion", label: "Religion", value: doctor.religion },
    { key: "address", label: "Address", value: doctor.fullAddress },
  ];

  // Generate professional fields dynamically
  const professionalFields = [
    { key: "degree", label: "Main Degree", value: doctor.mainDegree },
    {
      key: "speciality",
      label: "Speciality",
      value: Array.isArray(doctor.speciality)
        ? doctor.speciality.join(", ")
        : doctor.speciality,
    },
    {
      key: "experience",
      label: "Experience",
      value: doctor.experience ? `${doctor.experience} years` : "Not specified",
    },
    {
      key: "fee",
      label: "Fee",
      value: doctor.fee ? `Rs. ${doctor.fee}` : "Not set",
    },
    { key: "hospital", label: "Hospital", value: doctor.hospital },
    { key: "pmdc", label: "PMDC Number", value: doctor.pmdcNumber },
  ];

  // Generate timestamp fields dynamically
  const timestampFields = [
    { key: "created", label: "Created", value: formatDate(doctor.createdAt) },
    { key: "updated", label: "Updated", value: formatDate(doctor.updatedAt) },
    ...(doctor.PaymentCompleted
      ? [
          {
            key: "payment",
            label: "Payment Completed",
            value: formatDate(doctor.PaymentCompleted),
          },
        ]
      : []),
  ];

  // Generate rating fields dynamically
  const ratingFields = [
    {
      key: "avg",
      label: "Average Rating",
      value: doctor.rating?.average
        ? `${doctor.rating.average}/5`
        : "No ratings",
    },
    {
      key: "reviews",
      label: "Total Reviews",
      value: doctor.rating?.count || 0,
    },
  ];

  const renderInfoSection = (title, fields) => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
        {title}
      </h3>
      <div className='space-y-3'>
        {fields.map(({ key, label, value }) => (
          <InfoRow
            key={key}
            label={label}
            value={value}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <div className='h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center'>
              <span className='text-emerald-600 font-medium text-lg'>
                {doctor.name
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("") || "DR"}
              </span>
            </div>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>
                {doctor.name || "Unknown Doctor"}
              </h2>
              <p className='text-sm text-gray-500'>
                {doctor.email || "No email"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className='px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {renderInfoSection("Personal Information", personalFields)}
          {renderInfoSection("Professional Information", professionalFields)}

          {/* Verification Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
              Verification Status
            </h3>
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-500'>
                  Status:
                </span>
                <StatusBadge status={doctor.status} />
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-500'>
                  PMDC Verified:
                </span>
                <Badge
                  condition={doctor.pmdcVerified}
                  trueLabel='Verified'
                  falseLabel='Not Verified'
                />
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-500'>
                  Hospital Verified:
                </span>
                <Badge
                  condition={doctor.hospitalVerified}
                  trueLabel='Verified'
                  falseLabel='Not Verified'
                />
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-500'>
                  Availability:
                </span>
                <Badge
                  condition={doctor.availability}
                  trueLabel='Available'
                  falseLabel='Not Available'
                />
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-500'>
                  Active:
                </span>
                <Badge
                  condition={doctor.isActive}
                  trueLabel='Active'
                  falseLabel='Inactive'
                />
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-500'>
                  Blocked:
                </span>
                <Badge
                  condition={!doctor.isBlocked}
                  trueLabel='Not Blocked'
                  falseLabel='Blocked'
                />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
              Documents ({doctor.documents?.length || 0})
            </h3>
            {doctor.documents?.length ? (
              doctor.documents.map((doc, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                  <div className='flex items-center space-x-3'>
                    <div className='h-8 w-8 bg-emerald-100 rounded flex items-center justify-center'>
                      <svg
                        className='w-4 h-4 text-emerald-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                        />
                      </svg>
                    </div>
                    <span className='text-sm font-medium text-gray-900'>
                      Document {i + 1}
                    </span>
                  </div>
                  <a
                    href={doc.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-emerald-600 hover:text-emerald-800 text-sm font-medium'>
                    View
                  </a>
                </div>
              ))
            ) : (
              <p className='text-sm text-gray-500'>No documents uploaded</p>
            )}
          </div>

          {renderInfoSection("Timestamps", timestampFields)}
          {renderInfoSection("Rating", ratingFields)}
        </div>

        {/* Verification Notes */}
        {doctor.verificationNotes && (
          <div className='px-6 pb-6'>
            <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
              Verification Notes
            </h3>
            <p className='text-sm text-gray-700 bg-gray-50 p-3 rounded-lg'>
              {doctor.verificationNotes}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className='px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
            Close
          </button>
          <button
            onClick={() => handleDoctorReject(doctor._id)}
            className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700'>
            Reject
          </button>
          <button
            onClick={() => onApprove(doctor._id)}
            className='px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700'>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorReviewModal;
