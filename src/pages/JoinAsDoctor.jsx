/** @format */

import React, { useState } from "react";
import InputField from "../components/InputField";
import Dropdown from "../components/Dropdown";
import { specialities } from "../assets/dummy";
import { validate } from "../helpers/Validation";
import { formatCNIC } from "../helpers/CNICFormat";
import { Link } from "react-router-dom";

const RELIGIONS = ["Islam", "Christianity", "Hinduism", "Sikhism", "Other"];
const GENDERS = ["Male", "Female", "Other"];
const DEGREE_OPTIONS = ["MBBS", "BDS"];

const initialState = {
  fullName: "",
  email: "",
  speciality: "",
  phone: "",
  religion: "",
  gender: "",
  pmdcVerified: false,
  mainDegree: "",
  fullAddress: "",
  hospital: "",
  experience: "",
  cnic: "",
  password: "",
  confirmPassword: "",
  agreement: false,
};

const JoinAsDoctor = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validate(form);
    setErrors(validationResult.errors);

    if (!validationResult.isValid) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "availability") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }
  };

  return (
    <div className='min-h-[60vh] flex items-center justify-center bg-emerald-50 py-16 px-4'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full'>
        <div className='flex flex-col items-center mb-4'>
          <span className='text-emerald-600 text-4xl mb-2'>🩺</span>
          <h1 className='text-3xl font-bold text-emerald-800 mb-2 text-center'>
            Join as a Doctor
          </h1>
        </div>
        <form
          className='space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2'
          onSubmit={handleSubmit}>
          <InputField
            label='Full Name'
            name='fullName'
            value={form.fullName}
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
              Speciality
            </label>
            <Dropdown
              options={specialities}
              value={form.speciality}
              onChange={(val) => handleDropdown("speciality", val)}
              placeholder='Select Speciality'
              showUrdu={true}
              inputStyle='text-[11px]'
              placeholderStyle='text-[16px]'
              // urduTextStyle='text-[11px] font-bold'
              // englishTextStyle='text-[12px] font-bold'
            />
            {errors.speciality && (
              <p className='text-red-500 text-xs mt-1'>{errors.speciality}</p>
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
              Religion
            </label>
            <Dropdown
              options={RELIGIONS}
              value={form.religion}
              onChange={(val) => handleDropdown("religion", val)}
              placeholder='Select Religion'
            />
            {errors.religion && (
              <p className='text-red-500 text-xs mt-1'>{errors.religion}</p>
            )}
          </div>
          <div>
            <label className='block text-emerald-700 font-medium mb-1'>
              Gender
            </label>
            <Dropdown
              options={GENDERS}
              value={form.gender}
              onChange={(val) => handleDropdown("gender", val)}
              placeholder='Select Gender'
            />
            {errors.gender && (
              <p className='text-red-500 text-xs mt-1'>{errors.gender}</p>
            )}
          </div>

          <div>
            <label className='block text-emerald-700 font-medium mb-1'>
              Main Degree
            </label>
            <Dropdown
              options={DEGREE_OPTIONS}
              value={form.mainDegree}
              onChange={(val) => handleDropdown("mainDegree", val)}
              placeholder='Select Main Degree'
            />
            {errors.mainDegree && (
              <p className='text-red-500 text-xs mt-1'>{errors.mainDegree}</p>
            )}
          </div>
          <div>
            <label className='block text-emerald-700 font-medium mb-1'>
              Full Address
            </label>
            <textarea
              name='fullAddress'
              value={form.fullAddress}
              onChange={handleChange}
              required
              className='w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500'
              rows={1}
            />
            {errors.fullAddress && (
              <p className='text-red-500 text-xs mt-1'>{errors.fullAddress}</p>
            )}
          </div>
          <InputField
            label='Hospital'
            name='hospital'
            value={form.hospital}
            onChange={handleChange}
            required
          />
          <InputField
            label='Experience (years)'
            name='experience'
            type='number'
            value={form.experience}
            onChange={handleChange}
            required
            min={0}
          />

          <InputField
            label='CNIC'
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
          <div className='flex items-center space-x-2 md:col-span-2'>
            <input
              type='checkbox'
              name='pmdcVerified'
              checked={form.pmdcVerified}
              onChange={handleChange}
              id='pmdcVerified'
              className='h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500'
            />
            <label
              htmlFor='pmdcVerified'
              className='text-emerald-700 font-medium'>
              PMDC Verified
            </label>
          </div>
          {/* Agreement radio/switch */}
          <div className='flex items-center  space-x-2 mt-4'>
            <input
              type='radio'
              id='agreement'
              name='agreement'
              checked={form.agreement}
              onChange={handleChange}
              className='h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300'
              required
            />
            <label
              htmlFor='agreement'
              className='text-emerald-800 font-semibold text-base'>
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
            <p className='text-red-500 text-xs mt-1'>{errors.agreement}</p>
          )}
          <button
            type='submit'
            className='w-full md:col-span-2 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 font-medium transition-colors duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!form.agreement || Object.keys(errors).length > 0}>
            Submit
          </button>
          <div className='w-full text-center md:col-span-2 '>
            <span className='text-sm font-semibold text-emerald-700'>
              Already have an account ?
            </span>
            <Link
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              to='/doctor/login'
              className='ml-1 text-emerald-600 hover:underline font-medium'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinAsDoctor;
