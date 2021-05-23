import * as Location from 'expo-location';


export const _removeLocListener = () =>{
  Location.EventEmitter.removeAllListeners;
  Location.EventEmitter.removeSubscription('Expo.locationChanged');
}



export const _mockLocation = (longs, lats) => {
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
