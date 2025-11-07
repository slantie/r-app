import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { WHO_AM_I } from "../../../services/httpService";
import * as types from "../../actionType";

export const whoAmIAction = (payload: { identitySelection: string; workingProfessionals: string }) => {
    return async (dispatch: any) => {
      console.log("whoAmI payload", payload);
      try {
        dispatch(whoAmIRequest(payload));
        const response = await MakeApiRequest({
          apiUrl: WHO_AM_I,
          apiMethod: POST,
          apiData: payload,
        });
        dispatch(whoAmISuccess(response));
        return response
      } catch (error: any) {
        dispatch(whoAmIFailure(error));
        throw error;
      }
    };
  };

export const whoAmIRequest = (payload: any) => ({
    type: types.WHO_AM_I_REQUEST,
    payload,
});

export const whoAmISuccess = (payload: any) => ({
    type: types.WHO_AM_I_SUCCESS,
    payload,
});

export const whoAmIFailure = (payload: any) => ({
    type: types.WHO_AM_I_FAILURE,
    payload,
});

export const whoAmIClear = () => ({
    type: types.WHO_AM_I_CLEAR,
});
