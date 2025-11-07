import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_DEPARTMENTS_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const getDepartmentsListAction = (page: number = 1) => {
  return async (dispatch: any) => {
    try {
      dispatch(getDepartmentsListRequest());

      console.log('Getting Departments List, Page:', page);

      const response = await MakeApiRequest({
        apiUrl: GET_DEPARTMENTS_LIST(page),
        apiMethod: GET,
      });

      dispatch(getDepartmentsListSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(getDepartmentsListFailure(error));
      throw error;
    }
  };
};

export const getDepartmentsListRequest = () => ({
  type: types.GET_DEPARTMENTS_LIST_REQUEST,
});

export const getDepartmentsListSuccess = (payload: any) => ({
  type: types.GET_DEPARTMENTS_LIST_SUCCESS,
  payload,
});

export const getDepartmentsListFailure = (payload: any) => ({
  type: types.GET_DEPARTMENTS_LIST_FAILURE,
  payload,
});

export const getDepartmentsListClear = () => ({
  type: types.GET_DEPARTMENTS_LIST_CLEAR,
});
