/** @format */

import React, { useState } from "react";
import { UploadCloud, UserCircle } from "lucide-react";
import { toast } from "sonner";
import Modal from "../modals/Modal";
import { useDoctor } from "../context/DoctorContext";

const DoctorDocumentUpload = () => {
  const [documents, setDocuments] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("pending");

  const { DoctorProfile, DoctorDocumentUpload } = useDoctor();

  const handleFileChange = (event) => {
    setDocuments(event.target.files);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      DoctorProfile(formData);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documents || documents.length === 0) {
      toast.error("Please select at least one document");
      return;
    }

    try {
      await DoctorDocumentUpload({ documents });
      setModalOpen(true);
      setUploadMessage("Documents uploaded successfully!");
      setStatus("success");
    } catch (error) {
      setModalOpen(true);
      setUploadMessage("Failed to upload documents. Please try again.");
      setStatus("error");
    }
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
                Click to upload profile image
              </p>
            </label>
          </div>

          {/* Documents Upload */}
          <div className='w-full'>
            <label className='block text-sm font-medium text-emerald-700 mb-1'>
              Upload Supporting Documents
            </label>
            <div className='flex items-center justify-center w-full'>
              <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-emerald-300 rounded-lg cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition'>
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <UploadCloud className='w-8 h-8 mb-2 text-emerald-500' />
                  <p className='text-sm text-gray-500'>
                    <span className='font-semibold'>Click to upload</span> or
                    drag & drop
                  </p>
                </div>
                <input
                  type='file'
                  name='documents'
                  onChange={handleFileChange}
                  className='hidden'
                  multiple
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type='submit'
            className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md shadow transition'>
            Submit Documents
          </button>
        </form>
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          message={uploadMessage}
          status={status}
        />
      )}
    </div>
  );
};

export default DoctorDocumentUpload;
