import * as types from "../../actionType";

const initialState = {
  loading: false,
  changePhoneNumberData: null,
  error: null,
};

export const changePhoneNumberReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.CHANGE_PHONE_NUMBER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CHANGE_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        changePhoneNumberData: action.payload,
        error: null,
      };
    case types.CHANGE_PHONE_NUMBER_FAILURE:
      return {
        ...state,
        loading: false,
        changePhoneNumberData: null,
        error: action.payload,
      };
    case types.CHANGE_PHONE_NUMBER_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Default export with meaningful name
export default changePhoneNumberReducer;
