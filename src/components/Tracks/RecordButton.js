import {TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Record from '../Icons/record.svg';
import Stop from '../Icons/stop.svg';

export default RecordButton = ({isRecording, onPressR, onPressS}) => {
  return (
  !isRecording ? 
    <>
    <TouchableOpacity
      style={styles.recordingbuttoncontainer}
      onPress={onPressR}>
      <Record width={45} height={45} />
      <Text style={styles.titletext}>START RECORDING</Text>
    </TouchableOpacity>
    </>
:
    <>
    <TouchableOpacity
      style={styles.recordingbuttoncontainer}
      onPress={onPressS}>
      <Stop width={45} height={45} />
      <Text style={styles.titletext}>STOP RECORDING</Text>
    </TouchableOpacity>
    </>
  )
  
}
  
 
