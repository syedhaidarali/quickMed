/** @format */

import React, { useState } from "react";
import InputField from "../components/formItems/InputField";
import Dropdown from "../components/formItems/Dropdown";
import { validate } from "../helpers/Validation";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatCNIC } from "../helpers/CNICFormat";
import { HOSPITAL_CATEGORIES, HOSPITAL_TYPES } from "../assets/dummy";

const JoinAsHospital = () => {
  const [form, setForm] = useState({
    hospitalName: "",
    email: "",
    hospitalType: "",
    phone: "",
    category: "",
    licenseNumber: "",
    establishedYear: "",
    fullAddress: "",
    city: "",
    totalBeds: "",
    emergencyServices: false,
    ambulanceServices: false,
    icuServices: false,
    operationTheaters: "",
    cnic: "",
    password: "",
    confirmPassword: "",
    agreement: false,
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const { HospitalSignUp, loading, error } = useAuth();

  console.log(form, "form Values");
  // Handle text, number, textarea, and dropdown changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" || type === "radio" ? checked : value,
    }));
  };

  // Handle dropdowns (Dropdown component returns value directly)
  const handleDropdown = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // CNIC formatting handler
  const handleCnicChange = (e) => {
    const formattedCNIC = formatCNIC(e.target.value);
    setForm((prev) => ({ ...prev, cnic: formattedCNIC }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {};

  return (
    <div className='min-h-screen bg-blue-50 py-16 px-4'>
      <div className='flex items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full'>
          {showSuccess ? (
            <div className='text-center'>
              <div className='text-6xl mb-4'>🏥</div>
              <h1 className='text-3xl font-bold text-blue-800 mb-4'>
                Application Submitted Successfully!
              </h1>
              <p className='text-gray-600 mb-6'>
                Thank you for your interest in joining our platform. Your
                hospital application has been submitted and is currently under
                review by our admin team.
              </p>
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
                <h3 className='font-semibold text-blue-800 mb-2'>
                  What happens next?
                </h3>
                <ul className='text-sm text-blue-700 space-y-1'>
                  <li>• Our admin team will review your application</li>
                  <li>• We'll verify your hospital license and documents</li>
                  <li>• You'll receive an email notification once approved</li>
                  <li>
                    • After approval, you can complete your hospital profile
                    setup
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'>
                Submit Another Application
              </button>
            </div>
          ) : (
            <>
              <div className='flex flex-col items-center mb-4'>
                <span className='text-blue-600 text-4xl mb-2'>🏥</span>
                <h1 className='text-3xl font-bold text-blue-800 mb-2 text-center'>
                  Join as a Hospital
                </h1>
              </div>
              <form
                className='space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2'
                onSubmit={handleSubmit}>
                <InputField
                  label='Hospital Name'
                  name='hospitalName'
                  value={form.hospitalName}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label='Email'
                  name='email'
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete='email'
                />
                <div>
                  <label className='block text-emerald-700 font-medium mb-1'>
                    Hospital Type
                  </label>
                  <Dropdown
                    options={HOSPITAL_TYPES}
                    value={form.hospitalType}
                    onChange={(val) => handleDropdown("hospitalType", val)}
                    placeholder='Select Hospital Type'
                  />
                  {errors.hospitalType && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.hospitalType}
                    </p>
                  )}
                </div>
                <InputField
                  label='Phone'
                  name='phone'
                  type='tel'
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder='03XXXXXXXXX'
                  onlyNumbers
                />
                <div>
                  <label className='block text-emerald-700 font-medium mb-1'>
                    Category
                  </label>
                  <Dropdown
                    options={HOSPITAL_CATEGORIES}
                    value={form.category}
                    onChange={(val) => handleDropdown("category", val)}
                    placeholder='Select Category'
                  />
                  {errors.category && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.category}
                    </p>
                  )}
                </div>
                <InputField
                  label='License Number'
                  name='licenseNumber'
                  value={form.licenseNumber}
                  onChange={handleChange}
                  required
                  placeholder='Enter Hospital License Number'
                />
                <InputField
                  label='Established Year'
                  name='establishedYear'
                  type='number'
                  value={form.establishedYear}
                  onChange={handleChange}
                  required
                  min={1900}
                  max={new Date().getFullYear()}
                  placeholder='e.g., 1995'
                />
                <div>
                  <label className='block text-emerald-700 font-medium mb-1'>
                    Full Address
                  </label>
                  <textarea
                    name='fullAddress'
                    value={form.fullAddress}
                    onChange={handleChange}
                    required
                    className='w-full px-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    rows={1}
                  />
                  {errors.fullAddress && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.fullAddress}
                    </p>
                  )}
                </div>
                <InputField
                  label='City'
                  name='city'
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder='Enter City Name'
                />
                <InputField
                  label='Total Beds'
                  name='totalBeds'
                  type='number'
                  value={form.totalBeds}
                  onChange={handleChange}
                  required
                  min={1}
                  placeholder='Number of beds'
                />
                <InputField
                  label='Operation Theaters'
                  name='operationTheaters'
                  type='number'
                  value={form.operationTheaters}
                  onChange={handleChange}
                  required
                  min={0}
                  placeholder='Number of OTs'
                />

                <InputField
                  label='CNIC (Owner/Manager)'
                  name='cnic'
                  value={form.cnic}
                  onChange={handleCnicChange}
                  required
                  placeholder='xxxxx-xxxxxxx-x'
                  maxLength={15}
                  onlyNumbers
                  allowDashes
                />

                <InputField
                  label='Password'
                  name='password'
                  type='password'
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
                )}
                <InputField
                  label='Confirm Password'
                  name='confirmPassword'
                  type='password'
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.confirmPassword}
                  </p>
                )}

                {/* Services Checkboxes */}
                <div className='md:col-span-2'>
                  <InputField
                    type='checkbox'
                    label='Emergency Services Available'
                    name='emergencyServices'
                    checked={form.emergencyServices}
                    onChange={handleChange}
                  />
                </div>
                <div className='md:col-span-2'>
                  <InputField
                    type='checkbox'
                    label='Ambulance Services Available'
                    name='ambulanceServices'
                    checked={form.ambulanceServices}
                    onChange={handleChange}
                  />
                </div>
                <div className='md:col-span-2'>
                  <InputField
                    type='checkbox'
                    label='ICU Services Available'
                    name='icuServices'
                    checked={form.icuServices}
                    onChange={handleChange}
                  />
                </div>

                {/* Agreement radio/switch */}
                <div className='flex items-center space-x-2 mt-4 md:col-span-2'>
                  <input
                    type='radio'
                    id='agreement'
                    name='agreement'
                    checked={form.agreement}
                    onChange={handleChange}
                    className='h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300'
                    required
                  />
                  <label
                    htmlFor='agreement'
                    className='text-blue-800 font-semibold text-base'>
                    <span
                      role='img'
                      aria-label='lock'>
                      🔒
                    </span>{" "}
                    Please make sure all fields are filled correctly before
                    submitting.
                  </label>
                </div>
                {errors.agreement && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.agreement}
                  </p>
                )}
                {error && (
                  <p className='text-red-500 text-sm mt-2 text-center'>
                    {error}
                  </p>
                )}
                <button
                  type='submit'
                  className='w-full md:col-span-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition-colors duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={
                    !form.agreement || Object.keys(errors).length > 0 || loading
                  }>
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <div className='w-full text-center md:col-span-2 '>
                  <span className='text-sm font-semibold text-blue-700'>
                    Already have an account ?
                  </span>
                  <Link
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    to='/hospital/login'
                    className='ml-1 text-blue-600 hover:underline font-medium'>
                    Login
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinAsHospital;
