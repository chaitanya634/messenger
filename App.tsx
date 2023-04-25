import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';


function App(): JSX.Element {
  firestore().collection('Users').get().then((val)=>{
    console.log('====================================');
    console.log(val.docs);
    console.log('====================================');
  })
  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    }}>
      <Text>Hello</Text>
    </View>
  );
}

export default App;
