
import * as types from "../../actionType";

const initialState = {
    loading: false,
    imageData: undefined,
    error: {},
};

const commonImageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.COMMON_IMAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.COMMON_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                imageData: action.payload
            };
        case types.COMMON_IMAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.COMMON_IMAGE_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                imageData: undefined
            };
        default:
            return state;
    }
};

export default commonImageReducer;
