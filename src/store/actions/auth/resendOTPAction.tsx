import { apiResendOTP } from "../../../services/apiServiceWrapper";
import { RESEND_OTP } from "../../../services/httpService";
import * as types from "../../actionType";

export const resendOTPAction = (credentials: { countryCode: string; phoneNumber: string }) => {
    return async (dispatch: any) => {
      try {
        dispatch(resendOTPRequest(credentials));
        // Use enhanced API wrapper with mock support
        const response = await apiResendOTP(RESEND_OTP, credentials);
        dispatch(resendOTPSuccess(response.data));
        return response
      } catch (error: any) {
        dispatch(resendOTPFailure(error));
        throw error;
      }
    };
  };

export const resendOTPRequest = (credentials: { countryCode: string; phoneNumber: string }) => ({
    type: types.RESEND_OTP_REQUEST,
    payload: credentials,
});

export const resendOTPSuccess = (data: any) => ({
    type: types.RESEND_OTP_SUCCESS,
    payload: data,
});

export const resendOTPFailure = (error: string) => ({
    type: types.RESEND_OTP_FAILURE,
    payload: error,
});
