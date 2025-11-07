import * as types from "../../actionType";

const initialState = {
  loading: false,
  getSeatingOfficesListData: null,
  error: null,
};

export const getSeatingOfficesListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_SEATING_OFFICES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_SEATING_OFFICES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        getSeatingOfficesListData: action.payload,
        error: null,
      };
    case types.GET_SEATING_OFFICES_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        getSeatingOfficesListData: null,
        error: action.payload,
      };
    case types.GET_SEATING_OFFICES_LIST_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
