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
import {userSelector} from '../userReducer';

import database from '@react-native-firebase/database';

import {
  usersReducer,
  FETCH_USERS,
  usersSelector,
  addUsers,
  setUsers,
} from '../usersReducer';

export function* updateUsers() {
  yield call(fetchUsersFromDb);
  yield call(checkUserInEmpList);
  yield call(fetchUsersFromDb);
}

export function* fetchUsersFromDb() {
  console.log('fetching users from database');
  try {
    let users = [];
    yield database()
      .ref('/users')
      .once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          let user = {username: childData, id: childKey};

          users.push(user);
        });
      });
    console.log('succesfully fetched ' + users.length + ' users');
    yield put(setUsers(users));
  } catch (error) {
    console.log(error);
  }
}

export function* checkUserInEmpList() {
  console.log('checking the user in user database');
  const curUser = yield select(userSelector);
  //console.log('curuser',curUser)
  const curUsers = yield select(usersSelector);

  if (curUser) {
    if (curUsers.some(item => item.username === curUser.user.email)) {
      console.log('user exists in employees list');
    } else {
      const newuser = {username: curUser.user.email, id: curUser.user.uid};
      console.log(newuser);
      try {
        const newRef = database().ref('/users/' + curUser.user.uid);
        newRef.set(curUser.user.email);
        console.log(newuser, 'has been added');
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export function* watchaddEmployeesRequest() {
  yield takeLatest(FETCH_USERS, updateUsers);
}

const usersSaga = [fork(watchaddEmployeesRequest)];

export default usersSaga;
