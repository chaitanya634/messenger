import React from 'react';
import {
  View,
  Button,
} from 'react-native';

import { 
  addUserInUsers, 
  addChatInChatsOfUser, 
  addMsgInSentMsgs, 
} from './src/firestore_functions';

function App(): JSX.Element {
  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    }}>
      <Button title='Hit' onPress={()=>{
        addUserInUsers(1,"Chaitanya Jadhav","chaitanya@wdimails.com")
        addChatInChatsOfUser(1,2,'Nikhil Kadam','nikhil.kadam@wdimails.com')
        addMsgInSentMsgs(1,2,1,"Heyyy")
      }}/>
    </View>
  );
}

export default App;
