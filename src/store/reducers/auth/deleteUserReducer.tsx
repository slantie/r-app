import * as types from "../../actionType";

const initialState = {
    loading: false,
    deleteUserData: undefined,
    error: {},
};

const deleteUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteUserData: action.payload
            };
        case types.DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.DELETE_USER_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                deleteUserData: undefined
            };
        default:
            return state;
    }
};

export default deleteUserReducer;
