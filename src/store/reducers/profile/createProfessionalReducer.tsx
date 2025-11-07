import * as types from "../../actionType";

const initialState = {
  loading: false,
  createProfessionalData: null,
  error: null,
};

export const createProfessionalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.CREATE_PROFESSIONAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_PROFESSIONAL_SUCCESS:
      return {
        ...state,
        loading: false,
        createProfessionalData: action.payload,
        error: null,
      };
    case types.CREATE_PROFESSIONAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.CREATE_PROFESSIONAL_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

