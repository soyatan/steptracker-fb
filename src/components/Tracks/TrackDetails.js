import React, {useEffect,useState} from 'react';
import { useIsFocused } from '@react-navigation/native'
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecords, recordSelector} from '../../reducers/recordReducer';
import {signOutRequest} from '../../reducers/userReducer';
import MapView, {PROVIDER_GOOGLE, Polyline, Circle} from 'react-native-maps';
import styles from './styles';
import Back from '../Icons/back.svg';
import { locationSelector, setNavigating } from '../../reducers/locationReducer';

const TrackDetails = ({route, navigation}) => {
  const location = useSelector(locationSelector);
 
  const {id} = route.params;

  const dispatch = useDispatch();
  const records = useSelector(recordSelector);



  const record = records.find(item => item.id === id);
  const initialCoords = record.locations[0].coords;
  //console.log(initialCoords);

  return (
    <LinearGradient
      colors={['#cf7ecf', '#65737e']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...initialCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Polyline coordinates={record.locations.map(loc => loc.coords)} />
      </MapView>

      <TouchableOpacity
        onPress={() => navigation.navigate('Index')}
        style={styles.iconcontainer}>
        <Back width={55} height={55} />
        <Text>GO BACK TO INDEX</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default TrackDetails;
