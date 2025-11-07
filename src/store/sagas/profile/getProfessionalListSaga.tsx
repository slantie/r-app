import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { getProfessionalListAction } from '../../actions/profile/getProfessionalListAction';

function* getProfessionalListSaga(action: any): Generator<any, void, any> {
  try {
    const page = action.payload || action.page || 1;
    const response = yield call(getProfessionalListAction, page);
    yield put({ type: types.GET_PROFESSIONAL_LIST_SUCCESS, payload: response, page });
  } catch (error: any) {
    yield put({ type: types.GET_PROFESSIONAL_LIST_FAILURE, payload: error.message });
  }
}

export default function* getProfessionalListWatcherSaga() {
  yield takeLatest(types.GET_PROFESSIONAL_LIST_REQUEST, getProfessionalListSaga);
}

