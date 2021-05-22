import React, {useEffect} from 'react';

import {Text, View, StatusBar} from 'react-native';

import SignUpScreen from './SignUpScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './SignInScreen';

const Auth = createStackNavigator();

const AuthContainer = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'purple'} />
      <Auth.Navigator screenOptions={{headerShown: false}}>
        <Auth.Screen name="Signin" component={SignInScreen} />
        <Auth.Screen name="Signup" component={SignUpScreen} />
      </Auth.Navigator>
    </>
  );
};

export default AuthContainer;
