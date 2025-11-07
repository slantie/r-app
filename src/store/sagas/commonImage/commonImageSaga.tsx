import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { commonImageAction } from '../../actions/commonImage/imageAction';

function* commonImageSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(commonImageAction, action.payload);
      yield put({ type: types.COMMON_IMAGE_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.COMMON_IMAGE_FAILURE, payload: error.message });
    }
  }

export default function* commonImageWatcherSaga() {
  yield takeLatest(types.COMMON_IMAGE_REQUEST, commonImageSaga);
}
