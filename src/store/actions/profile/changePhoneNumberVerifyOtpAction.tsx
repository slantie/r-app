import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { CHANGE_PHONE_NUMBER_VERIFY_OTP } from "../../../services/httpService";
import * as types from "../../actionType";

export const changePhoneNumberVerifyOtpAction = (otpData: { countryCode: string; phoneNumber: string; otp: string }) => {
  return async (dispatch: any) => {
    try {
      dispatch(changePhoneNumberVerifyOtpRequest());

      console.log('Change Phone Number Verify OTP Data:', otpData);

      const response = await MakeApiRequest({
        apiUrl: CHANGE_PHONE_NUMBER_VERIFY_OTP,
        apiMethod: POST,
        apiData: otpData,
      });

      dispatch(changePhoneNumberVerifyOtpSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(changePhoneNumberVerifyOtpFailure(error));
      throw error;
    }
  };
};

export const changePhoneNumberVerifyOtpRequest = () => ({
  type: types.CHANGE_PHONE_NUMBER_VERIFY_OTP_REQUEST,
});

export const changePhoneNumberVerifyOtpSuccess = (payload: any) => ({
  type: types.CHANGE_PHONE_NUMBER_VERIFY_OTP_SUCCESS,
  payload,
});

export const changePhoneNumberVerifyOtpFailure = (payload: any) => ({
  type: types.CHANGE_PHONE_NUMBER_VERIFY_OTP_FAILURE,
  payload,
});

export const changePhoneNumberVerifyOtpClear = () => ({
  type: types.CHANGE_PHONE_NUMBER_VERIFY_OTP_CLEAR,
});
