import * as types from "../../actionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
  searchTerm: '',
  currentPage: 1,
};

export const getPropertyListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.PROPERTY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.PROPERTY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        searchTerm: action.meta?.search || '',
        currentPage: action.meta?.page || 1,
      };

    case types.PROPERTY_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };

    case types.PROPERTY_LIST_CLEAR:
      return {
        ...state,
        loading: false,
        data: null,
        error: null,
        searchTerm: '',
        currentPage: 1,
      };

    default:
      return state;
  }
};

