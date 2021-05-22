import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TracksContainer from '../Tracks/TracksContainer';
import AuthContainer from '../Authcontainer/AuthContainer';

import {useDispatch, useSelector} from 'react-redux';
import {setUserToken, userSelector} from '../../reducers/userReducer';

import {loadingSelector, switchLoading} from '../../reducers/loadingReducer';
import auth from '@react-native-firebase/auth';




const Main = createStackNavigator();

const MainContainer = () => {
  const [initializing, setInitializing] = useState(true);
  function onAuthStateChanged(user) {
    if (initializing) {setInitializing(false);}
  }
  

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  const currentUser = useSelector(userSelector);

  const loadingStatus = useSelector(loadingSelector);



  return loadingStatus ? null : 
    <NavigationContainer>
      <Main.Navigator screenOptions={{headerShown: false}}>
        {!currentUser.status ? 
          <Main.Screen name="Auth" component={AuthContainer} />
         : 
          <Main.Screen name="Tracks" component={TracksContainer} />
        }
      </Main.Navigator>
    </NavigationContainer>
  
};

export default MainContainer;
