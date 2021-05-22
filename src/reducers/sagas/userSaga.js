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
} from '../userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* signUpRequest(action) {
  try {
    const {email, password} = action.payload;
    //const body = {"email":"necati.s4s4oaayaaata@gmail.com", "password":"dreamoan44"}
    const body = yield JSON.stringify({email: email, password: password});

    const response = yield call(fetch, baseURL + '/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    });
    let jres = yield response.json();
    yield AsyncStorage.setItem('@userToken', jres.token);
    yield put(setUserToken(jres.token));
  } catch (error) {
    yield put(addError('Something went wrong with sign-up, please try again'));
  }
}

function* signInRequest(action) {
  try {
    const {email, password} = action.payload;
    //const body = {"email":"necati.s4s4oaayaaata@gmail.com", "password":"dreamoan44"}
    const body = yield JSON.stringify({email: email, password: password});

    const response = yield call(fetch, baseURL + '/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    });

    let jres = yield response.json();

    yield AsyncStorage.setItem('@userToken', jres.token);
    yield put(setUserToken(jres.token));
  } catch (error) {
    yield put(
      addError('Something went wrong with signing in, please try again'),
    );
  }
}

function* signOutRequest() {
  try {
    yield AsyncStorage.removeItem('@userToken');

    yield put(signOutCurrentUser());
  } catch (e) {
    console.error(e);
  }
}

function* watchSignUpRequest() {
  yield takeLatest(SIGNUP_REQUEST, signUpRequest);
}
function* watchSignInRequest() {
  yield takeLatest(SIGNIN_REQUEST, signInRequest);
}
function* watchSignOutRequest() {
  yield takeLatest(SIGNOUT_REQUEST, signOutRequest);
}

export const userSagas = [
  fork(watchSignUpRequest),
  fork(watchSignInRequest),
  fork(watchSignOutRequest),
];
