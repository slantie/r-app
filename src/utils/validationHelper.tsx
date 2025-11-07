import { Alert } from 'react-native';

export interface ValidationRule {
  field: string;
  value: any;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customMessage?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  fieldErrors: { [key: string]: string };
}

/**
 * Validates form fields based on provided rules
 * @param rules Array of validation rules
 * @returns ValidationResult with validation status and errors
 */
export const validateFields = (rules: ValidationRule[]): ValidationResult => {
  const errors: string[] = [];
  const fieldErrors: { [key: string]: string } = {};

  rules.forEach(rule => {
    const {
      field,
      value,
      required,
      minLength,
      maxLength,
      pattern,
      customMessage,
    } = rule;

    // Check if field is required and empty
    if (
      required &&
      (!value || (typeof value === 'string' && value.trim() === ''))
    ) {
      const errorMsg = customMessage || `${field} is required`;
      errors.push(errorMsg);
      fieldErrors[field] = errorMsg;
      return;
    }

    // Skip further validation if field is empty and not required
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return;
    }

    const stringValue = String(value).trim();

    // Check minimum length
    if (minLength && stringValue.length < minLength) {
      const errorMsg =
        customMessage || `${field} must be at least ${minLength} characters`;
      errors.push(errorMsg);
      fieldErrors[field] = errorMsg;
    }

    // Check maximum length
    if (maxLength && stringValue.length > maxLength) {
      const errorMsg =
        customMessage || `${field} must not exceed ${maxLength} characters`;
      errors.push(errorMsg);
      fieldErrors[field] = errorMsg;
    }

    // Check pattern match
    if (pattern && !pattern.test(stringValue)) {
      const errorMsg = customMessage || `${field} format is invalid`;
      errors.push(errorMsg);
      fieldErrors[field] = errorMsg;
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    fieldErrors,
  };
};

/**
 * Validates a single field
 * @param field Field name
 * @param value Field value
 * @param rules Validation rules for the field
 * @returns ValidationResult for the single field
 */
export const validateField = (
  field: string,
  value: any,
  rules: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    customMessage?: string;
  },
): ValidationResult => {
  return validateFields([{ field, value, ...rules }]);
};

/**
 * Shows validation errors as an alert with red text styling
 * @param errors Array of error messages
 * @param title Alert title (default: "Validation Error")
 */
export const showValidationAlert = (
  errors: string[],
  title: string = 'Validation Error',
) => {
  if (errors.length === 0) return;

  const errorMessage = errors.join('\n');
  Alert.alert(title, errorMessage);
};

/**
 * Common validation patterns
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s-]{10,}$/,
  PINCODE: /^\d{6}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  ALPHA_ONLY: /^[a-zA-Z\s]+$/,
  NUMERIC_ONLY: /^\d+$/,
  INDIAN_PHONE: /^[6-9]\d{9}$/,
};

/**
 * Common validation rules for typical form fields
 */
export const COMMON_VALIDATION_RULES = {
  REQUIRED_FIELD: (field: string, value: any) => ({
    field,
    value,
    required: true,
    customMessage: `${field} is required`,
  }),

  EMAIL_FIELD: (field: string, value: any) => ({
    field,
    value,
    required: true,
    pattern: VALIDATION_PATTERNS.EMAIL,
    customMessage: 'Please enter a valid email address',
  }),

  PHONE_FIELD: (field: string, value: any, minLength: number = 10) => ({
    field,
    value,
    required: true,
    minLength,
    pattern: VALIDATION_PATTERNS.PHONE,
    customMessage: 'Please enter a valid phone number',
  }),

  NAME_FIELD: (field: string, value: any, minLength: number = 2) => ({
    field,
    value,
    required: true,
    minLength,
    pattern: VALIDATION_PATTERNS.ALPHA_ONLY,
    customMessage: `${field} must contain only letters and be at least ${minLength} characters`,
  }),

  PINCODE_FIELD: (field: string, value: any) => ({
    field,
    value,
    required: true,
    pattern: VALIDATION_PATTERNS.PINCODE,
    customMessage: 'Please enter a valid 6-digit pincode',
  }),

  INDIAN_PHONE_FIELD: (field: string, value: any) => ({
    field,
    value,
    required: true,
    pattern: VALIDATION_PATTERNS.INDIAN_PHONE,
    customMessage: 'Indian mobile number must start with 6, 7, 8, or 9',
  }),
};

/**
 * Validates Indian phone number format
 * @param phoneNumber The phone number to validate
 * @param countryCode The country code (should be +91 for India)
 * @returns ValidationResult with validation status and errors
 */
export const validateIndianPhoneNumber = (
  phoneNumber: string,
  countryCode: string,
): ValidationResult => {
  const errors: string[] = [];
  const fieldErrors: { [key: string]: string } = {};

  // Check if country code is +91
  if (countryCode !== '+91') {
    return {
      isValid: true,
      errors: [],
      fieldErrors: {},
    };
  }

  // Check if phone number is empty
  if (!phoneNumber || phoneNumber.trim() === '') {
    const errorMsg = 'Please enter your mobile number';
    errors.push(errorMsg);
    fieldErrors['phoneNumber'] = errorMsg;
    return {
      isValid: false,
      errors,
      fieldErrors,
    };
  }

  // Check if phone number length is exactly 10
  if (phoneNumber.length !== 10) {
    const errorMsg = 'Please enter a valid 10-digit mobile number';
    errors.push(errorMsg);
    fieldErrors['phoneNumber'] = errorMsg;
    return {
      isValid: false,
      errors,
      fieldErrors,
    };
  }

  // Check if phone number starts with 6, 7, 8, or 9
  if (!VALIDATION_PATTERNS.INDIAN_PHONE.test(phoneNumber)) {
    const errorMsg = 'Indian mobile number must start with 6 to 9';
    errors.push(errorMsg);
    fieldErrors['phoneNumber'] = errorMsg;
    return {
      isValid: false,
      errors,
      fieldErrors,
    };
  }

  return {
    isValid: true,
    errors: [],
    fieldErrors: {},
  };
};

/**
 * Hook for form validation with button state management
 */
export const useFormValidation = (validationRules: ValidationRule[]) => {
  const validate = (): ValidationResult => {
    return validateFields(validationRules);
  };

  const isFormValid = (): boolean => {
    return validate().isValid;
  };

  const getFieldError = (fieldName: string): string => {
    const result = validate();
    return result.fieldErrors[fieldName] || '';
  };

  const hasFieldError = (fieldName: string): boolean => {
    return getFieldError(fieldName) !== '';
  };

  return {
    validate,
    isFormValid,
    getFieldError,
    hasFieldError,
  };
};
