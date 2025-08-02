/** @format */

import { validateCNIC } from "./CNICFormat";

export const validate = (form) => {
  const newErrors = {};

  if (!form.fullName) newErrors.fullName = "Full name is required";
  if (!form.speciality) newErrors.speciality = "Speciality is required";
  if (!form.phone || !/^\d{10,15}$/.test(form.phone))
    newErrors.phone = "Valid phone is required";
  if (!form.religion) newErrors.religion = "Religion is required";
  if (!form.gender) newErrors.gender = "Gender is required";
  if (!form.mainDegree) newErrors.mainDegree = "Main degree is required";
  if (!form.fullAddress) newErrors.fullAddress = "Address is required";
  if (!form.hospital) newErrors.hospital = "Hospital is required";
  if (!form.experience || isNaN(form.experience))
    newErrors.experience = "Experience is required";
  if (!form.cnic || !validateCNIC(form.cnic))
    newErrors.cnic = "Valid CNIC is required (xxxxx-xxxxxxx-x)";
  if (!form.password) newErrors.password = "Password is required";
  if (!form.confirmPassword)
    newErrors.confirmPassword = "Confirm password is required";
  if (
    form.password &&
    form.confirmPassword &&
    form.password !== form.confirmPassword
  )
    newErrors.confirmPassword = "Passwords do not match";
  if (!form.agreement)
    newErrors.agreement = "You must confirm before submitting";

  return { errors: newErrors, isValid: Object.keys(newErrors).length === 0 };
};
