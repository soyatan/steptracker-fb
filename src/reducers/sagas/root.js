import {all} from 'redux-saga/effects';
import {fetchRecordsSaga} from './fetchRecordsSaga';
import {recorderSaga} from './recorderSaga';

import {userSagas} from './userSaga';
import usersSaga from './usersSaga';

export default function* root() {
  yield all([...userSagas, ...recorderSaga, ...fetchRecordsSaga, ...usersSaga]);
}
