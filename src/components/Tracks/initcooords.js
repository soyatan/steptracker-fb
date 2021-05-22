import {TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Record from '../Icons/record.svg';
import Stop from '../Icons/stop.svg';
import {useSelector} from 'react-redux';
import {locationSelector} from '../../reducers/locationReducer';
let longs = 29.1197331;
let lats = 40.9413056;

export const initalCoord = () => {};
