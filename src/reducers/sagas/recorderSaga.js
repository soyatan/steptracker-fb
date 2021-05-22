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
import {CREATE_RECORD_REQUEST} from '../recordReducer';
import {setNavigating} from '../locationReducer';

function* createTrackRequestz(action) {
  const {locations, name} = action.payload;
  if (locations.length < 1) {
    return console.log('short request');
  }
  try {
    const {token} = yield select(userSelector);
    console.log(
      'track name: ',
      name,
      ' record track requested',
      locations.length,
    );

    const body = yield JSON.stringify({name: name, locations: locations});

    const response = yield call(fetch, baseURL + '/tracks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: body,
    });

    yield put(setNavigating('index'));
  } catch (error) {
    yield put(addError('Something went wrong with sign-up, please try again'));
  }
}

function* watchRecordRequest() {
  yield takeLatest(CREATE_RECORD_REQUEST, createTrackRequestz);
}

export const recorderSaga = [fork(watchRecordRequest)];
