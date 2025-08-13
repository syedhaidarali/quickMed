/** @format */
import { useAdmin } from "../../context/AdminContext";
import { toast } from "sonner";

import React, { useState } from "react";
import {
  CloseIcon,
  EditIcon,
  DocumentIcon,
  DownloadIcon,
} from "../../assets/svg";
import DoctorFormFields from "../forms/DoctorFormFields";
import { personalFields, professionalFields } from "../../assets/dummy";

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
  isRejected,
  isOpen,
  doctor,
  onClose,
  onApprove,
  onReject,
  handleDoctorReject,
  // Add new props for updating doctor status and profile image
  onToggleActive,
  onProfileImageUpload,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [error, setError] = useState("");
  const [documents, setDocuments] = useState(doctor.documents || []);
  const {
    DoctorDocumentUpload,
    loading,
    doctorProfilePicture,
    updateDoctorDetails,
    doctorAction,
  } = useAdmin();
  const fileInputRef = React.useRef();
  // Add ref for profile image upload
  const profileImageInputRef = React.useRef();
  // Local preview for profile image to reflect change instantly
  const [profilePreviewUrl, setProfilePreviewUrl] = useState(null);

  // Add edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);

  React.useEffect(() => {
    setDocuments(doctor.documents || []);
    // Initialize edited doctor data
    setEditedDoctor({
      name: doctor.name || "",
      speciality: Array.isArray(doctor.speciality)
        ? doctor.speciality
        : [doctor.speciality || ""],
      phone: doctor.phone || "",
      mainDegree: doctor.mainDegree || "",
      fullAddress: doctor.fullAddress || "",
      hospital: doctor.hospital || "",
      // hospitalVerified: !!doctor.hospitalVerified,
      experience: doctor.experience || "",
      fee: doctor.fee || "",
      availability: doctor.availability || false,
      pmdcNumber: doctor.pmdcNumber || "",
      cnic: doctor.cnic || "",
      email: doctor.email || "",
      gender: doctor.gender || "",
    });
  }, [doctor.documents, doctor]);

  // Handle input changes for editable fields
  const handleInputChange = (field, value) => {
    setEditedDoctor((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle speciality array changes
  const handleSpecialityChange = (index, value) => {
    const newSpeciality = [...editedDoctor.speciality];
    newSpeciality[index] = value;
    setEditedDoctor((prev) => ({
      ...prev,
      speciality: newSpeciality,
    }));
  };

  // Add new speciality field
  const addSpeciality = () => {
    setEditedDoctor((prev) => ({
      ...prev,
      speciality: [...prev.speciality, ""],
    }));
  };

  // Remove speciality field
  const removeSpeciality = (index) => {
    setEditedDoctor((prev) => ({
      ...prev,
      speciality: prev.speciality.filter((_, i) => i !== index),
    }));
  };

  // Save doctor data changes
  const handleSaveChanges = async () => {
    setSaveLoading(true);
    try {
      const cleanSpeciality = editedDoctor.speciality.filter(
        (s) => s.trim() !== ""
      );
      const updatedData = {
        ...editedDoctor,
        speciality: cleanSpeciality,
        experience: parseInt(editedDoctor.experience) || 0,
        fee: parseInt(editedDoctor.fee) || 0,
      };
      updateDoctorDetails(doctor._id, updatedData);
      setIsEditMode(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSaveLoading(false);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setIsEditMode(false);
    // Reset to original data
    setEditedDoctor({
      name: doctor.name || "",
      speciality: Array.isArray(doctor.speciality)
        ? doctor.speciality
        : [doctor.speciality || ""],
      phone: doctor.phone || "",
      mainDegree: doctor.mainDegree || "",
      fullAddress: doctor.fullAddress || "",
      hospital: doctor.hospital || "",
      hospitalVerified: !!doctor.hospitalVerified,
      experience: doctor.experience || "",
      fee: doctor.fee || "",
      availability: doctor.availability || false,
      pmdcNumber: doctor.pmdcNumber || "",
      cnic: doctor.cnic || "",
      email: doctor.email || "",
      gender: doctor.gender || "",
    });
  };

  const handleImageChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append("documents", file); // profile image
      await DoctorDocumentUpload(formData, doctor._id);
    }
  };

  // Handler for toggling active status
  const handleToggleActive = async () => {
    if (doctor.isActive) {
      console.log(doctor.isActive);
      await doctorAction(doctor._id, { action: false });
    } else {
      await doctorAction(doctor._id, { action: true });
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
      await doctorProfilePicture(doctor._id, formData);
    }
  };

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

  const openImageViewer = (imageUrl) => {
    console.log("openImageViewer called with:", imageUrl);
    if (!imageUrl) {
      console.error("No image URL provided");
      return;
    }
    setSelectedImage(imageUrl);
    setIsImageViewerOpen(true);
    console.log("Image viewer state set:", {
      selectedImage: imageUrl,
      isOpen: true,
    });
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

  // Render editable input field
  const renderEditableField = (field, label, type = "text", options = null) => (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-gray-700'>{label}</label>
      {type === "select" ? (
        <select
          value={editedDoctor[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500'>
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          value={editedDoctor[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          rows={3}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500'
        />
      ) : type === "checkbox" ? (
        <input
          type='checkbox'
          checked={editedDoctor[field] || false}
          onChange={(e) => handleInputChange(field, e.target.checked)}
          className='h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded'
        />
      ) : (
        <input
          type={type}
          value={editedDoctor[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500'
        />
      )}
    </div>
  );

  // Render speciality fields
  const renderSpecialityFields = () => (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-gray-700'>Speciality</label>
      <div className='space-y-2'>
        {editedDoctor.speciality?.map((spec, index) => (
          <div
            key={index}
            className='flex space-x-2'>
            <input
              type='text'
              value={spec}
              onChange={(e) => handleSpecialityChange(index, e.target.value)}
              className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500'
              placeholder='Enter speciality'
            />
            <button
              type='button'
              onClick={() => removeSpeciality(index)}
              className='px-3 py-2 text-red-600 hover:text-red-800'>
              Remove
            </button>
          </div>
        ))}
        <button
          type='button'
          onClick={addSpeciality}
          className='px-3 py-2 text-emerald-600 hover:text-emerald-800 text-sm'>
          + Add Speciality
        </button>
      </div>
    </div>
  );

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

  // Render editable personal information
  const renderEditablePersonalInfo = () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
        Personal Information
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {renderEditableField("name", "Name")}
        {renderEditableField("email", "Email", "email")}
        {renderEditableField("phone", "Phone", "tel")}
        {renderEditableField("cnic", "CNIC")}
        {renderEditableField("gender", "Gender", "select", [
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
          { value: "Other", label: "Other" },
        ])}
        {renderEditableField("religion", "Religion")}
        {renderEditableField("fullAddress", "Address", "textarea")}
      </div>
    </div>
  );

  // Render editable professional information
  const renderEditableProfessionalInfo = () => (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>
        Professional Information
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {renderEditableField("mainDegree", "Main Degree")}
        {renderSpecialityFields()}
        {renderEditableField("experience", "Experience (years)", "number")}
        {renderEditableField("fee", "Fee (Rs.)", "number")}
        {renderEditableField("hospital", "Hospital")}
        {renderEditableField("pmdcNumber", "PMDC Number")}
        <div className='flex items-center space-x-2'>
          {renderEditableField(
            "availability",
            "Available for appointments",
            "checkbox"
          )}
          <span className='text-sm text-gray-600'>Available</span>
        </div>
      </div>
    </div>
  );

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

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <div className='h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center relative overflow-hidden'>
              {profilePreviewUrl ||
              doctor.profilePicture ||
              doctor.profileImageUrl ? (
                <img
                  src={
                    profilePreviewUrl ||
                    doctor.profilePicture ||
                    doctor.profileImageUrl
                  }
                  alt='Profile'
                  className='h-12 w-12 object-cover rounded-full'
                  onError={(e) => {
                    e.currentTarget.src = "";
                  }}
                />
              ) : (
                <span className='text-emerald-600 font-medium text-lg'>
                  {doctor.name
                    ?.split(" ")
                    ?.map((n) => n[0])
                    ?.join("") || "DR"}
                </span>
              )}
              {/* Edit Profile Image Button */}
              <button
                type='button'
                className='absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100'
                title='Edit Profile Image'
                onClick={() =>
                  profileImageInputRef.current &&
                  profileImageInputRef.current.click()
                }>
                <EditIcon />
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
                {doctor.name || "Unknown Doctor"}
              </h2>
              <p className='text-sm text-gray-500'>
                {doctor.email || "No email"}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            {/* Edit Mode Toggle Button */}
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isEditMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}>
              {isEditMode ? "View Mode" : "Edit Mode"}
            </button>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600'>
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className='px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {isEditMode ? (
            <div className='lg:col-span-2'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <DoctorFormFields
                  values={editedDoctor}
                  errors={{}}
                  include={{
                    password: false,
                    confirmPassword: false,
                    agreement: false,
                    city: false,
                    hospital: false,
                    hospitalVerified: false,
                  }}
                  onInputChange={(field) => (e) => {
                    const value =
                      e?.target?.type === "checkbox"
                        ? e.target.checked
                        : e?.target?.value;
                    handleInputChange(field, value);
                  }}
                  onDropdownChange={(field, val) =>
                    handleInputChange(field, val)
                  }
                  onSpecialtyChange={(list) =>
                    handleInputChange("speciality", list)
                  }
                  // onHospitalChange={(val) => handleInputChange("hospital", val)}
                  // onHospitalVerification={(v) =>
                  //   handleInputChange("hospitalVerified", v)
                  // }
                  onCnicChange={(e) => {
                    const value = e?.target?.value || "";
                    handleInputChange("cnic", value);
                  }}
                />
                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    id='availability'
                    checked={editedDoctor.availability || false}
                    onChange={(e) =>
                      handleInputChange("availability", e.target.checked)
                    }
                    className='h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded'
                  />
                  <label
                    htmlFor='availability'
                    className='text-sm text-gray-700'>
                    Available for appointments
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <>
              {renderInfoSection(
                "Personal Information",
                personalFields(doctor)
              )}
              {renderInfoSection(
                "Professional Information",
                professionalFields(doctor)
              )}
            </>
          )}

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
                <div className='flex items-center space-x-2'>
                  <Badge
                    condition={doctor.isActive}
                    trueLabel='Active'
                    falseLabel='Inactive'
                  />
                  {/* Edit Active/Inactive Button */}
                  <button
                    type='button'
                    className='ml-2 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200'
                    onClick={handleToggleActive}
                    title='Toggle Active Status'>
                    Edit
                  </button>
                </div>
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
              Documents ({documents?.length || 0})
            </h3>
            {documents?.length ? (
              documents.map((doc, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                  <div className='flex items-center space-x-3'>
                    <div className='h-8 w-8 bg-emerald-100 rounded flex items-center justify-center'>
                      <DocumentIcon />
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
          {isEditMode && (
            <>
              <button
                onClick={handleCancelEdit}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className='px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700'
                disabled={saveLoading}>
                {saveLoading ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'>
            Close
          </button>
          {!isRejected && (
            <button
              onClick={() => handleDoctorReject(doctor._id)}
              className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700'>
              Reject
            </button>
          )}
          <button
            onClick={() => onApprove(doctor._id)}
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
              <CloseIcon />
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
              <DownloadIcon />
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

export default DoctorReviewModal;
