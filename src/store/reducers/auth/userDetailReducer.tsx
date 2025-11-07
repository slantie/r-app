import * as types from "../../actionType";

const initialState = {
    loading: false,
    userDetailData: undefined,
    error: {},
};

const userDetailReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.USER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.USER_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetailData: action.payload
            };
        case types.USER_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.USER_DETAIL_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                userDetailData: undefined
            };
        default:
            return state;
    }
};

export default userDetailReducer;
