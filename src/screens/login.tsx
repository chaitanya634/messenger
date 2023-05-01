import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Button, TextInput, SafeAreaView, Alert, Text } from "react-native";
import Snackbar from "react-native-snackbar";
import firestore from '@react-native-firebase/firestore';

import ComponentStyles from "../styles"
import CustomButton from "../components/CustomButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../App";


export function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [email, setEmail] = useState("")
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(false)
  let isAuth = false

  return (
    <SafeAreaView>
      <TextInput
        style={{...ComponentStyles.textInput, marginBottom: 22}}
        placeholder="Please enter your email"
        placeholderTextColor="#A7A7A7"
        onChangeText={(input) => setEmail(input)}
        defaultValue={email}
      />
      <CustomButton
        text="Login"
        onTap={() => {
          if (email.trim() == "") {
            Alert.alert(
              "Cannot Login",
              "Please enter your registered email",
              undefined,
              { cancelable: true }
            )
          } else {
            setIsLoginBtnDisabled(true)
            firestore().collection('users').get().then((res) => {
              const docs = res.docs
              let dbUserName = null
              let dbUserEmail = null
              let userDocId = null
              for (const doc of docs) {
                if (doc.data().userEmail == email) {
                  isAuth = true
                  dbUserName = doc.data().userName
                  dbUserEmail = doc.data().userEmail
                  userDocId = doc.id
                  break;
                } else {
                  isAuth = false
                }
              }
              if (isAuth) {
                navigation.navigate("Home",{
                  userId: userDocId,
                  userName: dbUserName,
                  userEmail: dbUserEmail,
                })
                setEmail("")
              } else {
                Alert.alert(
                  "Cannot Login", 
                  "The email you have entered may be incorrect or not registered", 
                  undefined, 
                  { cancelable: true }
                )
              }
              setIsLoginBtnDisabled(false)
            })
          }
        }}
      />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          alignSelf: "center",
          margin: 22,
          color: "#A18B8B"
        }}>
        -   -   -   -   OR   -   -   -   -
      </Text>
      <CustomButton
        text="Register"
        onTap={() => navigation.navigate('Register')}
      />
    </SafeAreaView>
  );
}