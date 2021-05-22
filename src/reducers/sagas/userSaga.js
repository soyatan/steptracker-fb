import {fork, put, call, takeLatest} from 'redux-saga/effects';
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
import createFBAuth from '@react-native-firebase/auth';

const auth = createFBAuth();

function* signUpRequest(action) {
  try {
    const {email, password} = action.payload;
    console.log(email, password);
    const signUp = async (email, password) => {
      console.log('sign-up function running');
      return await auth.createUserWithEmailAndPassword(email, password);
    };
    yield call(signUp, email, password);
    let user = auth.currentUser;
    
    yield put(setUserToken(user));
  } catch (error) {
    yield put(addError('Something went wrong with sign-up, please try again'));
  }
}

function* signInRequest(action) {
  try {
    const {email, password} = action.payload;
    const logIn = async (email, password) => {
      console.log('sign-in function running');
      return await auth.signInWithEmailAndPassword(email, password);
    };
    yield call(logIn, email, password);
    let user = auth.currentUser;
    yield put(setUserToken(user));
  } catch (error) {
    yield put(
      addError('Something went wrong with signing in, please try again'),
    );
  }
}

function* signOutRequest() {
  try {
    const logout=async ()=>{
      console.log('logout function running');
      return await auth.signOut();
  }
    yield call(logout);
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
