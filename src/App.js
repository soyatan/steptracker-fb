import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider} from 'react-redux';

import store from './reducers/store';

import { Text,  View,} from 'react-native';
import MainContainer from './components/Main/MainContainer';



const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])
  
  
  

  return (
    <Provider store={store}>
      <MainContainer/>
    </Provider>
  )}

export default App;
