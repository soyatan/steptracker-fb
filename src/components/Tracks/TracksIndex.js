import React, {useEffect} from 'react';

import {Text, View, FlatList, ActivityIndicator, Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecords, recordSelector} from '../../reducers/recordReducer';
import {signOutRequest} from '../../reducers/userReducer';
import { usersSelector } from '../../reducers/usersReducer';
import Play from '../Icons/play.svg';
import styles from './styles';
import Garbage from '../Icons/garbage.svg';

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
      colors={['#cf7ecf', '#65737e']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      {!records ? 
        <ActivityIndicator size="large" />
       : 
        <FlatList
          showsVerticalScrollIndicator={false}
          data={records}
          keyExtractor={(item, index) => index}
          renderItem={item => (
            
            <View style={styles.recordslist}>
              <View style={styles.recorditemleftcontainer}> 
                <View style={styles.recorditemname}> 
                  <Text style={styles.titletext}> {item.item.name} </Text>
                </View>
                <View style={styles.recordusername}> 
                  <Text style={styles.titletext2}> {findUser(item.item.uid)} </Text>
                </View>
              </View>
              <View style={styles.recorditemrightcontainer}> 
                <TouchableOpacity onPress={() =>
                navigation.navigate('Details', {id: item.item.id})
              } style={styles.recordplaybutton}> 
                  <Play width={35} height={35} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deletebutton}> 
                  <Garbage width={25} height={25} />
                </TouchableOpacity>
              </View>
              

          </View>
          )}

    />


}
  </LinearGradient>
  );
};

export default TracksIndex;
