/** @format */
import React from "react";
import { Link } from "react-router-dom";
import { useHospitalFormHandler } from "../hooks/useHospitalFormHandler";
import InputField from "../components/formItems/InputField";
import Dropdown from "../components/formItems/Dropdown";
import FileUpload from "../components/formItems/FileUpload";
import DocumentUpload from "../components/formItems/DocumentUpload";
import { HOSPITAL_CATEGORIES, HOSPITAL_TYPES } from "../assets/dummy";

const JoinAsHospital = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    formValues,
    handleDropdownChange,
    handleImageChange,
    handleDocumentChange,
    removeDocument,
    onSubmit,
    showSuccess,
    setShowSuccess,
    loading,
    error,
    handleCnicChange,
  } = useHospitalFormHandler();

  return (
    <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50 py-16 px-4'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full'>
        {showSuccess ? (
          <div className='text-center'>
            <div className='text-6xl mb-4'>🏥</div>
            <h1 className='text-3xl font-bold text-emerald-800 mb-4'>
              Application Submitted Successfully!
            </h1>
            <p className='text-gray-600 mb-6'>
              Thank you for your interest in joining our platform. Your hospital
              application has been submitted and is currently under review by
              our admin team.
            </p>
            <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6'>
              <h3 className='font-semibold text-emerald-800 mb-2'>
                What happens next?
              </h3>
              <ul className='text-sm text-emerald-700 space-y-1'>
                <li>• Our admin team will review your application</li>
                <li>• We'll verify your hospital license and documents</li>
                <li>• You'll receive an email notification once approved</li>
                <li>
                  • After approval, you can complete your hospital profile setup
                </li>
              </ul>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className='bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors'>
              Submit Another Application
            </button>
          </div>
        ) : (
          <>
            <div className='flex flex-col items-center mb-4'>
              <span className='text-emerald-600 text-4xl mb-2'>🏥</span>
              <h1 className='text-3xl font-bold text-emerald-800 mb-2 text-center'>
                Join as a Hospital
              </h1>
            </div>

            <form
              className='space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2'
              onSubmit={handleSubmit(onSubmit)}>
              {/* Hospital Name */}
              <InputField
                label='Hospital Name'
                name='name'
                {...register("name")}
                error={errors.name?.message}
                required
                placeholder='Enter hospital name'
              />

              {/* Email */}
              <InputField
                label='Email'
                type='email'
                name='email'
                {...register("email")}
                error={errors.email?.message}
                required
                placeholder='hospital@example.com'
                autoComplete='email'
              />

              {/* Description */}
              <div className='md:col-span-2'>
                <label className='block text-emerald-700 font-medium mb-1'>
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className={`w-full px-3 py-2 border ${
                    errors.description ? "border-red-300" : "border-emerald-200"
                  } rounded focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  placeholder='Brief description of your hospital...'
                />
                {errors.description?.message && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Hospital Type */}
              <div>
                <label className='block text-emerald-700 font-medium mb-1'>
                  Hospital Type
                </label>
                <Dropdown
                  options={HOSPITAL_TYPES}
                  value={formValues.hospitalType || ""}
                  onChange={(val) => handleDropdownChange("hospitalType", val)}
                  placeholder='Select Hospital Type'
                />
                {errors.hospitalType?.message && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.hospitalType.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className='block text-emerald-700 font-medium mb-1'>
                  Category
                </label>
                <Dropdown
                  options={HOSPITAL_CATEGORIES}
                  value={formValues.category || ""}
                  onChange={(val) => handleDropdownChange("category", val)}
                  placeholder='Select Category'
                />
                {errors.category?.message && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <InputField
                label='Phone'
                type='tel'
                name='phone'
                {...register("phone")}
                error={errors.phone?.message}
                required
                placeholder='03XXXXXXXXX'
                onlyNumbers
              />

              {/* License Number */}
              <InputField
                label='License Number'
                name='licenseNumber'
                {...register("licenseNumber")}
                error={errors.licenseNumber?.message}
                required
                placeholder='Enter hospital license number'
              />

              {/* Established Year */}
              <InputField
                label='Established Year'
                name='establishedYear'
                type='number'
                {...register("establishedYear")}
                error={errors.establishedYear?.message}
                required
                min={1900}
                max={new Date().getFullYear()}
                placeholder='e.g., 1995'
              />

              {/* Total Beds */}
              <InputField
                label='Total Beds'
                name='totalBeds'
                type='number'
                {...register("totalBeds")}
                error={errors.totalBeds?.message}
                required
                min={1}
                placeholder='Number of beds'
              />

              {/* Operation Theaters */}
              <InputField
                label='Operation Theaters'
                name='operationTheaters'
                type='number'
                {...register("operationTheaters")}
                error={errors.operationTheaters?.message}
                required
                min={0}
                placeholder='Number of OTs'
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

              {/* Address */}
              <div className='md:col-span-2'>
                <label className='block text-emerald-700 font-medium mb-1'>
                  Address
                </label>
                <textarea
                  {...register("address")}
                  required
                  rows={2}
                  className={`w-full px-3 py-2 border ${
                    errors.address ? "border-red-300" : "border-emerald-200"
                  } rounded focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  placeholder='Full hospital address...'
                />
                {errors.address?.message && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* City */}
              <InputField
                label='City'
                name='city'
                {...register("city")}
                error={errors.city?.message}
                required
                placeholder='Enter city name'
              />

              {/* Services Checkboxes */}
              <div className='md:col-span-2'>
                <label className='block text-emerald-700 font-medium mb-2'>
                  Available Services
                </label>
                <div className='space-y-2'>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id='emergencyServices'
                      {...register("services.emergencyServices")}
                      className='h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded'
                    />
                    <label
                      htmlFor='emergencyServices'
                      className='ml-2 text-sm text-gray-700'>
                      Emergency Services Available
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id='ambulanceServices'
                      {...register("services.ambulanceServices")}
                      className='h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded'
                    />
                    <label
                      htmlFor='ambulanceServices'
                      className='ml-2 text-sm text-gray-700'>
                      Ambulance Services Available
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      id='icuServices'
                      {...register("services.icuServices")}
                      className='h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded'
                    />
                    <label
                      htmlFor='icuServices'
                      className='ml-2 text-sm text-gray-700'>
                      ICU Services Available
                    </label>
                  </div>
                </div>
              </div>

              {/* Hospital Image */}
              <div className='md:col-span-2'>
                <FileUpload
                  label='Hospital Image'
                  name='image'
                  onChange={handleImageChange}
                  error={errors.image?.message}
                  accept='image/jpeg,image/png,image/jpg'
                  maxSize={5000000}
                  required
                />
              </div>

              {/* Documents */}
              <div className='md:col-span-2'>
                <FileUpload
                  label='Hospital Documents'
                  name='documents'
                  onChange={handleDocumentChange}
                  error={errors.documents?.message}
                  accept='image/jpeg,image/png,image/jpg'
                  maxSize={5000000}
                  required
                />
              </div>
              {/* Password */}
              <InputField
                label='Password'
                type='password'
                name='password'
                {...register("password")}
                error={errors.password?.message}
                required
              />

              {/* Confirm Password */}
              <InputField
                label='Confirm Password'
                type='password'
                name='confirmPassword'
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                required
              />

              {/* Agreement */}
              <div className='flex items-center space-x-2 mt-4 md:col-span-2'>
                <input
                  type='checkbox'
                  id='agreement'
                  {...register("agreement")}
                  className='h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300'
                  required
                />
                <label
                  htmlFor='agreement'
                  className='text-emerald-800 font-semibold text-base'>
                  🔒 Please make sure all fields are filled correctly before
                  submitting.
                </label>
              </div>
              {errors.agreement?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.agreement.message}
                </p>
              )}

              {/* Error Display */}
              {error && (
                <div className='md:col-span-2 bg-red-50 border border-red-200 rounded-lg p-4'>
                  <p className='text-red-600 text-sm'>{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type='submit'
                disabled={!isValid || loading}
                className='w-full md:col-span-2 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 font-medium transition-colors duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed'>
                {loading ? "Submitting..." : "Submit"}
              </button>

              {/* Login Link */}
              <div className='w-full text-center md:col-span-2'>
                <span className='text-sm font-semibold text-emerald-700'>
                  Already have an account?
                </span>
                <Link
                  to='/hospital/login'
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

export default JoinAsHospital;
