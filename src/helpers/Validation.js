/** @format */
import { validateCNIC } from "./CNICFormat";

export const validate = (form) => {
  const newErrors = {};

  // Name validation
  if (!form.name?.trim()) {
    newErrors.name = "Name is required";
  } else if (form.name.trim().length < 2) {
    newErrors.name = "Name must be at least 2 characters long";
  } else if (form.name.trim().length > 100) {
    newErrors.name = "Name cannot exceed 100 characters";
  }

  // Speciality validation
  if (!form.speciality || form.speciality.length === 0) {
    newErrors.speciality = "At least one specialty is required";
  }

  // Email validation
  if (!form.email?.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "Please provide a valid email address";
  }

  // Phone validation
  if (!form.phone?.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (!/^[0-9+-\s()]+$/.test(form.phone)) {
    newErrors.phone = "Please provide a valid phone number";
  } else if (form.phone.length !== 11) {
    newErrors.phone = "Phone number must be exactly 11 digits";
  }

  // Religion validation
  if (!form.religion?.trim()) {
    newErrors.religion = "Religion is required";
  } else if (form.religion.trim().length < 2) {
    newErrors.religion = "Religion must be at least 2 characters long";
  } else if (form.religion.trim().length > 50) {
    newErrors.religion = "Religion cannot exceed 50 characters";
  }

  // Gender validation
  if (!form.gender) {
    newErrors.gender = "Gender is required";
  } else if (!["Male", "Female"].includes(form.gender)) {
    newErrors.gender = "Gender must be either Male or Female";
  }

  // Main degree validation
  if (!form.mainDegree?.trim()) {
    newErrors.mainDegree = "Main degree is required";
  } else if (form.mainDegree.trim().length < 2) {
    newErrors.mainDegree = "Main degree must be at least 2 characters long";
  } else if (form.mainDegree.trim().length > 100) {
    newErrors.mainDegree = "Main degree cannot exceed 100 characters";
  }

  // Full address validation
  if (!form.fullAddress?.trim()) {
    newErrors.fullAddress = "Full address is required";
  } else if (form.fullAddress.trim().length < 10) {
    newErrors.fullAddress = "Full address must be at least 10 characters long";
  } else if (form.fullAddress.trim().length > 500) {
    newErrors.fullAddress = "Full address cannot exceed 500 characters";
  }

  // Hospital validation
  if (!form.hospital?.trim()) {
    newErrors.hospital = "Hospital is required";
  } else if (form.hospital.trim().length < 2) {
    newErrors.hospital = "Hospital must be at least 2 characters long";
  } else if (form.hospital.trim().length > 200) {
    newErrors.hospital = "Hospital cannot exceed 200 characters";
  }

  // Experience validation
  if (
    form.experience === "" ||
    form.experience === null ||
    form.experience === undefined
  ) {
    newErrors.experience = "Experience is required";
  } else if (isNaN(form.experience)) {
    newErrors.experience = "Experience must be a number";
  } else if (!Number.isInteger(Number(form.experience))) {
    newErrors.experience = "Experience must be a whole number";
  } else if (Number(form.experience) < 0) {
    newErrors.experience = "Experience cannot be negative";
  } else if (Number(form.experience) > 50) {
    newErrors.experience = "Experience cannot exceed 50 years";
  }

  // Fee validation
  if (form.fee === "" || form.fee === null || form.fee === undefined) {
    newErrors.fee = "Fee is required";
  } else if (isNaN(form.fee)) {
    newErrors.fee = "Fee must be a number";
  } else if (Number(form.fee) < 0) {
    newErrors.fee = "Fee cannot be negative";
  } else if (Number(form.fee) > 100000) {
    newErrors.fee = "Fee cannot exceed 100,000";
  }

  // CNIC validation
  if (!form.cnic?.trim()) {
    newErrors.cnic = "CNIC is required";
  } else if (!validateCNIC(form.cnic)) {
    newErrors.cnic = "CNIC must be in format: 12345-1234567-1";
  }

  // PMDC Number validation (always required based on your schema)
  if (!form.pmdcNumber?.trim()) {
    newErrors.pmdcNumber = "PMDC number is required";
  } else if (!/^[A-Z0-9]+$/.test(form.pmdcNumber)) {
    newErrors.pmdcNumber =
      "PMDC number must contain only uppercase letters and numbers";
  } else if (form.pmdcNumber.trim().length < 5) {
    newErrors.pmdcNumber = "PMDC number must be at least 5 characters long";
  } else if (form.pmdcNumber.trim().length > 20) {
    newErrors.pmdcNumber = "PMDC number cannot exceed 20 characters";
  }

  // Password validation
  if (!form.password?.trim()) {
    newErrors.password = "Password is required";
  } else if (form.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters long";
  }

  // Confirm password validation (frontend only)
  if (!form.confirmPassword?.trim()) {
    newErrors.confirmPassword = "Confirm password is required";
  } else if (
    form.password &&
    form.confirmPassword &&
    form.password !== form.confirmPassword
  ) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  // Agreement validation (frontend only)
  if (!form.agreement) {
    newErrors.agreement = "You must confirm before submitting";
  }

  return { errors: newErrors, isValid: Object.keys(newErrors).length === 0 };
};
