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
import database from '@react-native-firebase/database';

function* createFetchRecords() {
  try {
    console.log('action');

    const curUsers = yield select(userSelector);
    console.log('curusers', curUsers);
    let records = [];
    yield database()
      .ref('/records')
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          //console.log('childKey',childKey,'childdata',childData)
          let record = {
            uid: childData.user,
            id: childKey,
            locations: childData.locations,
            name: childData.name,
          };

          records.push(record);
        });
      });

    yield put(setRecords(records));

    //yield put(setNavigating('index'));
  } catch (error) {
    yield put(addError('Something went wrong with sign-up, please try again'));
  }
}

function* watchFetchRecordsRequest() {
  yield takeLatest(FETCH_RECORDS, createFetchRecords);
}

export const fetchRecordsSaga = [fork(watchFetchRecordsRequest)];
