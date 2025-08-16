/** @format */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  hospitalFormSchema,
  defaultValues,
} from "../schemas/hospitalFormSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHospital } from "../context";
import { formatCNIC } from "../helpers";

export const useHospitalFormHandler = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { HospitalSignUp, loading } = useHospital();

  // Initialize React Hook Form with Zod resolver
  const form = useForm({
    resolver: zodResolver(hospitalFormSchema),
    defaultValues,
    mode: "onChange", // Validate on change for immediate feedback
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
    control,
  } = form;

  // Watch form values for reactive updates
  const formValues = watch();

  // Specialized handlers for complex fields
  const handleCnicChange = (e) => {
    const formatted = formatCNIC(e.target.value);
    setValue("cnic", formatted, { shouldValidate: true });
  };

  const handleDropdownChange = (fieldName, value) => {
    setValue(fieldName, value, { shouldValidate: true });
    clearErrors(fieldName);
  };

  const handleServiceChange = (serviceName, checked) => {
    const currentServices = getValues("services") || {};
    setValue(
      "services",
      {
        ...currentServices,
        [serviceName]: checked,
      },
      { shouldValidate: true }
    );
  };

  const handleImageChange = (input) => {
    const file = input?.target?.files ? input.target.files[0] : input;
    if (file instanceof File) {
      setValue("image", file, { shouldValidate: true });
      clearErrors("image");
    }
  };

  const handleDocumentChange = (input) => {
    const file = input?.target?.files ? input.target.files[0] : input;
    if (file instanceof File) {
      setValue("document", file, { shouldValidate: true });
      clearErrors("image");
    }
  };

  const removeDocument = (index) => {
    const currentDocuments = getValues("documents") || [];
    const updatedDocuments = currentDocuments.filter((_, i) => i !== index);
    setValue("documents", updatedDocuments, { shouldValidate: true });
  };

  // Generic input change handler for regular fields
  const handleInputChange = (fieldName) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValue(fieldName, value, { shouldValidate: true });
  };

  // Form submission handler
  const onSubmit = async (formData) => {
    // Remove confirmPassword before sending to backend
    const { confirmPassword, documents, agreement, ...dataForBackend } =
      formData;
    await HospitalSignUp(dataForBackend, navigate);
  };
  // Reset form and success state
  const resetForm = () => {
    reset();
    setShowSuccess(false);
    setError(null);
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
    // Form methods
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    reset,
    clearErrors,
    watch,
    control,
    formValues,

    // Custom handlers
    handleCnicChange,
    handleDropdownChange,
    handleServiceChange,
    handleImageChange,
    handleDocumentChange,
    removeDocument,
    handleInputChange,

    // Form submission
    onSubmit,
    handleInvalidSubmit,

    // State
    showSuccess,
    setShowSuccess,
    loading,
    error,
    setError,

    // Utilities
    resetForm,
  };
};
