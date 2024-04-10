import React, { useEffect } from "react"
import { Dimensions, TouchableOpacity, View } from "react-native"
import AppStyles from "../../genericStles/AppStyles"
import { images } from "../../utils/AppConstants"
import ImageDisplay from "../Atoms/ImageDisplay/imageDisplay"

import { RootStackParamList } from "../../navigation/NavigationStack"

import {  useNavigation } from "@react-navigation/native"
import { logoutUserGlobalFunction, validateUserGlobalFunction } from "../../utils/authUtils"
import { useAppSelector } from "../../Store/store.index"

interface BottomTabsProps {

    showTabs?: boolean;
}

const BottomTabs:React.FC<BottomTabsProps> = (props) => {

    let {showTabs} = props;
    const appSelector = useAppSelector(state => state.userSlice.user);
    const navigation = useNavigation();
    const navigationToScreen = (screenName: keyof RootStackParamList) => {
        //@ts-ignore
        navigation.navigate(screenName);
    }
    return showTabs && <View style={{
        display:  "flex",
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        height: 80,
        
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        elevation: 10,
    }}>
        <TouchableOpacity onPress={() => navigationToScreen('Home')} style={AppStyles.bottomNavigation}>
            <ImageDisplay borderColor='white' source={images.home} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigationToScreen('Sales')} style={AppStyles.bottomNavigation}>
            <ImageDisplay borderColor='white' source={images.graph} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigationToScreen('List')} style={AppStyles.bottomNavigation}>
            <ImageDisplay borderColor='white' source={images.user} />
        </TouchableOpacity>
    </View> 
}

export default BottomTabs;