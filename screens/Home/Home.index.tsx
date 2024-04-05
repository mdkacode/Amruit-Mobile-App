import React from 'react';
import { View, StyleSheet } from 'react-native';

const HomeScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default HomeScreen;