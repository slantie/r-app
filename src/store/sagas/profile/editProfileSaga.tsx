import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { editProfileAction } from '../../actions/profile/editProfileAction';

function* editProfileSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(editProfileAction, action.payload.userId, action.payload.profileData, action.payload.originalUserData);
    yield put({ type: types.EDIT_PROFILE_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: types.EDIT_PROFILE_FAILURE, payload: error.message });
  }
}

export default function* editProfileWatcherSaga() {
  yield takeLatest(types.EDIT_PROFILE_REQUEST, editProfileSaga);
}
