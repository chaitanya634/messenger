import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Button, TextInput, Alert} from "react-native";
import Snackbar from "react-native-snackbar";
import firestore from '@react-native-firebase/firestore';

export function LoginScreen(){
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    let isAuth: boolean = false;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{margin:24, fontSize:24}}
          placeholder="Please enter your email"
          onChangeText={(text) => {setEmail(text)}}
          defaultValue={email}
          keyboardType="email-address"
        />
        <Button title='Login' onPress={()=>{
          // value.docs[0].data().email
        firestore().collection('users').get().then((value)=>{
          value.docs.forEach((doc)=>{
            if(doc.data().email == email){
              isAuth = true
              return
            }
          })
          if(isAuth){
            navigation.navigate('Home')
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
    );
}