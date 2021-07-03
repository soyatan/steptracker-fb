import React, {useEffect} from 'react';

import {Text, TouchableOpacity, DevSettings, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {setMock, SET_MOCK} from '../../reducers/mockReducer';
import {signOutRequest} from '../../reducers/userReducer';
import styles from './styles';
import Compass from '../Icons/compass.svg';
import MapLocation from '../Icons/maplocation.svg';

const MockChooseScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const setMockOff = () => {
    dispatch(setMock('nomock'));
    DevSettings.reload();
    //navigation.navigate("Create")
  };
  const setMockOn = () => {
    dispatch(setMock('mock'));
    DevSettings.reload();
    //navigation.navigate("Create")
  };

  return (
    <LinearGradient
      colors={['#343d46', '#65737e']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <TouchableOpacity style={styles.mockoption} onPress={() => setMockOff()}>
        <Text style={styles.mockoptiontext}>Continue with phone locations</Text>
        <MapLocation width={65} height={65} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.mockoption} onPress={() => setMockOn()}>
        <Text style={styles.mockoptiontext}>
          Continue with generated locations (do not approve location permission
          on emulator)
        </Text>
        <Compass width={65} height={65} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default MockChooseScreen;
