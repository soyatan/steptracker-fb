import React, {useEffect} from 'react';

import {Text, View, StatusBar} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountScreen from '../Account/AccountScreen';
import TracksIndex from './TracksIndex';
import TrackCreate from './TrackCreate';
import TrackDetails from './TrackDetails';
import styles from './styles';

const Tracks = createBottomTabNavigator();

const TracksContainer = () => {
  const tabBarOptions = () => {
    return {
      activeBackgroundColor: '#6895db',
      tabStyle: styles.tabbarcontainer,
      labelStyle: styles.tabbartitle,
      allowFontScaling: true,
      style: styles.tabbar,
    };
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#4f5b66'} />
      <Tracks.Navigator tabBarOptions={tabBarOptions()}>
        <Tracks.Screen name="Create" component={TrackCreate} />
        <Tracks.Screen name="Index" component={TracksIndex} />
        <Tracks.Screen name="Details" component={TrackDetails} />
        <Tracks.Screen name="Account" component={AccountScreen} />
      </Tracks.Navigator>
    </>
  );
};

export default TracksContainer;
