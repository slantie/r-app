import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { createProfessionalAction } from '../../actions/profile/createProfessionalAction';


function* createProfessionalSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(createProfessionalAction, action.payload);
    yield put({ type: types.CREATE_PROFESSIONAL_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: types.CREATE_PROFESSIONAL_FAILURE, payload: error.message });
  }
}

export default function* createProfessionalWatcherSaga() {
  yield takeLatest(types.CREATE_PROFESSIONAL_REQUEST, createProfessionalSaga);
}

