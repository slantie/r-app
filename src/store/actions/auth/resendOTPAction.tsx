import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { RESEND_OTP } from "../../../services/httpService";
import * as types from "../../actionType";

export const resendOTPAction = (credentials: { countryCode: string; phoneNumber: string }) => {
    return async (dispatch: any) => {
      try {
        dispatch(resendOTPRequest(credentials));
        const response = await MakeApiRequest({
          apiUrl: RESEND_OTP,
          apiMethod: POST,
          apiData: credentials,
        });
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
