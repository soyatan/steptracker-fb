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

    height: h * 0.3,
    width: w * 0.96,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 56,
  },
  inputscontainer: {
    flexDirection: 'row',
    flex: 1,
  },

  trackinputcontainer: {
    marginTop: 10,
    width: w * 0.95,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coordinputcontainer: {
    marginTop: 10,
    width: w * 0.95,
    justifyContent: 'space-between',
    alignItems: 'center',

    flex: 1,
  },
  trackinput: {
    width: w * 0.45,
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: 'white',
  },
  coordinput: {
    width: w * 0.3,
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: 'white',
  },

  textinput: {},
  textinputsmall: {
    fontSize: 13,
    textAlign: 'auto',
    color: 'white',
  },
  tabbar: {
    backgroundColor: '#38353a',
  },
  titlecontainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  recordingbuttoncontainer: {
    flex: 1,
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
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  iconcontainer: {
    margin: 15,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordslist: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 5,
    borderWidth: 0.5,
    padding: 5,
    width: w * 0.9,
    height: h * 0.08,
  },
  recorditemleftcontainer: {
    justifyContent: 'center',
    flex: 6,
    textAlignVertical: 'center',
    padding: 4,
  },
  recordplaybutton: {
    flex: 1,
    justifyContent: 'center',
  },
  deletebutton: {
    flex: 1,
    justifyContent: 'center',
  },

  recorditemrightcontainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listtext: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
