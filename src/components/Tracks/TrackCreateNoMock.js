import React, {useEffect, useState} from 'react';

import {Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {useDispatch, useSelector} from 'react-redux';

import Map from '../Map/Map';
import styles from './styles';
import {
  watchPositionAsync,
  requestForegroundPermissionsAsync,
  Accuracy,
} from 'expo-location';
import {
  setCurrentLocation,
  locationSelector,
  addLocation,
  eraseLocations,
} from '../../reducers/locationReducer';
import TracknameInput from './TracknameInput';
import RecordButton from './RecordButton';
import {
  createRecordRequest,
  recordSelector,
} from '../../reducers/recordReducer';
//import _mockLocation from '../Map/_mockLocation';

const TrackCreateNoMock = ({navigation}) => {
  //_mockLocations();
  const dispatch = useDispatch();
  const [err, setErr] = useState(null);
  const [trackName, setTrackName] = useState('');
  const [isTracking, setTracking] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const [subscriber, setSubscriber] = useState(null);

  const location = useSelector(locationSelector);
  const isNavigate = location.navigate;
  const records = useSelector(recordSelector);

  const {recording} = useSelector(locationSelector);

  const startWatching = async () => {
    try {
      await requestForegroundPermissionsAsync();
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        location => {
          //console.log(location.coords.longitude,location.coords.latitude)
          dispatch(setCurrentLocation(location));
          if (isRecording) {
            dispatch(addLocation(location));
          }
        },
      );
      setSubscriber(sub);
    } catch (error) {
      setErr(error);
    }
  };

  //on first render we startwatching
  useEffect(() => {
    //_mockLocation(29.1197331, 40.9413056);
    startWatching();
  }, []);

  //on focus if not tracking, we start tracking
  useEffect(() => {
    const unsubscribe1 = navigation.addListener('focus', () => {
      console.log('FOCUS LISTENER RUNNING');
      if (!isTracking) {
        dispatch(eraseLocations());
        setTracking(true);
        startWatching();
      }
      
    });
  }, [navigation, isTracking, isRecording]);

  //on blur if not recording stop tracking
  useEffect(() => {
    if (!isRecording) {
      const unsubscribe2 = navigation.addListener('blur', () => {
        console.log('blur on navigation');
        {
          console.log('changing tracking to false');
          setTracking(false);
        }
      });
      return unsubscribe2;
    }
  }, [navigation, isTracking, isRecording]);

  //set tracking false yapıldığında duruyor

  useEffect(() => {
    if (!isTracking) {
      console.log('TRACKING FALSE YAPILDI');
      if (subscriber) {
        subscriber.remove();
        setSubscriber(null);
      }
    }
  }, [isTracking, isRecording]);
  //navigation olunca hook çalıaşcak isfocused
  //ve bunun üzerine startwatching çalışacak
  //
  useEffect(() => {
    if (isRecording) {
      console.log('RECORDING STARTED');
      dispatch(eraseLocations());
      if (subscriber) {
        subscriber.remove();
        setSubscriber(null);
      }
      startWatching();
    }
    if (!isRecording) {
      console.log('RECORDING DISABLED');
      if (subscriber) {
        subscriber.remove();
        setSubscriber(null);
      }
      startWatching();
      dispatch(createRecordRequest(location.locations, trackName));
    }
  }, [isRecording]);

  useEffect(() => {
    if (isNavigate === 'index') {
      navigation.navigate('Index');
    }
  }, [isNavigate]);

  const startRecording = async () => {
    setIsRecording(true);
    //await setTracking(true);
  };

  const stopRecording = async () => {
    setIsRecording(false);
  };

  return (
    <LinearGradient
      colors={['#343d46', '#65737e']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.titlecontainer}>
        <Text style={styles.titletext}>Create New Track</Text>
      </View>

      <Map />

      {err ? (
        <Text style={{color: 'red'}}>Please dasdasdasdsadservices</Text>
      ) : null}
      <View style={styles.bottomcontainer}>
        <View style={styles.trackinputcontainer}>
          <Text style={styles.titletext2}>
            Please Enter a Name for New Track
          </Text>
          <TracknameInput
            onChangeText={setTrackName}
            staate={trackName}
            placeholder={'My big trip'}
          />
        </View>

        <RecordButton
          isRecording={isRecording}
          onPressR={() => startRecording()}
          onPressS={() => stopRecording()}
        />
      </View>
    </LinearGradient>
  );
};

export default TrackCreateNoMock;
