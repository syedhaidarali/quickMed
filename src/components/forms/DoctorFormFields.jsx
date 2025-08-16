/** @format */
import React from "react";
import {
  DEGREE_OPTIONS,
  GENDERS,
  REGISTERED_HOSPITALS,
} from "../../assets/dummy";
import {
  Dropdown,
  InputField,
  MultiSelectSpecialty,
  SearchableDropdown,
} from "../formItems";

const DoctorFormFields = ({
  values = {},
  errors = {},
  onInputChange,
  onDropdownChange,
  onSpecialtyChange,
  onHospitalChange,
  onHospitalVerification,
  onCnicChange,
  options = {},
  include = {},
}) => {
  const opt = {
    degreeOptions: options.degreeOptions || DEGREE_OPTIONS,
    genders: options.genders || GENDERS,
    hospitals: options.hospitals || REGISTERED_HOSPITALS,
  };

  const show = {
    password: include.password !== false,
    confirmPassword: include.confirmPassword !== false,
    agreement: include.agreement !== false,
    city: include.city !== false,
    hospital: include.hospital !== false,
  };

  return (
    <>
      {/* Full Name */}
      <InputField
        label='Full Name'
        name='name'
        value={values.name || ""}
        onChange={onInputChange?.("name")}
        error={errors.name?.message || errors.name}
        required
      />

      {/* Email */}
      <InputField
        label='Email'
        type='email'
        name='email'
        value={values.email || ""}
        onChange={onInputChange?.("email")}
        error={errors.email?.message || errors.email}
        required
        autoComplete='email'
      />

      {/* Specialities */}
      <div className='md:col-span-2'>
        <MultiSelectSpecialty
          selectedSpecialties={values.speciality || []}
          onSpecialtiesChange={(list) => onSpecialtyChange?.(list)}
          placeholder='Search and select your specialties...'
          maxSelections={5}
        />
        {errors.speciality && (
          <p className='text-red-500 text-xs mt-1'>
            {errors.speciality?.message || errors.speciality}
          </p>
        )}
      </div>

      {/* Phone */}
      <InputField
        label='Phone'
        type='tel'
        name='phone'
        value={values.phone || ""}
        onChange={onInputChange?.("phone")}
        error={errors.phone?.message || errors.phone}
        required
        placeholder='03XXXXXXXXX'
        onlyNumbers
      />

      {/* Gender */}
      <div>
        <label className='block text-emerald-700 font-medium mb-1'>
          Gender
        </label>
        <Dropdown
          options={opt.genders}
          value={values.gender || ""}
          onChange={(val) => onDropdownChange?.("gender", val)}
          placeholder='Select Gender'
        />
        {errors.gender && (
          <p className='text-red-500 text-xs mt-1'>
            {errors.gender?.message || errors.gender}
          </p>
        )}
      </div>

      {/* Main Degree */}
      <div>
        <label className='block text-emerald-700 font-medium mb-1'>
          Main Degree
        </label>
        <Dropdown
          options={opt.degreeOptions}
          value={values.mainDegree || ""}
          onChange={(val) => onDropdownChange?.("mainDegree", val)}
          placeholder='Select Main Degree'
        />
        {errors.mainDegree && (
          <p className='text-red-500 text-xs mt-1'>
            {errors.mainDegree?.message || errors.mainDegree}
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
          value={values.fullAddress || ""}
          onChange={onInputChange?.("fullAddress")}
          required
          rows={1}
          className={`w-full px-3 py-2 border ${
            errors.fullAddress ? "border-red-300" : "border-emerald-200"
          } rounded focus:outline-none focus:ring-2 focus:ring-emerald-500`}
        />
        {errors.fullAddress && (
          <p className='text-red-500 text-xs mt-1'>
            {errors.fullAddress?.message || errors.fullAddress}
          </p>
        )}
      </div>

      {/* Hospital */}
      {show.hospital && (
        <div>
          <label className='block text-emerald-700 font-medium mb-1'>
            Hospital
            {values.hospital && (
              <span className='ml-2 text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded'>
                ✓ Verified
              </span>
            )}
            {values.hospital && !values.hospital && (
              <span className='ml-2 text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded'>
                ⚠ New Hospital
              </span>
            )}
          </label>
          <SearchableDropdown
            options={opt.hospitals}
            value={values.hospital || ""}
            onChange={(val) => onHospitalChange?.(val)}
            onVerificationChange={(v) => onHospitalVerification?.(v)}
            registeredOptions={opt.hospitals}
            placeholder='Search hospitals or add new one...'
            allowAddNew
          />
          {errors.hospital && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.hospital?.message || errors.hospital}
            </p>
          )}
        </div>
      )}

      {/* City */}
      {show.city && (
        <InputField
          label='City'
          name='city'
          value={values.city || ""}
          onChange={onInputChange?.("city")}
          error={errors.city?.message || errors.city}
          placeholder='Enter City Name'
        />
      )}

      {/* Experience */}
      <InputField
        label='Experience (years)'
        type='number'
        name='experience'
        value={values.experience || ""}
        onChange={onInputChange?.("experience")}
        error={errors.experience?.message || errors.experience}
        required
        min={0}
      />

      {/* CNIC */}
      <InputField
        label='CNIC'
        name='cnic'
        value={values.cnic || ""}
        onChange={onCnicChange}
        error={errors.cnic?.message || errors.cnic}
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
        value={values.fee || ""}
        onChange={onInputChange?.("fee")}
        error={errors.fee?.message || errors.fee}
        required
        min={0}
        onlyNumbers
      />

      {/* PMDC Number */}
      <InputField
        label='PMDC Number'
        name='pmdcNumber'
        value={values.pmdcNumber || ""}
        onChange={onInputChange?.("pmdcNumber")}
        error={errors.pmdcNumber?.message || errors.pmdcNumber}
        required
        placeholder='Enter PMDC Number'
      />

      {/* Password */}
      {show.password && (
        <InputField
          label='Password'
          type='password'
          name='password'
          value={values.password || ""}
          onChange={onInputChange?.("password")}
          error={errors.password?.message || errors.password}
          required
        />
      )}

      {/* Confirm Password */}
      {show.confirmPassword && (
        <InputField
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          value={values.confirmPassword || ""}
          onChange={onInputChange?.("confirmPassword")}
          error={errors.confirmPassword?.message || errors.confirmPassword}
          required
        />
      )}

      {/* Agreement */}
      {show.agreement && (
        <>
          <div className='flex items-center space-x-2 mt-4 md:col-span-2'>
            <input
              type='checkbox'
              id='agreement'
              name='agreement'
              checked={values.agreement || false}
              onChange={onInputChange?.("agreement")}
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
              {errors.agreement?.message || errors.agreement}
            </p>
          )}
        </>
      )}
    </>
  );
};

export default DoctorFormFields;
