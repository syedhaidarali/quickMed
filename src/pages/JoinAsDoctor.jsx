/** @format */
import React from "react";
import { Link } from "react-router-dom";
import DoctorFormFields from "../components/forms/DoctorFormFields";
import { useFormHandler } from "../hooks";
const JoinAsDoctor = () => {
  const {
    handleSubmit,
    formState: { errors },
    formValues,
    handleCnicChange,
    handleSpecialtyChange,
    handleHospitalSelection,
    handleDropdownChange,
    handleInputChange,
    resetForm,
    showSuccess,
    setShowSuccess,
    loading,
  } = useFormHandler();

  return (
    <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50 py-16 px-4'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full'>
        {showSuccess ? (
          <div className='text-center'>
            <div className='text-6xl mb-4'>🎉</div>
            <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
              Application Submitted Successfully!
            </h1>
            <p className='text-gray-600 mb-6'>
              Thank you for your interest in joining our platform. Your
              application has been submitted and is currently under review by
              our admin team.
            </p>
            <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6'>
              <h3 className='font-semibold text-emerald-800 mb-2'>
                What happens next?
              </h3>
              <ul className='text-sm text-emerald-700 space-y-1'>
                <li>• Our admin team will review your application</li>
                <li>• We'll verify your credentials and documents</li>
                <li>• You'll receive an email notification once approved</li>
                <li>• After approval, you can complete your profile setup</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setShowSuccess(false);
                resetForm();
              }}
              className='bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors'>
              Submit Another Application
            </button>
          </div>
        ) : (
          <>
            <div className='flex flex-col items-center mb-4'>
              <span className='text-emerald-600 text-4xl mb-2'>🩺</span>
              <h1 className='text-3xl font-bold text-emerald-800 mb-2 text-center'>
                Join as a Doctor
              </h1>
            </div>

            <form
              className='space-y-4'
              onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <DoctorFormFields
                  values={formValues}
                  errors={errors}
                  onInputChange={(field) => handleInputChange(field)}
                  onDropdownChange={handleDropdownChange}
                  onSpecialtyChange={handleSpecialtyChange}
                  onHospitalChange={handleHospitalSelection}
                  onCnicChange={handleCnicChange}
                />
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 font-medium transition-colors duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed'>
                {loading ? "Submitting..." : "Submit"}
              </button>

              <div className='w-full text-center'>
                <span className='text-sm font-semibold text-emerald-700'>
                  Already have an account?
                </span>
                <Link
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  to='/doctor/login'
                  className='ml-1 text-emerald-600 hover:underline font-medium'>
                  Login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default JoinAsDoctor;
