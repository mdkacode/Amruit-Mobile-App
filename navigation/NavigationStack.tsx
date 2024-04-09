// NavigationStack.tsx
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/Home.index';
import LoginScreen from '../screens/Login/Login.index';
import List from '../screens/List/List.index';
import Customer from '../screens/Customer/Customer.index';
import AddCustomer from '../screens/Customer/NewCustomer.index';


type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const NavigationStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="Add Customer" component={AddCustomer} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default NavigationStack;
