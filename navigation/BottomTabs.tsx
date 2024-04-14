import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Customer from '../screens/Customer/Customer.index';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();


const Home = () => {

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}
function BottomTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            {/* <Tab.Screen name="Settings" component={Customer} /> */}
        </Tab.Navigator>
    );
}


export default BottomTabs;