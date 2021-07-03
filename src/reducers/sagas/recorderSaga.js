import {takeEvery, fork, select, put, takeLatest} from 'redux-saga/effects';

import {addError, userSelector} from '../userReducer';
import {
  addRecord,
  CREATE_RECORD_REQUEST,
  deleteRecord,
  DELETE_RECORD_REQUEST,
} from '../recordReducer';
import {setNavigating} from '../locationReducer';
import database from '@react-native-firebase/database';

function* createTrackRequestz(action) {
  const {locations, name} = action.payload;

  if (locations.length < 1) {
    return console.log('short request');
  }
  try {
    console.log(
      'track name: ',
      name,
      ' record track requested',
      locations.length,
    );
    const user = yield select(userSelector);
    console.log('user', user);
    const record = {name: name, locations: locations, user: user.user.uid};
    console.log('record', record);

    yield database().ref('/records').push(record);

    yield put(setNavigating('index'));
  } catch (error) {
    yield put(addError('Something went wrong with sign-up, please try again'));
  }
}

function* deleteTrackRequestz(action) {
  const {id} = action.payload;

  try {
    console.log('passing a delete for the item id', id);
    yield put(deleteRecord(id));
    yield database()
      .ref('/records/' + id)
      .remove();
  } catch (error) {
    yield put(addError('Something went wrong with sign-up, please try again'));
  }
}

function* watchRecordRequest() {
  yield takeLatest(CREATE_RECORD_REQUEST, createTrackRequestz);
}

function* watchDeleteRecordRequest() {
  yield takeLatest(DELETE_RECORD_REQUEST, deleteTrackRequestz);
}

export const recorderSaga = [
  fork(watchRecordRequest),
  fork(watchDeleteRecordRequest),
];
