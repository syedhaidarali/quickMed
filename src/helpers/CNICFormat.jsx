/** @format */

/**
 * Formats CNIC input as xxxxx-xxxxxxx-x
 * @param {string} value - Raw input value
 * @returns {string} - Formatted CNIC string
 */
export const formatCNIC = (value) => {
  // Remove all non-digit characters
  let digits = value.replace(/\D/g, "");

  // Limit to 13 digits
  digits = digits.slice(0, 13);

  // Format as xxxxx-xxxxxxx-x
  let formatted = digits;

  if (digits.length > 5) {
    formatted = digits.slice(0, 5) + "-" + digits.slice(5);
  }

  if (digits.length > 12) {
    formatted = formatted.slice(0, 13) + "-" + formatted.slice(13);
  }

  return formatted;
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

/*
Test cases for formatCNIC:
- formatCNIC("15601") → "15601"
- formatCNIC("15601102") → "15601-102"
- formatCNIC("156011028208") → "15601-1028208"
- formatCNIC("1560110282085") → "15601-1028208-5"
- formatCNIC("1560110282085abc") → "15601-1028208-5"

Test cases for validateCNIC:
- validateCNIC("15601-1028208-5") → true
- validateCNIC("15601-1028208") → false
- validateCNIC("1560110282085") → false
- validateCNIC("") → false
*/
