import * as Location from 'expo-location';

import React from 'react';

import {useSelector} from 'react-redux';
import {locationSelector} from '../../reducers/locationReducer';

import initalCoord from '../Tracks/initcooords';

export default _mockLocations = (longs, lats) => {
  /*
let longs=29.1197331;
let lats=40.9413056;*/
  const tenMetersWithDegrees = 0.0001;
  const getLocation = (increment, longs, lats) => {
    return {
      timestamp: 10000,
      coords: {
        speed: 0,
        heading: 0,
        accuracy: 5,
        altitudeAccuracy: 5,
        altitude: 5,
        longitude: longs + increment * tenMetersWithDegrees,
        latitude: lats + increment * tenMetersWithDegrees,
      },
    };
  };

  let counter = 0;
  setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
      watchId: Location._getCurrentWatchId(),
      location: getLocation(counter, longs, lats),
    });
    counter++;
  }, 1000);
};
