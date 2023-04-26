import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Button, TextInput, SafeAreaView} from "react-native";
import Snackbar from "react-native-snackbar";
import firestore from '@react-native-firebase/firestore';
import { addChatInChatsOfUser, addMsgInSentMsgs, addUserInUsers } from "../firestore_functions";

export function LoginScreen(){
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    let isAuth: boolean = false;

    return (
      <SafeAreaView>
          <View style={{alignItems:"center"}}>
        <TextInput
          style={{margin:24, fontSize:24}}
          placeholder="Please enter your email"
          onChangeText={(text) => {setEmail(text)}}
          defaultValue={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title='Login' onPress={()=>{
          // value.docs[0].data().email
        let authUserId: number = -1;
        let authUserName: string = '';
        let authUserEmail: string = '';
        firestore().collection('users').get().then((value)=>{
          value.docs.forEach((doc)=>{
            let data = doc.data();
            if(data.email == email){
              authUserId = data.id
              authUserName = data.name
              authUserEmail = data.email
              isAuth = true
              return
            }
          })
          if(isAuth){
            navigation.navigate('Home',{
              user_id: authUserId,
              user_name: authUserName,
              user_email: authUserEmail
            })
            setEmail("")
          } 
          else {
            Snackbar.show({
            text:"You are not registered",
            duration:Snackbar.LENGTH_SHORT
            })
          }
        })
          
        }}/>
      </View>
      </SafeAreaView>
    );
}