import {
  takeEvery,
  fork,
  select,
  put,
  take,
  apply,
  delay,
  call,
  race,
  all,
  effectTypes,
  takeLatest,
} from 'redux-saga/effects';
import {baseURL} from '../../API/baseURL';
import {
  addError,
  setUserToken,
  SIGNUP_REQUEST,
  SIGNIN_REQUEST,
  SIGNOUT_REQUEST,
  signOutCurrentUser,
  userReducer,
  userSelector,
} from '../userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CREATE_RECORD_REQUEST,
  FETCH_RECORDS,
  setRecords,
} from '../recordReducer';
import {setNavigating} from '../locationReducer';

function* createFetchRecords() {
  try {
    console.log('action');

    const {token} = yield select(userSelector);

    console.log('fetching records by user: ', token);

    const response = yield call(fetch, baseURL + '/tracks', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    let jres = yield response.json();
    yield put(setRecords(jres));

    //yield put(setNavigating('index'));
  } catch (error) {
    yield put(addError('Something went wrong with sign-up, please try again'));
  }
}

function* watchFetchRecordsRequest() {
  yield takeLatest(FETCH_RECORDS, createFetchRecords);
}

export const fetchRecordsSaga = [fork(watchFetchRecordsRequest)];
