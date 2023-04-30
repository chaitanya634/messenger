import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  Alert
} from "react-native"
import CustomButton from "../components/CustomButton"
import ComponentStyles from "../styles"
import { useState } from "react"

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

export const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false)

  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <TextInput
        style={ComponentStyles.textInput}
        placeholder="Please enter your name"
        onChangeText={(input) => setName(input)}
        defaultValue={name}
      />
      <TextInput
        style={ComponentStyles.textInput}
        placeholder="Please enter your email"
        onChangeText={(input) => setEmail(input)}
        defaultValue={email}
      />
      <CustomButton
        text="Submit"
        isDisabled={isSubmitBtnDisabled}
        onTap={() => {
          setName(name.trim())
          setEmail(email.trim())
          if (name == "" || email == "") {
            Alert.alert(
              "Not Submitted",
              "You need to enter both, name and email to submit",
              undefined,
              { cancelable: true }
            )
          } else {
            setIsSubmitBtnDisabled(true)
            firestore().collection('users').add({
              userName: name,
              userEmail: email
            }).then((v) => {
              setIsSubmitBtnDisabled(false)
              setName("")
              setEmail("")
              Alert.alert(
                "Successfully Registered",
                "Please login using same email",
                [
                  {
                    text: "Login",
                    onPress: () => navigation.goBack()
                  }
                ],
                {
                  cancelable: true,
                }
              )
            })
          }
        }}
      />
    </SafeAreaView>
  );
}

