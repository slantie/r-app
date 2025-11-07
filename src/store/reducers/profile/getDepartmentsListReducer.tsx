import * as types from "../../actionType";

const initialState = {
  loading: false,
  getDepartmentsListData: null,
  error: null,
};

export const getDepartmentsListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_DEPARTMENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_DEPARTMENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        getDepartmentsListData: action.payload,
        error: null,
      };
    case types.GET_DEPARTMENTS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        getDepartmentsListData: null,
        error: action.payload,
      };
    case types.GET_DEPARTMENTS_LIST_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
