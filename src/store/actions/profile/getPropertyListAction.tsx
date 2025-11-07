import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { PROPERTY_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const getPropertyListAction = (params?: { page?: number; search?: string }) => {
  return async (dispatch: any) => {
    try {
      dispatch(getPropertyListRequest());

      console.log('Get Property List Data:', params);

      const response = await MakeApiRequest({
        apiUrl: PROPERTY_LIST(params),
        apiMethod: GET,
      });

      dispatch(getPropertyListSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(getPropertyListFailure(error));
      throw error;
    }
  };
};

export const getPropertyListRequest = () => ({
  type: types.PROPERTY_LIST_REQUEST,
});

export const getPropertyListSuccess = (payload: any) => ({
  type: types.PROPERTY_LIST_SUCCESS,
  payload,
});

export const getPropertyListFailure = (payload: any) => ({
  type: types.PROPERTY_LIST_FAILURE,
  payload,
});

export const getPropertyListClear = () => ({
  type: types.PROPERTY_LIST_CLEAR,
});
