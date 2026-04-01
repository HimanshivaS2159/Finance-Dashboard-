/**
 * Validation utilities for forms and data
 */

export const validators = {
  // Email validation
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  },

  // Required field validation
  required: (value) => {
    if (value === null || value === undefined) return 'This field is required';
    if (typeof value === 'string' && value.trim() === '') return 'This field is required';
    return null;
  },

  // Min length validation
  minLength: (min) => (value) => {
    if (!value || value.length < min) return `Minimum ${min} characters required`;
    return null;
  },

  // Max length validation
  maxLength: (max) => (value) => {
    if (value && value.length > max) return `Maximum ${max} characters allowed`;
    return null;
  },

  // Amount validation for transactions
  amount: (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return 'Please enter a valid amount';
    if (num <= 0) return 'Amount must be greater than 0';
    if (num > 10000000) return 'Amount cannot exceed 1 Crore';
    return null;
  },

  // Date validation
  date: (value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Please enter a valid date';
    if (date > new Date()) return 'Date cannot be in the future';
    return null;
  },

  // Category validation
  category: (value) => {
    const validCategories = [
      'Zomato', 'Swiggy', 'Amazon', 'Ola', 'Rent',
      'Salary', 'Cashback', 'Freelance', 'Netflix', 'Shopping', 'UPI Payments'
    ];
    if (!validCategories.includes(value)) return 'Please select a valid category';
    return null;
  },
};

// Combine multiple validators
export const composeValidators = (...validators) => (value) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

// Validate entire form
export const validateForm = (values, schema) => {
  const errors = {};
  let isValid = true;

  Object.keys(schema).forEach((field) => {
    const fieldValidators = schema[field];
    const value = values[field];
    
    for (const validator of fieldValidators) {
      const error = validator(value);
      if (error) {
        errors[field] = error;
        isValid = false;
        break;
      }
    }
  });

  return { isValid, errors };
};

// Sanitize input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
};
