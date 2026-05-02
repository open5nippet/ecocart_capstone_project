import { VALIDATION_PATTERNS, ERROR_MESSAGES } from '@/utils/constants'

export const validators = {
  /**
   * Validate email
   */
  validateEmail: (email) => {
    return VALIDATION_PATTERNS.EMAIL.test(email)
  },

  /**
   * Validate password
   */
  validatePassword: (password) => {
    return VALIDATION_PATTERNS.PASSWORD.test(password)
  },

  /**
   * Validate phone
   */
  validatePhone: (phone) => {
    return VALIDATION_PATTERNS.PHONE.test(phone)
  },

  /**
   * Validate login form
   */
  validateLoginForm: (email, password) => {
    const errors = {}
    if (!email) errors.email = ERROR_MESSAGES.REQUIRED_FIELD
    else if (!validators.validateEmail(email)) errors.email = ERROR_MESSAGES.INVALID_EMAIL
    if (!password) errors.password = ERROR_MESSAGES.REQUIRED_FIELD
    return errors
  },

  /**
   * Validate registration form
   */
  validateRegisterForm: (data) => {
    const errors = {}
    if (!data.name) errors.name = ERROR_MESSAGES.REQUIRED_FIELD
    if (!data.email) errors.email = ERROR_MESSAGES.REQUIRED_FIELD
    else if (!validators.validateEmail(data.email)) errors.email = ERROR_MESSAGES.INVALID_EMAIL
    if (!data.password) errors.password = ERROR_MESSAGES.REQUIRED_FIELD
    else if (!validators.validatePassword(data.password)) errors.password = ERROR_MESSAGES.INVALID_PASSWORD
    if (!data.confirmPassword) errors.confirmPassword = ERROR_MESSAGES.REQUIRED_FIELD
    else if (data.password !== data.confirmPassword)
      errors.confirmPassword = ERROR_MESSAGES.PASSWORD_MISMATCH
    return errors
  },
}
