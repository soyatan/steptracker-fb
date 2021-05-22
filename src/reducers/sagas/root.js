import {all} from 'redux-saga/effects';
import {fetchRecordsSaga} from './fetchRecordsSaga';
import {recorderSaga} from './recorderSaga';

import {userSagas} from './userSaga';

export default function* root() {
  yield all([...userSagas, ...recorderSaga, ...fetchRecordsSaga]);
}
