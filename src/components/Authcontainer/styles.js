import React from 'react';
import {StyleSheet} from 'react-native';

import {width as w, height as h, width} from '../../constants/Metrics';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  errormessagecontainer: {
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: 'purple',
    borderRadius: 20,
    margin: w * 0.03,
    height: h * 0.08,
    marginTop: h * 0.04,
    width: w * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titletext: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    color: 'white',
  },

  textinput: {
    marginLeft: 15,
    marginRight: 10,
    padding: 5,
    color: 'purple',

    flex: 1,
  },
  textinputcontainer: {
    alignItems: 'center',
  },
  authinputcontainer: {
    height: h * 0.07,
    borderWidth: 0.5,
    padding: 5,
    paddingLeft: 10,
    width: w * 0.85,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
});
