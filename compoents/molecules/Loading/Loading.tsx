import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';
import AppStyles from '../../../genericStles/AppStyles';
import { useAppSelector } from '../../../Store/store.index';

const LoadingComponent: React.FC = () => {

    const isLoading = useAppSelector((state) => state.loading.isLoading);
    return (
        isLoading ? <View key={'loadingMainView'} style={styles.container}>
            <Text key={'loadingViewText'} style={[AppStyles.textSemibold, { fontSize: 30, color: 'white', marginBottom: 30 }]}>Please Wait...</Text>
            <ActivityIndicator key={'loadingViewIndicator'} size="large" color="#fff" />
        </View> : <></>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
});

export default LoadingComponent;