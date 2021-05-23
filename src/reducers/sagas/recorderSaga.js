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
    const user = yield select (userSelector);
    
    const record={name: name, locations: locations, user:user.user.uid};
    
    yield database().ref('/records').push(record)

    
    

    yield put(setNavigating('index'));
  } catch (error) {
    yield put(addError('Something went wrong with sign-up, please try again'));
  }
}

function* watchRecordRequest() {
  yield takeLatest(CREATE_RECORD_REQUEST, createTrackRequestz);
}

export const recorderSaga = [fork(watchRecordRequest)];
