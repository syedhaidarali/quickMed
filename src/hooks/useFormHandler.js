/** @format */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor, useHospital } from "../context";
import { formatCNIC } from "../helpers";
import { doctorFormSchema, defaultValues } from "../schemas/doctorFormSchema";

export const useFormHandler = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { DoctorSignUp, loading, error } = useDoctor();
  const { allPublicHospital } = useHospital();
  const navigate = useNavigate();
  // Initialize React Hook Form with Zod resolver
  const form = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues,
    mode: "onChange",
    criteriaMode: "all",
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

  const handleHospitalSelection = (hospitalName) => {
    // Get the hospital from allPublicHospital list
    const selectedHospital = allPublicHospital?.find(
      (h) => h.name === hospitalName
    );

    if (selectedHospital) {
      // Hospital is from verified list
      setValue("hospital", hospitalName, { shouldValidate: true });
      setValue("hospitalId", selectedHospital._id);
      setValue("hospitalVerified", true);
      console.log("Set verified hospital:", selectedHospital._id);
    } else {
      // General/new hospital
      setValue("hospital", hospitalName, { shouldValidate: true });
      setValue("hospitalId", null);
      setValue("hospitalVerified", false);
      console.log("Set new hospital: null");
    }
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
      hospitalId: backendData.hospitalId || null,
      hospitalVerified: backendData.hospitalVerified || false,
      cnic: backendData.cnic?.trim(),
      experience: Number(backendData.experience),
      fee: Number(backendData.fee),
    };
  };

  // Form submission handler
  const onSubmit = async (formData) => {
    try {
      const backendData = prepareSubmissionData(formData);
      console.log("Doctor Data", backendData);

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
    handleHospitalSelection,
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
