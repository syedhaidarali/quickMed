/** @format */
import React from "react";
import InputField from "../components/formItems/InputField";
import Dropdown from "../components/formItems/Dropdown";
import MultiSelectSpecialty from "../components/formItems/MultiSelectSpecialty";
import SearchableDropdown from "../components/formItems/SearchableDropdown";
import {
  DEGREE_OPTIONS,
  GENDERS,
  REGISTERED_HOSPITALS,
  RELIGIONS,
} from "../assets/dummy";
import { Link } from "react-router-dom";
import { useFormHandler } from "../hooks/useFormHandler";
const JoinAsDoctor = () => {
  const {
    handleSubmit,
    formState: { errors },
    formValues,
    handleCnicChange,
    handleSpecialtyChange,
    handleHospitalChange,
    handleHospitalVerification,
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
              className='space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2'
              onSubmit={handleSubmit}>
              {/* Full Name */}
              <InputField
                label='Full Name'
                name='name'
                value={formValues.name || ""}
                onChange={handleInputChange("name")}
                error={errors.name?.message}
                required
              />

              {/* Email */}
              <InputField
                label='Email'
                type='email'
                name='email'
                value={formValues.email || ""}
                onChange={handleInputChange("email")}
                error={errors.email?.message}
                required
                autoComplete='email'
              />

              {/* Specialities */}
              <div className='md:col-span-2'>
                <MultiSelectSpecialty
                  selectedSpecialties={formValues.speciality || []}
                  onSpecialtiesChange={handleSpecialtyChange}
                  placeholder='Search and select your specialties...'
                  maxSelections={5}
                />
                {errors.speciality && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.speciality.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <InputField
                label='Phone'
                type='tel'
                name='phone'
                value={formValues.phone || ""}
                onChange={handleInputChange("phone")}
                error={errors.phone?.message}
                required
                placeholder='03XXXXXXXXX'
                onlyNumbers
              />

              {/* Religion */}
              <div>
                <label className='block text-emerald-700 font-medium mb-1'>
                  Religion
                </label>
                <Dropdown
                  options={RELIGIONS}
                  value={formValues.religion || ""}
                  onChange={(val) => handleDropdownChange("religion", val)}
                  placeholder='Select Religion'
                />
                {errors.religion && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.religion.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className='block text-emerald-700 font-medium mb-1'>
                  Gender
                </label>
                <Dropdown
                  options={GENDERS}
                  value={formValues.gender || ""}
                  onChange={(val) => handleDropdownChange("gender", val)}
                  placeholder='Select Gender'
                />
                {errors.gender && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Main Degree */}
              <div>
                <label className='block text-emerald-700 font-medium mb-1'>
                  Main Degree
                </label>
                <Dropdown
                  options={DEGREE_OPTIONS}
                  value={formValues.mainDegree || ""}
                  onChange={(val) => handleDropdownChange("mainDegree", val)}
                  placeholder='Select Main Degree'
                />
                {errors.mainDegree && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.mainDegree.message}
                  </p>
                )}
              </div>

              {/* Full Address */}
              <div>
                <label className='block text-emerald-700 font-medium mb-1'>
                  Full Address
                </label>
                <textarea
                  name='fullAddress'
                  value={formValues.fullAddress || ""}
                  onChange={handleInputChange("fullAddress")}
                  required
                  rows={1}
                  className={`w-full px-3 py-2 border ${
                    errors.fullAddress ? "border-red-300" : "border-emerald-200"
                  } rounded focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
                {errors.fullAddress && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.fullAddress.message}
                  </p>
                )}
              </div>

              {/* Hospital */}
              <div>
                <label className='block text-emerald-700 font-medium mb-1'>
                  Hospital
                  {formValues.hospitalVerified && (
                    <span className='ml-2 text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded'>
                      ✓ Verified
                    </span>
                  )}
                  {formValues.hospital && !formValues.hospitalVerified && (
                    <span className='ml-2 text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded'>
                      ⚠ New Hospital
                    </span>
                  )}
                </label>
                <SearchableDropdown
                  options={REGISTERED_HOSPITALS}
                  value={formValues.hospital || ""}
                  onChange={handleHospitalChange}
                  onVerificationChange={handleHospitalVerification}
                  registeredOptions={REGISTERED_HOSPITALS}
                  placeholder='Search hospitals or add new one...'
                  allowAddNew
                />
                {errors.hospital && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.hospital.message}
                  </p>
                )}
              </div>

              {/* City */}
              <InputField
                label='City'
                name='city'
                value={formValues.city || ""}
                onChange={handleInputChange("city")}
                error={errors.city?.message}
                placeholder='Enter City Name'
              />

              {/* Experience */}
              <InputField
                label='Experience (years)'
                type='number'
                name='experience'
                value={formValues.experience || ""}
                onChange={handleInputChange("experience")}
                error={errors.experience?.message}
                required
                min={0}
              />

              {/* CNIC */}
              <InputField
                label='CNIC'
                name='cnic'
                value={formValues.cnic || ""}
                onChange={handleCnicChange}
                error={errors.cnic?.message}
                required
                placeholder='xxxxx-xxxxxxx-x'
                maxLength={15}
                onlyNumbers
                allowDashes
              />

              {/* Fee */}
              <InputField
                label='Fee'
                type='number'
                name='fee'
                value={formValues.fee || ""}
                onChange={handleInputChange("fee")}
                error={errors.fee?.message}
                required
                min={0}
                onlyNumbers
              />

              {/* PMDC Number */}
              <InputField
                label='PMDC Number'
                name='pmdcNumber'
                value={formValues.pmdcNumber || ""}
                onChange={handleInputChange("pmdcNumber")}
                error={errors.pmdcNumber?.message}
                required
                placeholder='Enter PMDC Number'
              />

              {/* Password */}
              <InputField
                label='Password'
                type='password'
                name='password'
                value={formValues.password || ""}
                onChange={handleInputChange("password")}
                error={errors.password?.message}
                required
              />

              {/* Confirm Password */}
              <InputField
                label='Confirm Password'
                type='password'
                name='confirmPassword'
                value={formValues.confirmPassword || ""}
                onChange={handleInputChange("confirmPassword")}
                error={errors.confirmPassword?.message}
                required
              />

              {/* Agreement */}
              <div className='flex items-center space-x-2 mt-4 md:col-span-2'>
                <input
                  type='checkbox'
                  id='agreement'
                  name='agreement'
                  checked={formValues.agreement || false}
                  onChange={handleInputChange("agreement")}
                  className='h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300'
                />
                <label
                  htmlFor='agreement'
                  className='text-emerald-800 font-semibold text-base'>
                  🔒 Please make sure all fields are filled correctly before
                  submitting.
                </label>
              </div>
              {errors.agreement && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.agreement.message}
                </p>
              )}

              {/* Submit Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full md:col-span-2 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 font-medium transition-colors duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed'>
                {loading ? "Submitting..." : "Submit"}
              </button>

              {/* Login Link */}
              <div className='w-full text-center md:col-span-2'>
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
