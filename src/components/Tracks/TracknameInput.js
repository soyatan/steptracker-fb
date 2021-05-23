import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';

import User from '../Icons/user.svg';
import Password from '../Icons/password.svg';

export default TrackNameInput = ({
  placeholder,
  secureTextEntry,
  keyboardType,
  onEndEditing,
  state,
  onChangeText,
}) => {
  return (
    <>
      <View style={styles.trackinput}>
        <TextInput
          style={styles.textinput}
          placeholder={placeholder}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor="white"
          selectionColor="white"
          onChangeText={onChangeText}
          value={state}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onEndEditing={onEndEditing}
        />
      </View>
    </>
  );
};
