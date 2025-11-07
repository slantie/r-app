import * as types from "../../actionType";

const initialState = {
  loading: false,
  changePhoneNumberVerifyOtpData: null,
  error: null,
};

export const changePhoneNumberVerifyOtpReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.CHANGE_PHONE_NUMBER_VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CHANGE_PHONE_NUMBER_VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        changePhoneNumberVerifyOtpData: action.payload,
        error: null,
      };
    case types.CHANGE_PHONE_NUMBER_VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        changePhoneNumberVerifyOtpData: null,
        error: action.payload,
      };
    case types.CHANGE_PHONE_NUMBER_VERIFY_OTP_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Default export with meaningful name
export default changePhoneNumberVerifyOtpReducer;
