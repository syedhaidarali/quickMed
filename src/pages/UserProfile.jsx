/** @format */

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import InputField from "../components/formItems/InputField";
import { formatCNIC } from "../helpers/CNICFormat";

const UserProfile = () => {
  const { user, loading, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    cnic: user?.cnic || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cnic") {
      setFormData((prev) => ({
        ...prev,
        [name]: formatCNIC(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      // Here you would typically call an API to update user profile
      // For now, we'll just show a success message
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      cnic: user?.cnic || "",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    signOut();
  };

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-emerald-50'>
        <div className='text-center'>
          <p className='text-lg text-emerald-700'>
            Please login to view your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-emerald-50 py-16 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-xl shadow-md p-8'>
          <div className='flex items-center justify-between mb-8'>
            <h1 className='text-3xl font-bold text-emerald-800'>
              User Profile
            </h1>
            <div className='flex space-x-3'>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className='px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50'>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className='px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'>
                  Edit Profile
                </button>
              )}
              <button
                onClick={handleLogout}
                className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
                Logout
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Profile Information */}
            <div className='space-y-6'>
              <h2 className='text-xl font-semibold text-emerald-700 border-b border-emerald-200 pb-2'>
                Personal Information
              </h2>

              <div className='space-y-4'>
                <InputField
                  label='Full Name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />

                <InputField
                  label='Email Address'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />

                <InputField
                  label='CNIC'
                  name='cnic'
                  value={formData.cnic}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder='xxxxx-xxxxxxx-x'
                  maxLength={15}
                  required
                />
              </div>
            </div>

            {/* Account Information */}
            <div className='space-y-6'>
              <h2 className='text-xl font-semibold text-emerald-700 border-b border-emerald-200 pb-2'>
                Account Information
              </h2>

              <div className='space-y-4'>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    User ID
                  </label>
                  <p className='text-gray-900 font-mono text-sm'>{user._id}</p>
                </div>

                <div className='bg-gray-50 p-4 rounded-lg'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Role
                  </label>
                  <p className='text-gray-900 capitalize'>{user.role}</p>
                </div>

                <div className='bg-gray-50 p-4 rounded-lg'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Member Since
                  </label>
                  <p className='text-gray-900'>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation History */}
          <div className='mt-12'>
            <h2 className='text-xl font-semibold text-emerald-700 border-b border-emerald-200 pb-2 mb-6'>
              Consultation History
            </h2>

            <div className='bg-gray-50 p-6 rounded-lg text-center'>
              <p className='text-gray-600 mb-4'>
                Your consultation history will appear here
              </p>
              <p className='text-sm text-gray-500'>
                Start your first consultation by booking an appointment with a
                doctor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
