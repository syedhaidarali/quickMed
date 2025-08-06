/** @format */

/**
 * @param {string} value - Raw input value
 * @returns {string} - Formatted CNIC string
 */
export const formatCNIC = (value) => {
  // Remove all non-digit characters
  let digits = value.replace(/\D/g, "");

  // Limit to 13 digits
  digits = digits.slice(0, 13);

  // Format as xxxxx-xxxxxxx-x
  if (digits.length <= 5) {
    return digits;
  } else if (digits.length <= 12) {
    return digits.slice(0, 5) + "-" + digits.slice(5);
  } else {
    return (
      digits.slice(0, 5) + "-" + digits.slice(5, 12) + "-" + digits.slice(12)
    );
  }
};

/**
 * Validates CNIC format
 * @param {string} cnic - CNIC string to validate
 * @returns {boolean} - True if valid format
 */
export const validateCNIC = (cnic) => {
  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
  return cnicRegex.test(cnic);
};

/**
 * Extracts only digits from CNIC string
 * @param {string} cnic - CNIC string
 * @returns {string} - Only digits
 */
export const extractCNICDigits = (cnic) => {
  return cnic.replace(/\D/g, "");
};
