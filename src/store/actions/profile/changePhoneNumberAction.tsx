import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { CHANGE_PHONE_NUMBER } from "../../../services/httpService";
import * as types from "../../actionType";

export const changePhoneNumberAction = (phoneData: { countryCode: string; phoneNumber: string }) => {
  return async (dispatch: any) => {
    try {
      dispatch(changePhoneNumberRequest());

      console.log('Change Phone Number Data:', phoneData);

      const response = await MakeApiRequest({
        apiUrl: CHANGE_PHONE_NUMBER,
        apiMethod: POST,
        apiData: phoneData,
      });

      dispatch(changePhoneNumberSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(changePhoneNumberFailure(error));
      throw error;
    }
  };
};

export const changePhoneNumberRequest = () => ({
  type: types.CHANGE_PHONE_NUMBER_REQUEST,
});

export const changePhoneNumberSuccess = (payload: any) => ({
  type: types.CHANGE_PHONE_NUMBER_SUCCESS,
  payload,
});

export const changePhoneNumberFailure = (payload: any) => ({
  type: types.CHANGE_PHONE_NUMBER_FAILURE,
  payload,
});

export const changePhoneNumberClear = () => ({
  type: types.CHANGE_PHONE_NUMBER_CLEAR,
});
