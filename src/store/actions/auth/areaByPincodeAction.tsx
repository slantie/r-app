import * as types from "../../actionType";

export const getAreaByPincodeAction = (pincode: string) => ({
    type: types.GET_AREA_BY_PINCODE_REQUEST,
    payload: { pincode }
});

export const getAreaByPincodeSuccess = (data: any) => ({
    type: types.GET_AREA_BY_PINCODE_SUCCESS,
    payload: data
});

export const getAreaByPincodeFailure = (error: any) => ({
    type: types.GET_AREA_BY_PINCODE_FAILURE,
    payload: error
});

export const clearAreaData = () => ({
    type: types.CLEAR_AREA_DATA
});