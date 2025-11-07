import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { TERRITORYLIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const territoryListAction = (params?: { page?: number; limit?: number }) => {
    return async (dispatch: any) => {
        try {
            dispatch(territoryListRequest());
            const response = await MakeApiRequest({
                apiUrl: TERRITORYLIST,
                apiMethod: GET,
                apiParams: params || { page: 1 },
            });
            dispatch(territoryListSuccess(response));
            return response;
        } catch (error: any) {
            dispatch(territoryListFailure(error));
            throw error;
        }
    };
};

export const territoryListRequest = () => ({
    type: types.TERRITORY_LIST_REQUEST,
});

export const territoryListSuccess = (payload: any) => ({
    type: types.TERRITORY_LIST_SUCCESS,
    payload,
});

export const territoryListFailure = (payload: any) => ({
    type: types.TERRITORY_LIST_FAILURE,
    payload,
});

export const territoryListClear = () => ({
    type: types.TERRITORY_LIST_CLEAR,
});
