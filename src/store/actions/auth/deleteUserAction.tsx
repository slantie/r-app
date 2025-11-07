import { DELETE } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { DELETE_USER } from "../../../services/httpService";
import * as types from "../../actionType";

export const deleteUserAction = () => {
    return async (dispatch: any) => {
      try {
        dispatch(deleteUserRequest());
        const response = await MakeApiRequest({
          apiUrl: DELETE_USER,
          apiMethod: DELETE,
        });
        dispatch(deleteUserSuccess(response));
        return response;
      } catch (error: any) {
        dispatch(deleteUserFailure(error));
        throw error;
      }
    };
  };

export const deleteUserRequest = () => ({
    type: types.DELETE_USER_REQUEST,
});

export const deleteUserSuccess = (payload: any) => ({
    type: types.DELETE_USER_SUCCESS,
    payload,
});

export const deleteUserFailure = (payload: any) => ({
    type: types.DELETE_USER_FAILURE,
    payload,
});

export const deleteUserClear = () => ({
    type: types.DELETE_USER_CLEAR,
});
