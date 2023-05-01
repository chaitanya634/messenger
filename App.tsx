import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/home';
import { LoginScreen } from './src/screens/login';
import { ChatScreen } from './src/screens/chat';
import { RegisterScreen } from './src/screens/register';

export type StackParams = {
  Login: any,
  Register: any,
  Home: any,
  Chat: any
}

export type ScreenParams = {
  Home: {
    userId: string,
    userName: string,
    userEmail: string
  },
  Chat: {
    userId: string,
    chatUserId: string,
    chatUserName: string,
    chatUserEmail: string
  }
}

const Stack = createNativeStackNavigator<StackParams>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Messenger App" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Register" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
