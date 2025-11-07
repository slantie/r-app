import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { PROJECT_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const projectListAction = (params?: { page?: number; search?: string }) => {
    return async (dispatch: any) => {
        try {
            dispatch(projectListRequest());
            const response = await MakeApiRequest({
                apiUrl:PROJECT_LIST(params),
                apiMethod: GET,
            });
            dispatch(projectListSuccess(response, { page: params?.page || 1, search: params?.search }));
            return response;
        } catch (error: any) {
            dispatch(projectListFailure(error));
            throw error;
        }
    };
};

export const projectListRequest = () => ({
    type: types.PROJECT_LIST_REQUEST,
});

export const projectListSuccess = (payload: any, meta?: any) => ({
    type: types.PROJECT_LIST_SUCCESS,
    payload,
    meta,
});

export const projectListFailure = (payload: any) => ({
    type: types.PROJECT_LIST_FAILURE,
    payload,
});

export const projectListClear = () => ({
    type: types.PROJECT_LIST_CLEAR,
});

export const projectListReset = () => {
    return async (dispatch: any) => {
        dispatch(projectListClear());
        dispatch(projectListAction({ page: 1 }));
    };
};