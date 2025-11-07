import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_AREA_BY_PINCODE_REQUEST } from '../../actionType';
import { getAreaByPincodeSuccess, getAreaByPincodeFailure } from '../../actions/auth/areaByPincodeAction';
import { MakeApiRequest } from '../../../services/apiService';
import { GET } from '../../../constants/api';
import { GOOGLE_PLACES_API } from '../../../services/httpService';

function* getAreaByPincodeSaga(action: any): Generator<any, void, any> {
    try {
        const { pincode } = action.payload;

        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=${GOOGLE_PLACES_API}`;

        const response = yield call(MakeApiRequest, {
            apiUrl: apiUrl,
            apiMethod: GET,
        });

        if (response.status === 200) {
            yield put(getAreaByPincodeSuccess(response.data));
        } else {
            yield put(getAreaByPincodeFailure('Failed to fetch area data'));
        }
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || error?.message || 'Something went wrong';
        yield put(getAreaByPincodeFailure(errorMessage));
    }
}

export function* watchGetAreaByPincode() {
    yield takeLatest(GET_AREA_BY_PINCODE_REQUEST, getAreaByPincodeSaga);
}