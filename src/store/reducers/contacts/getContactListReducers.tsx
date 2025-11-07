import * as types from "../../actionType";

const initialState = {
    loading: false,
    contactListData: undefined,
    error: {},
};

const getContactListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.GET_CONTACT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.GET_CONTACT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                contactListData: action.payload
            };
        case types.GET_CONTACT_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.GET_CONTACT_LIST_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                contactListData: undefined
            };
        default:
            return state;
    }
};

export default getContactListReducer;