export interface OtpResponse {
  contactNumber: string;
  message: string;
}

export interface VerifyOtpRequest {
  contactNumber: string;
  otp: string;
}

export interface VerifyOtpResponse {
  token: string;
}
