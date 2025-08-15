/** @format */
import { useAdmin } from "../../context/AdminContext";
import { toast } from "sonner";

import React, { useState } from "react";

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
const HospitalReviewModal = ({
  isRejected,
  isOpen,
  hospital,
  onClose,
  onApprove,
  onReject,
  handleHospitalReject,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [error, setError] = useState("");
  const [documents, setDocuments] = useState(hospital.documents || []);
  const { loading, hospitalProfilePicture, HospitalDocumentUpload } =
    useAdmin();
  const fileInputRef = React.useRef();
  const profileImageInputRef = React.useRef();
  const [profilePreviewUrl, setProfilePreviewUrl] = useState(null);

  React.useEffect(() => {
    setDocuments(hospital.documents || []);
  }, [hospital.documents, hospital]);

  const handleImageChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append("documents", file);
      await HospitalDocumentUpload(formData, hospital._id);
    }
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePreviewUrl(previewUrl);
      const formData = new FormData();
      // Ensure field name matches backend expectation
      formData.append("image", file);
      await hospitalProfilePicture(hospital._id, formData);
    }
  };

  if (!isOpen || !hospital) return null;

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

  const openImageViewer = (imageUrl) => {
    if (!imageUrl) {
      console.error("No image URL provided");
      return;
    }
    setSelectedImage(imageUrl);
    setIsImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsImageViewerOpen(false);
    setSelectedImage(null);
  };

  // Handle ESC key press
  React.useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isImageViewerOpen) {
        closeImageViewer();
      }
    };

    if (isImageViewerOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isImageViewerOpen]);

  // Generate personal fields dynamically
  const personalFields = [
    { key: "name", label: "Hospital Name", value: hospital.name },
    { key: "email", label: "Email", value: hospital.email },
    { key: "phone", label: "Phone", value: hospital.phone },
    { key: "cnic", label: "CNIC", value: hospital.cnic },
    { key: "address", label: "Address", value: hospital.address },
    { key: "city", label: "City", value: hospital.city },
  ];

  // Generate professional fields dynamically
  const professionalFields = [
    { key: "type", label: "Hospital Type", value: hospital.hospitalType },
    { key: "category", label: "Category", value: hospital.category },
    { key: "license", label: "License Number", value: hospital.licenseNumber },
    {
      key: "established",
      label: "Established Year",
      value: hospital.establishedYear
        ? `${hospital.establishedYear}`
        : "Not specified",
    },
    { key: "beds", label: "Total Beds", value: hospital.totalBeds },
    {
      key: "ot",
      label: "Operation Theaters",
      value: hospital.operationTheaters,
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

  // Generate timestamp fields dynamically
  const timestampFields = [
    { key: "created", label: "Created", value: formatDate(hospital.createdAt) },
    { key: "updated", label: "Updated", value: formatDate(hospital.updatedAt) },
  ];

  // Generate rating fields dynamically
  const ratingFields = [
    {
      key: "avg",
      label: "Average Rating",
      value: hospital.rating?.average
        ? `${hospital.rating.average}/5`
        : "No ratings",
    },
    {
      key: "reviews",
      label: "Total Reviews",
      value: hospital.rating?.count || 0,
    },
  ];

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <div className='h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center relative overflow-hidden'>
              {profilePreviewUrl ||
              hospital.profilePicture ||
              hospital.profileImageUrl ||
              hospital.image ? (
                <img
                  src={
                    profilePreviewUrl ||
                    hospital.profilePicture ||
                    hospital.profileImageUrl ||
                    hospital.image
                  }
                  alt='Hospital'
                  className='h-12 w-12 object-cover rounded-full'
                  onError={(e) => {
                    e.currentTarget.src = "";
                  }}
                />
              ) : (
                <span className='text-emerald-600 font-medium text-lg'>🏥</span>
              )}
              {/* Edit Profile Image Button */}
              <button
                type='button'
                className='absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100'
                title='Edit Hospital Image'
                onClick={() =>
                  profileImageInputRef.current &&
                  profileImageInputRef.current.click()
                }>
                <svg
                  className='w-4 h-4 text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2H7a2 2 0 01-2-2v-1.586a1 1 0 01.293-.707l9.414-9.414a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414l-9.414 9.414A1 1 0 017 19v-1.586z'
                  />
                </svg>
              </button>
              <input
                type='file'
                accept='image/*'
                ref={profileImageInputRef}
                className='hidden'
                onChange={handleProfileImageChange}
              />
            </div>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>
                {hospital.name || "Unknown Hospital"}
              </h2>
              <p className='text-sm text-gray-500'>
                {hospital.email || "No email"}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
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
        </div>

        {/* Body */}
        <div className='px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {renderInfoSection("Basic Information", personalFields)}
          {renderInfoSection("Hospital Information", professionalFields)}

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
                <StatusBadge status={hospital.status} />
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-500'>
                  License Verified:
                </span>
                <Badge
                  condition={hospital.licenseVerified}
                  trueLabel='Verified'
                  falseLabel='Not Verified'
                />
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-500'>
                  Active:
                </span>
                <Badge
                  condition={hospital.isActive}
                  trueLabel='Active'
                  falseLabel='Inactive'
                />
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-gray-500'>
                  Blocked:
                </span>
                <Badge
                  condition={!hospital.isBlocked}
                  trueLabel='Not Blocked'
                  falseLabel='Blocked'
                />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
              Documents ({documents?.length || 0})
            </h3>
            {documents?.length ? (
              documents.map((doc, i) => (
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
                  <button
                    onClick={() => {
                      openImageViewer(doc.documentUrl);
                    }}
                    className='text-emerald-600 hover:text-emerald-800 text-sm font-medium'>
                    View
                  </button>
                </div>
              ))
            ) : (
              <p className='text-sm text-gray-500'>No documents uploaded</p>
            )}
            <input
              id='documents'
              type='file'
              name='documents'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
              ref={fileInputRef}
            />
            <button
              type='button'
              className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700'
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
              disabled={loading}>
              {loading ? "Uploading..." : "Add Documents"}
            </button>
            {error && <p className='text-sm text-red-600'>{error}</p>}
          </div>

          {renderInfoSection("Timestamps", timestampFields)}
          {renderInfoSection("Rating", ratingFields)}
        </div>

        {/* Verification Notes */}
        {hospital.verificationNotes && (
          <div className='px-6 pb-6'>
            <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
              Verification Notes
            </h3>
            <p className='text-sm text-gray-700 bg-gray-50 p-3 rounded-lg'>
              {hospital.verificationNotes}
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
          {!isRejected && (
            <button
              onClick={() => handleHospitalReject(hospital._id)}
              className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700'>
              Reject
            </button>
          )}
          <button
            onClick={() => onApprove(hospital._id)}
            className='px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700'>
            Approve
          </button>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {isImageViewerOpen && selectedImage && (
        <div
          className='fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60]'
          onClick={closeImageViewer}>
          <div
            className='relative max-w-4xl max-h-[90vh] mx-4'
            onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeImageViewer}
              className='absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2'>
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

            {/* Download button */}
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = selectedImage;
                link.download = `document_${Date.now()}.jpg`;
                link.click();
              }}
              className='absolute top-4 right-16 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedImage}
              alt='Document'
              className='max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl'
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCAxMDBDNTAgNzIuODM4IDcyLjgzOCA1MCAxMDAgNTBDMTI3LjE2MiA1MCAxNTAgNzIuODM4IDE1MCAxMDBDMTUwIDEyNy4xNjIgMTI3LjE2MiAxNTAgMTAwIDE1MEM3Mi44MzggMTUwIDUwIDEyNy4xNjIgNTAgMTAwWiIgZmlsbD0iIzlDQTBBNiIvPgo8cGF0aCBkPSJNMTAwIDEyNUMxMTMuODA3IDEyNSAxMjUgMTEzLjgwNyAxMjUgMTAwQzEyNSA4Ni4xOTMgMTEzLjgwNyA3NSAxMDAgNzVDODYuMTkzIDc1IDc1IDg2LjE5MyA3NSAxMEM3NSAxMTMuODA3IDg2LjE5MyAxMjUgMTAwIDEyNVoiIGZpbGw9IiM2QjcyNzkiLz4KPHN2Zz4K";
                e.target.alt = "Image not available";
              }}
            />

            {/* Image info */}
            <div className='absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded-lg'>
              Click outside or press ESC to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalReviewModal;
