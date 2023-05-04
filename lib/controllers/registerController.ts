import { Alert } from "react-native"
import firestore, { firebase } from '@react-native-firebase/firestore';

export const onRegisterBtnPressed = (
    username: string,
    email: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setIsSubmitBtnDisabled: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (username.length == 0 || email.length == 0) {
      Alert.alert("Cannot Register", "Please enter username and email both to register")
    } else {
      setIsSubmitBtnDisabled(true)
      const users = firestore().collection('users')
      users.add({
        firstName: "Chaitanya",
        lastName: "Jadhav",
        userName: "chaitanya634"
      }).then(()=>{
        setIsSubmitBtnDisabled(false)
        setUsername("")
        setEmail("")
      })
    }
  }
