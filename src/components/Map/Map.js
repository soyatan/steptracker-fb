import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import styles from './styles';
import MapView, {PROVIDER_GOOGLE, Polyline, Circle} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {locationSelector} from '../../reducers/locationReducer';
import {recordSelector} from '../../reducers/recordReducer';

const Map = () => {
  const {currentLocation} = useSelector(locationSelector);
  const {locations} = useSelector(locationSelector);
  const records = useSelector(recordSelector);
  
  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{marginTop: 200}} />;
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      region={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      <Circle
        center={currentLocation.coords}
        radius={40}
        strokeColor="rgba(155,158,255,1.0)"
        fillColor="rgba(158,158,255,0.3)"
      />

      <Polyline coordinates={locations.map(loc => loc.coords)} />
    </MapView>
  );
};

export default Map;
