import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { GET_BRANCHES_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const getBranchesListAction = (page: number = 1) => {
  return async (dispatch: any) => {
    try {
      dispatch(getBranchesListRequest(page));

      console.log('Getting Branches List, Page:', page);

      const response = await MakeApiRequest({
        apiUrl: GET_BRANCHES_LIST(page),
        apiMethod: GET,
      });

      dispatch(getBranchesListSuccess(response, page));
      return response;
    } catch (error: any) {
      dispatch(getBranchesListFailure(error));
      throw error;
    }
  };
};

export const getBranchesListRequest = (page: number) => ({
  type: types.GET_BRANCHES_LIST_REQUEST,
  page,
});

export const getBranchesListSuccess = (payload: any, page: number) => ({
  type: types.GET_BRANCHES_LIST_SUCCESS,
  payload,
  page,
});

export const getBranchesListFailure = (payload: any) => ({
  type: types.GET_BRANCHES_LIST_FAILURE,
  payload,
});

export const getBranchesListClear = () => ({
  type: types.GET_BRANCHES_LIST_CLEAR,
});
