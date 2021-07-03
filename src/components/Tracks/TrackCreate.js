import React, {useEffect, useState} from 'react';

import {Alert, Text, View} from 'react-native';

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
  setNavigating,
} from '../../reducers/locationReducer';
import TracknameInput from './TracknameInput';
import RecordButton from './RecordButton';
import {
  createRecordRequest,
  recordSelector,
} from '../../reducers/recordReducer';
import {_mockLocation, _removeLocListener} from '../Map/_mockLocation';
import database from '@react-native-firebase/database';
import {initCoordSelector} from '../../reducers/initcoordsreducer';

const TrackCreate = ({navigation}) => {
  //_mockLocations();
  const dispatch = useDispatch();
  const [err, setErr] = useState(null);
  const [trackName, setTrackName] = useState('');
  const [isTracking, setTracking] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [subscriber, setSubscriber] = useState(null);

  const location = useSelector(locationSelector);
  const isNavigate = location.navigate;

  const initCoord = useSelector(initCoordSelector);
  // console.log('isTracking-isrecording-subscriber',isTracking,isRecording,subscriber)

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
    _mockLocation(initCoord.lon, initCoord.lat);
    startWatching();
  }, []);

  //on focus if not tracking, we start tracking
  useEffect(() => {
    const unsubscribe1 = navigation.addListener('focus', () => {
      console.log('CREATE SCREEN ON');
      dispatch(setNavigating('create'));
      if (!isTracking) {
        dispatch(eraseLocations());
        setTracking(true);
        startWatching();
      }
      setTrackName('');
    });
    return unsubscribe1;
  }, [navigation, isTracking]);

  //on blur if not recording stop tracking
  useEffect(() => {
    if (!isRecording) {
      const unsubscribe2 = navigation.addListener('blur', () => {
        console.log('blur on navigation');
        {
          console.log('TRACKING OFF');
          setTracking(false);
        }
      });
      return unsubscribe2;
    }
  }, [navigation, isTracking, isRecording]);

  //action when stop tracking

  useEffect(() => {
    if (!isTracking) {
      console.log('TRACKING OFF');
      if (subscriber) {
        subscriber.remove();
        setSubscriber(null);
      }
    }
  }, [isTracking, isRecording]);

  useEffect(() => {
    if (isRecording) {
      console.log('RECORDING ON');
      dispatch(eraseLocations());
      if (subscriber) {
        subscriber.remove();
        setSubscriber(null);
      }
      startWatching();
    }
    if (!isRecording) {
      console.log('RECORDING OFF');
      if (subscriber) {
        subscriber.remove();
        setSubscriber(null);
      }
      //startWatching();
      dispatch(createRecordRequest(location.locations, trackName));
    }
  }, [isRecording]);

  useEffect(() => {
    if (isNavigate === 'index') {
      navigation.navigate('Index');
    }
  }, [isNavigate]);

  const startRecording = async () => {
    if (trackName.length < 3) {
      alert('please enter valid name for recording');
    } else {
      setIsRecording(true);
    }
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
        <Text style={{color: 'red'}}>Please enable location services</Text>
      ) : null}
      <View style={styles.bottomcontainer}>
        <View style={styles.trackinputcontainer}>
          <Text style={styles.titletext2}>NEW TRACK NAME</Text>
          <TracknameInput
            onChangeText={setTrackName}
            state={trackName}
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

export default TrackCreate;
