import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { contactUploadAction } from '../../actions/contacts/contactUploadAction';

function* contactUploadSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(contactUploadAction, action.payload);
      yield put({ type: types.CONTACT_UPLOAD_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.CONTACT_UPLOAD_FAILURE, payload: error.message });
    }
  }

export default function* contactUploadWatcherSaga() {
  yield takeLatest(types.CONTACT_UPLOAD_REQUEST, contactUploadSaga);
}
