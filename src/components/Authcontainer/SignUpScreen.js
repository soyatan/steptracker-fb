import React, {useEffect, useReducer, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import styles from './styles';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

import {
  addError,
  signUpRequest,
  userReducer,
  userSelector,
} from '../../reducers/userReducer';
import {useDispatch, useSelector} from 'react-redux';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userStatus = useSelector(userSelector);

  const dispatch = useDispatch();

  const signup = () => {
    dispatch(signUpRequest(email, password));
  };

  const navigateToSignIn = () => {
    dispatch(addError());
    navigation.navigate('Signin');
  };

  return (
    <LinearGradient
      colors={['purple', 'white']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.header}>
        <Image source={require('../Icons/mule.png')} />
        <Text style={styles.titletext}>SIGN UP</Text>
      </View>

      <AuthInput
        label={'Email'}
        keyboardType={'email-address'}
        iconname={'user'}
        state={email}
        onChangeText={setEmail}
      />

      <AuthInput
        label={'Password'}
        iconname={'password'}
        state={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AuthInput
        label={'Password'}
        keyboardType={'email-address'}
        iconname={'password'}
      />
      <View style={styles.errormessagecontainer}>
        {userStatus.errorMessage ? (
          <Text style={{fontSize: 14, color: 'red'}}>
            {userStatus.errorMessage}
          </Text>
        ) : null}
      </View>

      <AuthButton label={'SIGN UP'} onPress={() => signup()}></AuthButton>

      <TouchableOpacity onPress={() => navigateToSignIn()}>
        <Text>Already have an account? Sign In </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SignUpScreen;
