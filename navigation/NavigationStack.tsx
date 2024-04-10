import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/Home.index';
import LoginScreen from '../screens/Login/Login.index';
import List from '../screens/List/List.index';
import Customer from '../screens/Customer/Customer.index';
import AddCustomer from '../screens/Customer/NewCustomer.index';
import Sales from '../screens/Sales/Sales.index';
import { useAppSelector } from '../Store/store.index';
;
// Define mapping object for screens
const Screens = {
  Login: {
    screen: LoginScreen,
    isHeader: false,
    gestureEnabled: false,
  },
  Customer: {
    screen: Customer,
    isHeader: true,
    gestureEnabled: false,
  },
  AddCustomer: {
    screen: AddCustomer,
    isHeader: true,
    gestureEnabled: true,
  },
  Home: {
    screen: HomeScreen,
    isHeader: true,
    gestureEnabled: true,
  },
  Sales: {
    screen: Sales,
    isHeader: true,
    gestureEnabled: true,
  },

  List: {
    screen: List,
    isHeader: true,
    gestureEnabled: true,
  },

};

// Define interface for navigation routes based on Screens mapping
export type RootStackParamList = {
  [key in keyof typeof Screens]: undefined;
};



const Stack = createStackNavigator<RootStackParamList>();

const NavigationStack: React.FC = () => {
  const loginSelector = useAppSelector(state => state.userSlice.user);
  
  const validateLogin = async () => {
    const loginInfo = loginSelector;
    if (loginInfo.phone && loginInfo.userCode) {
      return loginInfo;

    }

  }
  React.useLayoutEffect(() => {
   
    // logoutUserGlobalFunction();
    validateLogin();
  }, [loginSelector])
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
                gestureEnabled: component.gestureEnabled,
                headerShown: component.isHeader,

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
