import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TracksContainer from '../Tracks/TracksContainer';
import AuthContainer from '../Authcontainer/AuthContainer';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setUserToken, userSelector} from '../../reducers/userReducer';
import LoadingScreen from '../Authcontainer/LoadingScreen';
import SplashScreen from 'react-native-splash-screen';
import {loadingSelector, switchLoading} from '../../reducers/loadingReducer';

const Main = createStackNavigator();

const MainContainer = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector(userSelector);
  console.log(userStatus);
  const loadingStatus = useSelector(loadingSelector);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userToken');

      if (value !== null) {
        dispatch(setUserToken(value));
        dispatch(switchLoading(false));
      } else {
        dispatch(switchLoading(false));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(loadingStatus);

  return loadingStatus ? null : (
    <NavigationContainer>
      <Main.Navigator screenOptions={{headerShown: false}}>
        {!userStatus.token ? (
          <Main.Screen name="Auth" component={AuthContainer} />
        ) : (
          <Main.Screen name="Tracks" component={TracksContainer} />
        )}
      </Main.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
