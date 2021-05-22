import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';

import User from '../Icons/user.svg';
import Password from '../Icons/password.svg';

export default AuthInput = ({
  iconname,
  label,
  secureTextEntry,
  keyboardType,
  onEndEditing,
  state,
  onChangeText,
}) => {
  return (
    <>
      <View style={styles.authinputcontainer}>
        {iconname === 'user' ? (
          <User width={25} height={35} />
        ) : iconname === 'password' ? (
          <Password width={25} height={35} />
        ) : null}

        <TextInput
          style={styles.textinput}
          label={label}
          placeholder={label}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor="purple"
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
