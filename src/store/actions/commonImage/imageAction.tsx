
import axios from "axios";
import { IMAGE } from "../../../services/httpService";
import * as types from "../../actionType";

export const commonImageAction = (credentials:any) => {


    return async (dispatch: any,getState:any) => {
      const { otp } = getState();
      const otpVarifyData = otp.otpVarifyData;
      console.log("IMAGE URL +++++========> > . > > ", IMAGE  );

      try {
        dispatch(commonImsgeRequest(credentials));
        const response = await axios.post(IMAGE, credentials, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": otpVarifyData.result.accessToken
          },
        });
        console.log("response", response);

        if (response.status === 200) {
          console.log("upload success");

          dispatch(commonImsgeSuccess(response.data));
          return response;
        } else if (response.status === 400) {
          const errorMessage = response.data?.message || "Something went wrong";
          dispatch(commonImsgeFailure(errorMessage));
          throw new Error(errorMessage);
        } else if (response.status === 401) {
          const errorMessage = response.data?.message || "Unauthorized access";
          dispatch(commonImsgeFailure(errorMessage));
          throw new Error(errorMessage);
        } else {
          const errorMessage = response.data?.message || "Something went wrong";
          dispatch(commonImsgeFailure(errorMessage));
          throw new Error(errorMessage);
        }

      } catch (error: any) {
        console.log("/////////////////",error.response?.data);

        dispatch(commonImsgeFailure(error.response));
        throw error;
      }
    };
  };

export const commonImsgeRequest = (credentials:any) => ({
    type: types.COMMON_IMAGE_REQUEST,
    payload: credentials,
});

export const commonImsgeSuccess = (data: any) => ({
    type: types.COMMON_IMAGE_SUCCESS,
    payload: data,
});

export const commonImsgeFailure = (error: string) => ({
    type: types.COMMON_IMAGE_FAILURE,
    payload: error,
});
