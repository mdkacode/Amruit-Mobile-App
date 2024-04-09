import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/Home.index';
import LoginScreen from '../screens/Login/Login.index';
import List from '../screens/List/List.index';
import Customer from '../screens/Customer/Customer.index';
import AddCustomer from '../screens/Customer/NewCustomer.index';
import Sales from '../screens/Sales/Sales.index';
import { NavigationContainerRef } from '@react-navigation/native';
// Define mapping object for screens
const Screens = {
  
  Sales: {
    screen: Sales,
    isHeader: true
  },
  Login: {
    screen: LoginScreen,
    isHeader: false
  },
  Customer: {
    screen: Customer,
    isHeader: true
  },
  AddCustomer: {
    screen: AddCustomer,
    isHeader: true
  },
  List: {
    screen: List,
    isHeader: true
  },
  Home: {
    screen: HomeScreen,
    isHeader: true
  }
};

// Define interface for navigation routes based on Screens mapping
export type RootStackParamList = {
  [key in keyof typeof Screens]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const NavigationStack: React.FC = () => {
  return (
    <>

      <Stack.Navigator>
        
        {Object.entries(Screens).map(([name, component]) => {

          return (
            <Stack.Screen
              key={name}
              name={name}
              component={component.screen}
              options={{
                headerShown: component.isHeader
              }}
            />
          )
        }


        )}
      </Stack.Navigator>
    </>
  );
}

export default NavigationStack;
