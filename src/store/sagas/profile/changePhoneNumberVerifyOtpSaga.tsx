import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { changePhoneNumberVerifyOtpAction } from '../../actions/profile/changePhoneNumberVerifyOtpAction';

function* changePhoneNumberVerifyOtpSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(changePhoneNumberVerifyOtpAction, action.payload);
    yield put({ type: types.CHANGE_PHONE_NUMBER_VERIFY_OTP_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: types.CHANGE_PHONE_NUMBER_VERIFY_OTP_FAILURE, payload: error.message });
  }
}

export default function* changePhoneNumberVerifyOtpWatcherSaga() {
  yield takeLatest(types.CHANGE_PHONE_NUMBER_VERIFY_OTP_REQUEST, changePhoneNumberVerifyOtpSaga);
}
