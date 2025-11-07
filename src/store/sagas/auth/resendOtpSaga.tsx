import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { resendOTPAction } from '../../actions/auth/resendOTPAction';


function* resendOtpSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(resendOTPAction, action.payload);
      yield put({ type: types.RESEND_OTP_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.RESEND_OTP_FAILURE, payload: error.message });
    }
  }

export default function* resedOtpWatcherSaga() {
  yield takeLatest(types.RESEND_OTP_REQUEST, resendOtpSaga);
}
