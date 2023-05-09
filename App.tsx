import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './lib/views/screens/login';
import RegisterScreen from './lib/views/screens/register';
import ChatScreen from './lib/views/screens/chat';
import HomeScreen from './lib/views/screens/home';
import NewMsg from './lib/views/screens/NewMsg';
import ProfileScreen from './lib/views/screens/profile';

export type StackParams = {
  Login: any,
  Register: any,
  Home: any,
  Chat: any,
  NewMsg: any,
  Profile: any
}

export type ScreenParams = {
  Home: {
    myId: string,
    myFirstName: string,
    myLastName: string,
    myUserName: string,
  },
  Chat: {
    chatRoomId: string | null
    myId: string,
    myFirstName: string,
    myLastName: string,
    myUserName: string,
    chatId: string,
    chatFirstName: string,
    chatLastName: string,
    chatUserName: string,
    isNewChat: boolean
  },
  NewMsg: {
    myId: string,
    myFirstName: string,
    myLastName: string,
    myUserName: string,
  },
  Profile: {
    showMyProfile: boolean
    chatRoomId: string | null
    myId: string,
    myFirstName: string,
    myLastName: string,
    myUserName: string,
    chatId: string | null,
    chatFirstName: string | null,
    chatLastName: string | null,
    chatUserName: string | null,
    isNewChat: boolean
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
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
