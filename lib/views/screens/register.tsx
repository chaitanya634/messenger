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
import ComponentStyles from "../styles/MyStylesheet"
import { useState } from "react"

import { useNavigation } from "@react-navigation/native";

import { onRegisterBtnPressed } from "../../controllers/registerController"; 

const RegisterScreen = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false)

  return (
    <SafeAreaView>
      <TextInput
        style={ComponentStyles.textInput}
        placeholder="Enter username of your choice"
        onChangeText={(input) => setUsername(input)}
        defaultValue={username}
        autoCapitalize="words"
        placeholderTextColor="#A7A7A7"
      />
      <TextInput
        style={{ ...ComponentStyles.textInput, marginBottom: 22 }}
        placeholder="Enter email"
        autoCapitalize="none"
        onChangeText={(input) => setEmail(input)}
        defaultValue={email}
        placeholderTextColor="#A7A7A7"
      />
      <CustomButton
        text="Submit"
        isDisabled={isSubmitBtnDisabled}
        onTap={() => onRegisterBtnPressed(
          username,
          email,
          setUsername,
          setEmail,
          setIsSubmitBtnDisabled
        )}
      />
    </SafeAreaView>
  );
}

export default RegisterScreen