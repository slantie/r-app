import * as types from "../../actionType";

const initialState = {
  loading: false,
  createPropertyData: null,
  error: null,
};

export const createPropertyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.CREATE_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        createPropertyData: action.payload,
        error: null,
      };
    case types.CREATE_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        createPropertyData: null,
        error: action.payload,
      };
    case types.CREATE_PROPERTY_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
