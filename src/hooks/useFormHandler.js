/** @format */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorFormSchema, defaultValues } from "../schemas/doctorFormSchema";
import { formatCNIC } from "../helpers/CNICFormat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../context/DoctorContext";

export const useFormHandler = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { DoctorSignUp, loading, error } = useDoctor();
  const navigate = useNavigate();
  // Initialize React Hook Form with Zod resolver
  const form = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues,
    mode: "onChange", // Validate on change for better UX
    criteriaMode: "all", // Show all validation errors
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    reset,
    clearErrors,
    watch,
    control, // Add control for better form management
  } = form;

  // Watch form values for reactive updates
  const formValues = watch();

  // Specialized handlers for complex fields
  const handleCnicChange = (e) => {
    const formatted = formatCNIC(e.target.value);
    setValue("cnic", formatted, { shouldValidate: true });
  };

  const handleSpecialtyChange = (specialties) => {
    setValue("speciality", specialties, { shouldValidate: true });
  };

  const handleHospitalChange = (hospitalName) => {
    setValue("hospital", hospitalName, { shouldValidate: true });
  };

  const handleHospitalVerification = (isVerified) => {
    setValue("hospitalVerified", isVerified);
  };

  const handleDropdownChange = (fieldName, value) => {
    setValue(fieldName, value, { shouldValidate: true });
    clearErrors(fieldName);
  };

  // Generic input change handler for regular fields
  const handleInputChange = (fieldName) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValue(fieldName, value, { shouldValidate: true });
  };

  // Prepare data for backend (remove frontend-only fields)
  const prepareSubmissionData = (formData) => {
    const { confirmPassword, agreement, ...backendData } = formData;

    return {
      ...backendData,
      name: backendData.name?.trim(),
      email: backendData.email?.trim(),
      phone: backendData.phone?.trim(),
      religion: backendData.religion?.trim(),
      pmdcNumber: backendData.pmdcNumber?.trim(),
      mainDegree: backendData.mainDegree?.trim(),
      fullAddress: backendData.fullAddress?.trim(),
      city: backendData.city?.trim() || "",
      hospital: backendData.hospital?.trim(),
      cnic: backendData.cnic?.trim(),
      experience: Number(backendData.experience),
      fee: Number(backendData.fee),
    };
  };

  // Form submission handler
  const onSubmit = async (formData) => {
    try {
      const backendData = prepareSubmissionData(formData);
      const result = await DoctorSignUp(backendData, navigate);
      if (result?.success) {
        setShowSuccess(true);
        reset(); // Reset form on success
      }
    } catch (err) {}
  };

  // Reset form and success state
  const resetForm = () => {
    reset();
    setShowSuccess(false);
  };

  // Focus first error field on validation failure
  const handleInvalidSubmit = (errors) => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      const element = document.querySelector(`[name="${firstErrorKey}"]`);
      element?.focus();
    }
  };

  return {
    // Form instance and state
    register,
    handleSubmit: handleSubmit(onSubmit, handleInvalidSubmit),
    formState: { errors, isValid },
    formValues,
    control,

    // Specialized handlers
    handleCnicChange,
    handleSpecialtyChange,
    handleHospitalChange,
    handleHospitalVerification,
    handleDropdownChange,
    handleInputChange,

    // Utility functions
    resetForm,
    prepareSubmissionData,

    // State
    showSuccess,
    setShowSuccess,
    loading,
    error,
  };
};
