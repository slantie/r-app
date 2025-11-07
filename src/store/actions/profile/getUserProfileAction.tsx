import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_USER_PROFILE } from "../../../services/httpService";
import * as types from "../../actionType";

export const getUserProfileAction = () => {
  return async (dispatch: any) => {
    try {
      dispatch(getUserProfileRequest());

      console.log('Getting User Profile Data');

      const response = await MakeApiRequest({
        apiUrl: GET_USER_PROFILE,
        apiMethod: GET,
      });

      dispatch(getUserProfileSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(getUserProfileFailure(error));
      throw error;
    }
  };
};

export const getUserProfileRequest = () => ({
  type: types.GET_USER_PROFILE_REQUEST,
});

export const getUserProfileSuccess = (payload: any) => ({
  type: types.GET_USER_PROFILE_SUCCESS,
  payload,
});

export const getUserProfileFailure = (payload: any) => ({
  type: types.GET_USER_PROFILE_FAILURE,
  payload,
});

export const getUserProfileClear = () => ({
  type: types.GET_USER_PROFILE_CLEAR,
});
