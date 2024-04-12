import React, { useEffect } from 'react';
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import AppStyles from '../../../genericStles/AppStyles';
import { useAppDispatch, useAppSelector } from '../../../Store/store.index';
import { hideAlert } from '../../../Store/Slices/alertSlice';

interface AlertMessageProps {
    message: string;
}
const AlertMessageComponent: React.FC<AlertMessageProps> = (props) => {

    const selector = useAppSelector((state) => state.alert.message);
    const dispatch = useAppDispatch();
    let {message = selector } = props;
    const height = useSharedValue(0);
    const opacity = useSharedValue(1);

    useEffect(() => {
        height.value = 0;
        height.value = withSpring(height.value + 1);
        setTimeout(() => {
            height.value = withSpring(50);
        }, 0);

        opacity.value = withTiming(0, { duration: 3000 });

    // Cleanup: Reset opacity to 1 after animation completes
    setTimeout(() => {
       
        opacity.value = withTiming(0);
        dispatch(hideAlert());  
     
    }, 4000);

    }, [JSON.stringify(message)]);
    return (
        message && <Animated.View key={new Date().getTime()} style={[style.alert, { height: height,opacity }]}>
            <View style={style.alertView}>
                <Text style={[AppStyles.textBold, { color: 'white', textAlign: 'center' }]}>{message}</Text>
            </View>
        </Animated.View>
    );
};


const style = StyleSheet.create({
    alert: {
        position: 'absolute',
        display: 'flex',
        top: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 100,
        width: Dimensions.get('screen').width,

    },
    alertView: {
        backgroundColor: '#000',
        width: '90%',
        borderRadius: 30,
        elevation: 10,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default AlertMessageComponent;