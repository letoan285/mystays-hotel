export const paymentErrorCode = {
  SuccessfulAcquisition: {
    code: '000',
    message: 'Successful acquisition of 000 tokens'
  },
  CardNumberRequired: {
    code: 100,
    message: 'Card number required check error'
  },
  CardNumberNonNumericFormatError: {
    code: 101,
    message: 'Card number format error (including non-numeric characters)'
  },
  CardNumberDigitRangeFormatError: {
    code: 102,
    message: 'Card number format error (out of 10-16 digit range)'
  },
  ExpirationDateMandatoryCheckerror: {
    code: 110,
    message: 'Expiration date mandatory check error'
  },
  ExpirationdateformaterrorIncludingNonNumericCharacters: {
    code: 111,
    message: ' Expiration date format error (including non-numeric characters)'
  },
  ExpirationDateformaterrorotherthanFourToSixdigits: {
    code: 112,
    message: 'Expiration date format error (other than 6 or 4 digits)'
  },
  ExpirationdateformaterrorThirteenOrMoreMonths: {
    code: 113,
    message: 'Expiration date format error (13 or more months)'
  },
  SecurityCodeFormatErrorinCludingNonNumericCharacters: {
    code: 121,
    message: 'Security code format error (including non-numeric characters)'
  },
  SecurityCodeFormatErrorFiveDigitsOrMore: {
    code: 122,
    message: 'Security code format error (5 digits or more)'
  },
  HolderFormatErrorIncludingAlphaNumericCharactersAndSomeSymbols: {
    code: 131,
    message: 'Holder format error (including alphanumeric characters and some symbols)'
  },
  HolderFormatErrorFiveOneDigit: {
    code: 132,
    message: 'Holder format error (51 digits or more)'
  },
  TokenParameterIdNotSent: {
    code: 501,
    message: 'Token parameter (id) is not sent'
  },
  TokenParameterIdDoesNotExistInMaster: {
    code: 502,
    message: 'Token parameter (id) does not exist in master'
  },
  TokenparametercardInfoisnotsentUnabletodecrypt512tokenparametercardInfo: {
    code: 511,
    message: 'Token parameter (cardInfo) is not sent Unable to decrypt 512 token parameter (cardInfo)'
  },
  TokenParameterKeyIsNotSent: {
    code: 521,
    message: 'Token parameter (key) is not sent'
  },
  UnableTodeCryptTokenParameterKey: {
    code: 522,
    message: 'Unable to decrypt token parameter (key)'
  },
  TokenParameterCallBackIsNotSent: {
    code: 531,
    message: 'Token parameter (callBack) is not sent'
  },
  TokenParameterHashDoesNotExist: {
    code: 541,
    message: 'Token parameter (hash) does not exist'
  },
  IDForWhichApiKeyForTokenDoesNotExist: {
    code: 551,
    message: 'ID for which apikey for token does not exist'
  },
  ApiKeyForTokenIsNotValid: {
    code: 552,
    message: 'apikey for token is not valid'
  },
  TokensHaveBeenUsed: {
    code: 553,
    message: 'tokens have been used.'
  },
  Systemerrorinsidemulti_payment: {
    code: 901,
    message: 'System error inside multi-payment'
  }
}

export const getMessageCodeError = (errorCode: string|number) => {
  switch (errorCode) {
    case paymentErrorCode.CardNumberRequired.code: {
      return paymentErrorCode.CardNumberRequired.message
    }
    case paymentErrorCode.CardNumberNonNumericFormatError.code: {
      return paymentErrorCode.CardNumberNonNumericFormatError.message
    }
    case paymentErrorCode.CardNumberDigitRangeFormatError.code: {
      return paymentErrorCode.CardNumberDigitRangeFormatError.message
    }
    case paymentErrorCode.ExpirationDateMandatoryCheckerror.code: {
      return paymentErrorCode.ExpirationDateMandatoryCheckerror.message
    }
    case paymentErrorCode.ExpirationdateformaterrorIncludingNonNumericCharacters.code: {
      return paymentErrorCode.ExpirationdateformaterrorIncludingNonNumericCharacters.message
    }
    case paymentErrorCode.ExpirationDateformaterrorotherthanFourToSixdigits.code: {
      return paymentErrorCode.ExpirationDateformaterrorotherthanFourToSixdigits.message
    }
    case paymentErrorCode.ExpirationdateformaterrorThirteenOrMoreMonths.code: {
      return paymentErrorCode.ExpirationdateformaterrorThirteenOrMoreMonths.message
    }
    case paymentErrorCode.SecurityCodeFormatErrorinCludingNonNumericCharacters.code: {
      return paymentErrorCode.SecurityCodeFormatErrorinCludingNonNumericCharacters.message
    }
    case paymentErrorCode.SecurityCodeFormatErrorFiveDigitsOrMore.code: {
      return paymentErrorCode.SecurityCodeFormatErrorFiveDigitsOrMore.message
    }
    case paymentErrorCode.HolderFormatErrorIncludingAlphaNumericCharactersAndSomeSymbols.code: {
      return paymentErrorCode.HolderFormatErrorIncludingAlphaNumericCharactersAndSomeSymbols.message
    }
    case paymentErrorCode.HolderFormatErrorFiveOneDigit.code: {
      return paymentErrorCode.HolderFormatErrorFiveOneDigit.message
    }
    case paymentErrorCode.TokenParameterIdNotSent.code: {
      return paymentErrorCode.TokenParameterIdNotSent.message
    }
    case paymentErrorCode.TokenParameterIdDoesNotExistInMaster.code: {
      return paymentErrorCode.TokenParameterIdDoesNotExistInMaster.message
    }
    case paymentErrorCode.TokenparametercardInfoisnotsentUnabletodecrypt512tokenparametercardInfo.code: {
      return paymentErrorCode.TokenparametercardInfoisnotsentUnabletodecrypt512tokenparametercardInfo.message
    }
    case paymentErrorCode.TokenParameterKeyIsNotSent.code: {
      return paymentErrorCode.TokenParameterKeyIsNotSent.message
    }
    case paymentErrorCode.UnableTodeCryptTokenParameterKey.code: {
      return paymentErrorCode.UnableTodeCryptTokenParameterKey.message
    }
    case paymentErrorCode.TokenParameterCallBackIsNotSent.code: {
      return paymentErrorCode.TokenParameterCallBackIsNotSent.message
    }
    case paymentErrorCode.TokenParameterHashDoesNotExist.code: {
      return paymentErrorCode.TokenParameterHashDoesNotExist.message
    }
    case paymentErrorCode.IDForWhichApiKeyForTokenDoesNotExist.code: {
      return paymentErrorCode.IDForWhichApiKeyForTokenDoesNotExist.message
    }
    case paymentErrorCode.ApiKeyForTokenIsNotValid.code: {
      return paymentErrorCode.ApiKeyForTokenIsNotValid.message
    }
    case paymentErrorCode.TokensHaveBeenUsed.code: {
      return paymentErrorCode.TokensHaveBeenUsed.message
    }
    case paymentErrorCode.Systemerrorinsidemulti_payment.code: {
      return paymentErrorCode.Systemerrorinsidemulti_payment.message
    }
    default: {
      return 'Unknown Error'
    }
  }
}
