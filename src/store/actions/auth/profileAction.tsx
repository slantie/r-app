import { apiProfileRegistration } from "../../../services/apiServiceWrapper";
import * as types from "../../actionType";
import { UPDATE_PROFILE } from "../../../services/httpService"; // Changed from PROFILE to UPDATE_PROFILE

export const profileAction = (payload:any) => {
    return async (dispatch: any) => {
      try {
        dispatch(profileRequest(payload));
        // Use enhanced API wrapper with mock support
        const response = await apiProfileRegistration(UPDATE_PROFILE, payload);
        console.log("response.data",response.data);
        dispatch(profileSuccess(response.data));
        return response;
      } catch (error: any) {
        dispatch(profileFailure(error));
        throw error;
      }
    };
  };

export const profileRequest = (payload:any) => ({
    type: types.PROFILE_REQUEST,
    payload: payload,
});

export const profileSuccess = (data: any) => ({
    type: types.PROFILE_SUCCESS,
    payload: data,
});

export const profileFailure = (error: string) => ({
    type: types.PROFILE_FAILURE,
    payload: error,
});
