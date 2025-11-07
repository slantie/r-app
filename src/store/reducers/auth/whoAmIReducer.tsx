import * as types from "../../actionType";

const initialState = {
    loading: false,
    whoAmIData: undefined,
    error: {},
};

const whoAmIReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.WHO_AM_I_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.WHO_AM_I_SUCCESS:
            return {
                ...state,
                loading: false,
                whoAmIData: action.payload
            };
        case types.WHO_AM_I_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.WHO_AM_I_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                whoAmIData: undefined
            };
        default:
            return state;
    }
};

export default whoAmIReducer;
