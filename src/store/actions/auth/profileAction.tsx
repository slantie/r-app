
import { useSelector } from "react-redux";
import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import * as types from "../../actionType";
import { PROFILE } from "../../../services/httpService";

export const profileAction = (payload:any) => {
    return async (dispatch: any) => {
      try {
        dispatch(profileRequest(payload));
        const response = await MakeApiRequest({
          apiUrl: PROFILE,
          apiMethod: POST,
          apiData: payload,
        });
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
