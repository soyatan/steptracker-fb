import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

export default AuthButton = ({label, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};
