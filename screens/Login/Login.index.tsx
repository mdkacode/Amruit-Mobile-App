import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TextInput } from 'react-native';
import TextBox from '../../compoents/Atoms/Textbox/TextBox';
import Button from '../../compoents/Atoms/Buttons/Button';
import fontFamily from '../../constants/fontFamily';

const LoginScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [userDetails, setUserDetails] = React.useState({
        userName: '',
        password: ''
    });

    return (<View style={styles.container}>
        <View style={styles.card}>
            <Image source={require('../../assets/icons/wrench.png')} style={{ width: 20, height: 20 }} />
            <Text 
            style={{ fontSize: 35, fontWeight: 'bold', color: 'black',textTransform:'uppercase',fontFamily:fontFamily.regular.fontFamily }}>सारथी</Text>
        <TextBox
            onChange={(text) => setUserDetails({ ...userDetails, userName: text })}
            placeholder='Enter Phone Number'
            icon='smartphone'
            maxLength={10}
            autoComplete='tel'
            autoFocus={true}
            value='' />
        <TextBox
            placeholder='Enter Pin'
            maxLength={4}
            autoComplete='one-time-code'
            onChange={(text) => setUserDetails({ ...userDetails, password: text })}
            fontSize={18}
            icon='lock'
            value='' />

        <Button width={'full'} buttonColor='black' fontColor='white' onPress={() => console.log(userDetails)} title='Login' />   
        </View> 
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding:5
    },
    card:{
        width: '100%',
        gap: 20,
     
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        margin: 10,
        elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    }
});

export default LoginScreen;