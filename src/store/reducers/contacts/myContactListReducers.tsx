import * as types from "../../actionType";

const initialState = {
    loading: false,
    myContactListData: undefined,
    error: {},
};

const myContactListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.MY_CONTACT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.MY_CONTACT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                myContactListData: action.payload
            };
        case types.MY_CONTACT_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.MY_CONTACT_LIST_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                myContactListData: undefined
            };
        default:
            return state;
    }
};

export default myContactListReducer;