import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { CREATE_PROPERTY } from "../../../services/httpService";
import * as types from "../../actionType";

export const createPropertyAction = (propertyData: {
  selectedProperty: string;
  flatNo: string;
  landmark: string;
  pincode: string;
  area: string;
  city: string;
  state: string;
  country: string;
  lat: string;
  long: string;
}) => {
  return async (dispatch: any) => {
    try {
      dispatch(createPropertyRequest());

      console.log('Create Property Data:', propertyData);

      const response = await MakeApiRequest({
        apiUrl: CREATE_PROPERTY,
        apiMethod: POST,
        apiData: propertyData,
      });

      dispatch(createPropertySuccess(response));
      return response;
    } catch (error: any) {
      dispatch(createPropertyFailure(error));
      throw error;
    }
  };
};

export const createPropertyRequest = () => ({
  type: types.CREATE_PROPERTY_REQUEST,
});

export const createPropertySuccess = (payload: any) => ({
  type: types.CREATE_PROPERTY_SUCCESS,
  payload,
});

export const createPropertyFailure = (payload: any) => ({
  type: types.CREATE_PROPERTY_FAILURE,
  payload,
});

export const createPropertyClear = () => ({
  type: types.CREATE_PROPERTY_CLEAR,
});
