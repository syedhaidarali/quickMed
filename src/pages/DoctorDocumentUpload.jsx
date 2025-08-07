/** @format */
import React, { useState, useEffect } from "react";
import { UploadCloud, UserCircle } from "lucide-react";
import Modal from "../modals/Modal";
import { useDoctor } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const DoctorDocumentUpload = () => {
  const [documents, setDocuments] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(true);
  const navigate = useNavigate();

  const { DoctorProfile, DoctorDocumentUpload, loading } = useDoctor();

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (uploadMessage) {
      setModalOpen(true);
    }
  }, [uploadMessage]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      setDocuments(selectedFiles);
    } else {
      setDocuments(null);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      const formData = new FormData();
      formData.append("image", file); // profile image
      DoctorProfile(formData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!documents) {
      setUploadMessage("Please upload at least one image document.");
      return;
    }

    const formData = new FormData();
    Array.from(documents).forEach((doc) => {
      formData.append("documents", doc);
    });

    DoctorDocumentUpload(formData, navigate);

    // Show verification modal after submission
    setUploadMessage(
      "Login successful but account is still in pending verification. We are reviewing your profile and will contact you via email."
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-lg bg-white rounded-2xl shadow-lg p-8'>
        <h2 className='text-3xl font-bold text-center text-emerald-800 mb-6'>
          Upload Your Documents
        </h2>

        <form
          onSubmit={handleSubmit}
          className='space-y-6'>
          {/* Profile Image Upload */}
          <div className='flex flex-col items-center gap-2'>
            <label
              htmlFor='profileImage'
              className='cursor-pointer group'>
              <div className='w-28 h-28 mx-auto rounded-full border-4 border-dashed border-emerald-400 flex items-center justify-center bg-gray-50 overflow-hidden transition hover:border-emerald-600'>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <UserCircle className='w-16 h-16 text-gray-300 group-hover:text-emerald-400' />
                )}
              </div>
              <input
                id='profileImage'
                type='file'
                name='profileImage'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
              <p className='text-sm text-gray-500 mt-2 group-hover:text-emerald-700 transition'>
                Click to upload profile image (optional)
              </p>
            </label>
          </div>

          {/* Documents Upload */}
          <div className='w-full'>
            <label className='block text-sm font-medium text-emerald-700 mb-1'>
              Upload Supporting Documents{" "}
              <span className='text-red-500'>*</span>
            </label>
            <div className='flex items-center justify-center w-full'>
              <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-emerald-300 rounded-lg cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition'>
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <UploadCloud className='w-8 h-8 mb-2 text-emerald-500' />
                  <p className='text-sm text-gray-500'>
                    <span className='font-semibold'>Click to upload</span> or
                    drag & drop image(s)
                  </p>
                  <p className='text-xs text-gray-400 mt-1'>
                    Only image formats are allowed (JPG, PNG, etc.)
                  </p>
                </div>
                <input
                  type='file'
                  name='documents'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='hidden'
                  multiple
                  required
                />
              </label>
            </div>

            {/* Display file names */}
            {documents && (
              <ul className='mt-2 text-sm text-gray-600 list-disc list-inside space-y-1'>
                {Array.from(documents).map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md shadow transition'>
            {loading ? "Submitting..." : "Submit Documents"}
          </button>
        </form>
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title='Verification Pending'
          description='Login successful but account is still in pending verification. We are reviewing your profile and will contact you via email.'>
          <button
            className='w-fit mx-auto px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow-md hover:bg-emerald-700 transition-all duration-300'
            onClick={() => navigate("/")}>
            Home
          </button>
        </Modal>
      )}
    </div>
  );
};

export default DoctorDocumentUpload;
