import React from 'react';
import {StyleSheet} from 'react-native';

import {width as w, height as h, width} from '../../constants/Metrics';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  map: {
    width: w * 0.96,
    height: h * 0.6,
    borderRadius: 15,
  },
  tabbarcontainer: {
    justifyContent: 'center',
  },
  bottomcontainer: {
    flexGrow: 1,
  },

  trackinputcontainer: {
    marginTop: 10,
    width: w * 0.95,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackinput: {
    width: w * 0.5,
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: 'white',
  },
  textinput: {},
  tabbar: {
    backgroundColor: '#38353a',
  },
  titlecontainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  recordingbuttoncontainer: {
 
    width: w * 0.9,
    alignItems: 'center',
    
  },

  tabbartitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  titletext: {
    fontSize: 25,
    color: 'white',
    textAlignVertical: 'center',
  },
  titletext2: {
    fontSize: 12,
    color: 'white',
  },
  iconcontainer: {
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordslist: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  listtext: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
