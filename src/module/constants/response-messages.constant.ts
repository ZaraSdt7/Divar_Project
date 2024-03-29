export enum ResponseMessages {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_FOUND_USER = 'NOT_FOUND_USER',
  FAILED_SEND_OTP_EMAIL = 'FAILED_SEND_OTP_EMAIL',
  CODE_SENT_FOR_YOUR_MOBILE = 'CODE_SENT_FOR_YOUR_MOBILE',
  FAILED_SEND_OTP_SMS = 'FAILED_SEND_OTP_SMS',
  CODE_SENT_IS_NOT_CORRECT = 'CODE_SENT_IS_NOT_CORRECT',
  YOUR_CODE_EXPIRED = 'YOUR_CODE_EXPIRED',
  FIELD_MUST_BE_EMAIL_OR_MOBILE = 'FIELD_MUST_BE_EMAIL_OR_MOBILE',
}
