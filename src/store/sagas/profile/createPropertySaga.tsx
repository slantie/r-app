import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { createPropertyAction } from '../../actions/profile/createPropertyAction';

function* createPropertySaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(createPropertyAction, action.payload);
    yield put({ type: types.CREATE_PROPERTY_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: types.CREATE_PROPERTY_FAILURE, payload: error.message });
  }
}

export default function* createPropertyWatcherSaga() {
  yield takeLatest(types.CREATE_PROPERTY_REQUEST, createPropertySaga);
}
