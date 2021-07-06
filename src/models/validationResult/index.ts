/*
 * Copyright (c) May - 05 - 2020.
 * Modified by Toan Le<toanlv@smartosc.com>
 */

export default class ValidationResult {
  isValid: boolean
  reason?: string
  errorCode?: string | number

  constructor (isValid: boolean, reason?: string, errorCode?: string | number) {
    this.isValid = isValid
    this.reason = reason
    this.errorCode = errorCode || 400
  }
}
