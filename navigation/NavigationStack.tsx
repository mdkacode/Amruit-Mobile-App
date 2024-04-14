import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddProduct from '../screens/Home/Home.index';
import LoginScreen from '../screens/Login/Login.index';
import ProdcutList from '../screens/ProductList/ProductList.index';
import Customer from '../screens/Customer/Customer.index';
import AddCustomer from '../screens/Customer/NewCustomer.index';
import Sales from '../screens/Sales/Sales.index';
import { useAppSelector } from '../Store/store.index';
import GarageDetails from '../screens/GarageDetails/GarageDetails';
;
// Define mapping object for screens
const Screens = {
  Login: {
    screen: LoginScreen,
    isHeader: false,
    gestureEnabled: false,
  },
  AddProduct:{
    screen: AddProduct,
    isHeader: true,
    gestureEnabled: true, 
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
    screen: Customer,
    isHeader: true,
    gestureEnabled: true,
  },
  Sales: {
    screen: Sales,
    isHeader: true,
    gestureEnabled: false,
  },

  List: {
    screen: ProdcutList,
    isHeader: true,
    gestureEnabled: false,
  },
  GarageDetails: {
    screen: GarageDetails,
    isHeader: true,
    gestureEnabled: false,
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
