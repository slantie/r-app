import * as types from "../../actionType";

const initialState = {
    loading: false,
    territoryListData: undefined,
    error: {},
};

const territoryListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.TERRITORY_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.TERRITORY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                territoryListData: action.payload
            };
        case types.TERRITORY_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.TERRITORY_LIST_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                territoryListData: undefined
            };
        default:
            return state;
    }
};

export default territoryListReducer;
