// NavigationStack.tsx
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/Home.index';
import LoginScreen from '../screens/Login/Login.index';


type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const NavigationStack: React.FC = () => {
  return (
    <Stack.Navigator>
     
      <Stack.Screen  name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default NavigationStack;
