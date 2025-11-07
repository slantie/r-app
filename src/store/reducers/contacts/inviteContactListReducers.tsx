import * as types from "../../actionType";

const initialState = {
    loading: false,
    inviteContactListData: undefined,
    error: {},
};

const inviteContactListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.INVITE_CONTACT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.INVITE_CONTACT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                inviteContactListData: action.payload
            };
        case types.INVITE_CONTACT_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.INVITE_CONTACT_LIST_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                inviteContactListData: undefined
            };
        default:
            return state;
    }
};

export default inviteContactListReducer;