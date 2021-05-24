import React, {useEffect, useState} from 'react';

import {Text, TouchableOpacity,DevSettings, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {signOutRequest} from '../../reducers/userReducer';
import styles from './styles';
import Compass from '../Icons/compass.svg'
import MapLocation from '../Icons/maplocation.svg'
import { setMock, SET_MOCK } from '../../reducers/mockReducer';
import CoordInput from '../Tracks/CoordInput';
import { initCoordSelector, setCoords } from '../../reducers/initcoordsreducer';

const AccountScreen = () => {
  const initCoord=useSelector(initCoordSelector)
  const [lon, setlon] = useState(initCoord.lon)
  const [lat, setlat] = useState(initCoord.lat)
  const dispatch = useDispatch();
  const [isValid, setisValid] = useState(false)
  console.log(lon,lat)
  useEffect(() => {
    validateCoords()
  }, [])

  const signOut = () => {
    dispatch(signOutRequest());
  };
  const setMockOff = () => {
    dispatch((setMock('nomock')));
    DevSettings.reload();
    //navigation.navigate("Create")
  };
  const setMockOn = () => {
    
    dispatch(setCoords({lon:parseFloat(lon),lat:parseFloat(lat)}))
    dispatch((setMock('mock')));
    DevSettings.reload();
    //navigation.navigate("Create")
  };

  const validateCoords = () =>{
    console.log('validating')
    if(-90<lat&lat<90&-180<lon&lon<180){
      setisValid(true)
      console.log('valid coordinates')
    }
    
    else {
      console.log('invalid coordinates')
      setisValid(false)}
  }

  return (
    <LinearGradient
      colors={['#343d46', '#65737e']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <TouchableOpacity style={styles.mockoption} onPress={() => signOut()}>
        <Text style={styles.mockoptiontext}>CLICK TO SIGN OUT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mockoption} onPress={() => setMockOff()}>
        <Text style={styles.mockoptiontext}>Continue with phone locations</Text>
        <MapLocation width={65} height={65}/>
      </TouchableOpacity>
      <View style={styles.mockoption} >
        <Text style={styles.mockoptiontext}>Generated locations (do not approve location permission on emulator)</Text>
        
        <Text style={styles.mockoptiontext}>Initial Coordinates</Text>
        {!isValid? <Text style={styles.errortext}>Please Enter Valid Coordinates</Text> : null}
          <View style={{flexDirection:'row', justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            <View style={styles.inslong}>
              <Text style={styles.mockoptiontext2}>longitude</Text>
              <CoordInput onEndEditing={()=>validateCoords()} onChangeText={setlon} state={lon.toString()}/>
            </View>
            <View style={styles.inslong}>
              <Text style={styles.mockoptiontext2}>latitude</Text>
              <CoordInput onEndEditing={()=>validateCoords()} onChangeText={setlat} state={lat.toString()}/>
              </View>
          </View>
          <TouchableOpacity onPress={() => setMockOn()}>
            <Compass width={65} height={65}/>
          </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AccountScreen;
