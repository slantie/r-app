import * as types from "../../actionType";

const initialState = {
  loading: false,
  getUserProfileData: null,
  error: null,
};

export const getUserProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        getUserProfileData: action.payload,
        error: null,
      };
    case types.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        getUserProfileData: null,
        error: action.payload,
      };
    case types.GET_USER_PROFILE_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
