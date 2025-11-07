import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_DESIGNATIONS_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const getDesignationsListAction = (page: number = 1) => {
  return async (dispatch: any) => {
    try {
      dispatch(getDesignationsListRequest(page));

      console.log('Getting Designations List, Page:', page);

      const response = await MakeApiRequest({
        apiUrl: GET_DESIGNATIONS_LIST(page),
        apiMethod: GET,
      });

      dispatch(getDesignationsListSuccess(response, page));
      return response;
    } catch (error: any) {
      dispatch(getDesignationsListFailure(error));
      throw error;
    }
  };
};

export const getDesignationsListRequest = (page: number) => ({
  type: types.GET_DESIGNATIONS_LIST_REQUEST,
  page,
});

export const getDesignationsListSuccess = (payload: any, page: number) => ({
  type: types.GET_DESIGNATIONS_LIST_SUCCESS,
  payload,
  page,
});

export const getDesignationsListFailure = (payload: any) => ({
  type: types.GET_DESIGNATIONS_LIST_FAILURE,
  payload,
});

export const getDesignationsListClear = () => ({
  type: types.GET_DESIGNATIONS_LIST_CLEAR,
});
