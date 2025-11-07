import { PUT } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { EDIT_PROFILE } from "../../../services/httpService";
import * as types from "../../actionType";
import { getUserProfileAction } from "./getUserProfileAction";
import PrefManager from "../../../utils/prefManager";

export const editProfileAction = (userId: string, profileData: any, originalUserData: any = null) => {
  return async (dispatch: any) => {
    try {
      dispatch(editProfileRequest());

      // Only send fields that have actually changed compared to original user data
      const updatedData = Object.keys(profileData).reduce((acc: any, key: string) => {
        const newValue = profileData[key];
        const originalValue = originalUserData ? originalUserData[key] : null;

        // Only include field if it has a value and is different from original
        if (newValue !== '' && newValue !== null && newValue !== undefined && newValue !== originalValue) {
          acc[key] = newValue;
        }
        return acc;
      }, {});

      const response = await MakeApiRequest({
        apiUrl: EDIT_PROFILE(userId),
        apiMethod: PUT,
        apiData: updatedData,
      });

      dispatch(editProfileSuccess(response));

      // After successful edit, fetch updated user profile and update the store
      if (response && response.status === 200) {
        console.log("response", response);

        try {
          const userProfileResponse = await dispatch(getUserProfileAction());
          if (userProfileResponse && userProfileResponse.data) {
            const updatedUserData = userProfileResponse?.data?.result;
            dispatch({ type: types.UPDATE_USER_DATA, payload: updatedUserData });

            // Also update the AsyncStorage to persist the updated user data
            await PrefManager.setValue('userData', updatedUserData);
          }
        } catch (profileError) {
          console.error('Failed to fetch updated user profile:', profileError);
        }
      }

      return response;
    } catch (error: any) {
      dispatch(editProfileFailure(error));
      throw error;
    }
  };
};

export const editProfileRequest = () => ({
  type: types.EDIT_PROFILE_REQUEST,
});

export const editProfileSuccess = (payload: any) => ({
  type: types.EDIT_PROFILE_SUCCESS,
  payload,
});

export const editProfileFailure = (payload: any) => ({
  type: types.EDIT_PROFILE_FAILURE,
  payload,
});

export const editProfileClear = () => ({
  type: types.EDIT_PROFILE_CLEAR,
});
