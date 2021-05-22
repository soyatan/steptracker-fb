import React, {useEffect} from 'react';

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

const TrackDetails = ({route, navigation}) => {
  const {id} = route.params;

  const dispatch = useDispatch();
  const records = useSelector(recordSelector);
  useEffect(() => {
    const unsubscribe1 = navigation.addListener('focus', () => {
      console.log('FOCUS LISTENER RUNNING');
    });
  }, [navigation]);

  const record = records.find(item => item._id === id);
  const initialCoords = record.locations[0].coords;
  console.log(initialCoords);

  return (
    <LinearGradient
      colors={['#343d46', '#65737e']}
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
