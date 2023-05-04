import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Button, TextInput, SafeAreaView, Alert, Text } from "react-native";
import firestore from '@react-native-firebase/firestore';
import ComponentStyles from "../styles"
import CustomButton from "../components/CustomButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "../../App";

export function LoginScreen() {
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
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }} >
        <CustomButton
          text="Forgot Username"
          onTap={() => { }}
        />
        <CustomButton
          text="Login"
          onTap={() => {}}
        />
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          alignSelf: "center",
          marginVertical: 26,
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