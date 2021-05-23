import React, {useEffect} from 'react';

import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecords, recordSelector} from '../../reducers/recordReducer';
import {signOutRequest} from '../../reducers/userReducer';
import { usersSelector } from '../../reducers/usersReducer';
import Play from '../Icons/play.svg';
import styles from './styles';

const TracksIndex = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe1 = navigation.addListener('focus',()=>{
      console.log('FOCUS LISTENER RUNNING');
      dispatch(fetchRecords());
    });
  }, [navigation]);

  const records = useSelector(recordSelector);
  const users = useSelector(usersSelector);
  console.log(users)

  const findUser = (id) =>{
  if (records){
    const curUser=users.find(user=>user.id===id);
    return curUser.username
  }
  else return 'unknown user'
}




  return (
    <LinearGradient
      colors={['#343d46', '#65737e']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      {!records ? 
        <ActivityIndicator size="large" />
       : 
        <FlatList
          data={records}
          keyExtractor={(item, index) => index}
          renderItem={item => (
            
            <TouchableOpacity
              style={styles.recordslist}
              onPress={() =>
                navigation.navigate('Details', {id: item.item.id})
              }>
              <Text style={styles.listtext}> {item.index} </Text>
              <Text style={styles.listtext}> {item.item.name} </Text>
              <Text style={styles.listtext}> {findUser(item.item.uid)} </Text>
              <Play width={35} height={35} />

          </TouchableOpacity>
          )}

    />


}
  </LinearGradient>
  );
};

export default TracksIndex;
