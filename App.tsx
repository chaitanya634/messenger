import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './lib/views/screens/login';
import RegisterScreen from './lib/views/screens/register';
import ChatScreen from './lib/views/screens/chat';
import HomeScreen from './lib/views/screens/home';
import { firebase } from '@react-native-firebase/firestore';
import NewMsg from './lib/views/screens/NewMsg';

export type StackParams = {
  Login: any,
  Register: any,
  Home: any,
  Chat: any
  NewMsg: any
}

export type ScreenParams = {
  Home: {
    userId: string,
    userName: string,
    firstName: string,
    lastName: string
  },
  Chat: {
    myFirstName: string,
    myId: string,
    chatFirstName: string,
    chatLastName: string,
    chatUserName: string,
  },
  NewMsg: {
    myId: string,
    myFirstName: string
  }
}

const Stack = createNativeStackNavigator<StackParams>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Messenger App" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Register" }} />
        <Stack.Screen name="NewMsg" component={NewMsg} options={{ title: "Start Conversation" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
