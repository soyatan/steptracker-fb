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
import { locationSelector, setNavigating, setRecording } from '../../reducers/locationReducer';

const TrackDetails = ({route, navigation}) => {
  const location = useSelector(locationSelector);
 
 

  const dispatch = useDispatch();
  const records = useSelector(recordSelector);
  
  const isNavigate = location.navigate;

  const [initCoords, setinitCoords] = useState()
  const [curRecord, setcurRecord] = useState()

  useEffect(() => {
    const unsubscribe1 = navigation.addListener('focus', () => {
      console.log('CREATE SCREEN ON');
      dispatch(setNavigating('details'))
      }
      
    );
    return unsubscribe1;
  }, [navigation]);
  
  useEffect(() => {
    
      const unsubscribe2 = navigation.addListener('blur', () => {
        console.log('blur on navigation');
        setinitCoords(null)
        
      });
      
      return unsubscribe2;
 
  }, [navigation]);
  useEffect(() => {
    if(isNavigate==="details"){
      try{
        const {id} = route.params;
        const record = records.find(item => item.id === id);
        setcurRecord(record)
        const initialCoords = record.locations[0].coords;
        setinitCoords(initialCoords)}
      catch (error) {
        console.log(error);
        alert('record not found');
        navigation.navigate('Index')
      }
    }
  }, [isNavigate])


  
  

  return (
    <LinearGradient
      colors={['#cf7ecf', '#65737e']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
        {initCoords?
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...initCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Polyline coordinates={curRecord.locations.map(loc => loc.coords)} />
      </MapView>
      : null }

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
