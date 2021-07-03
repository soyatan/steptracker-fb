import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';

import {storey} from './reducers/store';

import {Text, View} from 'react-native';
import MainContainer from './components/Main/MainContainer';
import {PersistGate} from 'redux-persist/integration/react';

const {store, persistor} = storey();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
