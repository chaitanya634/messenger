import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Button, TextInput, SafeAreaView, Alert, Text } from "react-native";
import ComponentStyles from "../styles/MyStylesheet"
import CustomButton from "../components/CustomButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../../App";
import { firebase } from '@react-native-firebase/firestore';

function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [username, setUsername] = useState("")
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(false)

  return (
    <SafeAreaView>
      <TextInput
        style={{ ...ComponentStyles.textInput, marginBottom: 22 }}
        placeholder="Enter username"
        autoCapitalize="none"
        placeholderTextColor="#A7A7A7"
        onChangeText={(input) => setUsername(input)}
        defaultValue={username}
      />
      <CustomButton
        text="Login"
        isDisabled={isLoginBtnDisabled}
        onTap={() => {
          if (username.trim().length == 0) {
            Alert.alert("Cannot Login", "Please enter username")
          }
          else {
            setIsLoginBtnDisabled(true)
            firebase.firestore().collection('users')
              .where('userName', '==', username.trim()).get().then((res) => {
                if (res.empty) {
                  Alert.alert("Cannot Login", "Username is not registerd")
                } else {
                  const userDoc = res.docs[0]
                  const userData = userDoc.data()
                  firebase.firestore().collection('activeUsers').add({userId: userDoc.id}).then((doc)=>{
                    navigation.navigate('Home',{
                      activeUsersDocId: doc.id,
                      myId: userDoc.id,
                      myFirstName: userData.firstName,
                      myLastName: userData.lastName,
                      myUserName: userData.userName
                    })
                    setUsername("")
                    setIsLoginBtnDisabled(false)
                  })
                }
              })
          }
        }}
      />
    </SafeAreaView>
  );
}

export default LoginScreen