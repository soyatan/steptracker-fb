import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  addError,
  signInRequest,
  userSelector,
} from '../../reducers/userReducer';
import SplashScreen from 'react-native-splash-screen';

const SignInScreen = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const userStatus = useSelector(userSelector);

  const dispatch = useDispatch();
  const signin = () => {
    dispatch(signInRequest(email, password));
  };

  const navigateToSignUp = () => {
    dispatch(addError());
    navigation.navigate('Signup');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <LinearGradient
      colors={['purple', 'white']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.header}>
        <Image source={require('../Icons/mule.png')} />
        <Text style={styles.titletext}>SIGN IN</Text>
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

      <View style={styles.errormessagecontainer}>
        {userStatus.errorMessage ? (
          <Text style={{fontSize: 14, color: 'red'}}>
            {userStatus.errorMessage}
          </Text>
        ) : null}
      </View>
      <AuthButton label={'SIGN IN'} onPress={() => signin()}></AuthButton>

      <TouchableOpacity onPress={() => navigateToSignUp()}>
        <Text>Don't have an account? Sign Up </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SignInScreen;
