import React, {useEffect} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {signOutRequest} from '../../reducers/userReducer';
import styles from './styles';

const AccountScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutRequest());
  };

  return (
    <LinearGradient
      colors={['#343d46', '#65737e']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Create Track hoşgeldiniz</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default AccountScreen;
