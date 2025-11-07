import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { changePhoneNumberAction } from '../../actions/profile/changePhoneNumberAction';

function* changePhoneNumberSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(changePhoneNumberAction, action.payload);
    yield put({ type: types.CHANGE_PHONE_NUMBER_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: types.CHANGE_PHONE_NUMBER_FAILURE, payload: error.message });
  }
}

export default function* changePhoneNumberWatcherSaga() {
  yield takeLatest(types.CHANGE_PHONE_NUMBER_REQUEST, changePhoneNumberSaga);
}
