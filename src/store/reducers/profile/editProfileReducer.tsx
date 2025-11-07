import * as types from "../../actionType";

const initialState = {
  loading: false,
  editProfileData: null,
  error: null,
};

export const editProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.EDIT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        editProfileData: action.payload,
        error: null,
      };
    case types.EDIT_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        editProfileData: null,
        error: action.payload,
      };
    case types.EDIT_PROFILE_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
