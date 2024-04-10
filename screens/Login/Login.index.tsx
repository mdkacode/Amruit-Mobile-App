import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TextInput } from 'react-native';
import TextBox from '../../compoents/Atoms/Textbox/TextBox';
import Button from '../../compoents/Atoms/Buttons/Button';
import fontFamily from '../../constants/fontFamily';
import { useAppDispatch } from '../../Store/store.index';
import { useLoginMutation, userAuthApi } from '../../Store/Api/userAuth';
import { disableLoading, enableLoading } from '../../Store/Slices/loading.slice';
import { showAlert } from '../../Store/Slices/alertSlice';
import { getData, storeData } from '../../utils/localStorage';
import { NavigationAction, useNavigation } from '@react-navigation/native';
import HomeScreen from '../Home/Home.index';
import { logoutUserGlobalFunction, validateUserGlobalFunction } from '../../utils/authUtils';
import { clearUser, setUser } from '../../Store/Slices/user.slice';

const LoginScreen: React.FC<{ navigate: any, children: React.ReactNode }> = ({ children }) => {


    const dispatch = useAppDispatch();
    const navigate = useNavigation();
    const [loginInfoState, setLoginInfoState] = React.useState({ phone: '', userCode: '', userName: '', type: '' })
    const [userDetails, setUserDetails] = React.useState({
        userName: '',
        password: ''
    });

    let [validateUser, { data, isLoading }] = useLoginMutation();



    const validateUserOnLoad = async () => {
        let loginInfo = await validateUserGlobalFunction();
        if (loginInfo) {
            dispatch(setUser({ user: { ...loginInfo }, isLoggedIn: true }));
            setLoginInfoState(loginInfo);
            //@ts-ignore
            navigate.navigate('Customer');
        } else {
            dispatch(clearUser());
            //@ts-ignore
            navigate.navigate('Login');
        }
    }

    React.useEffect(() => {
        // logoutUserGlobalFunction();
        validateUserOnLoad();
    }, [])


    const validateUserFunction = async ({ password, userName }) => {
        
        dispatch(enableLoading());
        validateUser({ phone: userName, userCode: password }).then(async (res:any) => {
           
            console.log(res?.data,"QWERTY");
            if (res.data?.phone) {
                dispatch(showAlert({ message: 'Sucess', type: 'alert' }))
                await storeData('loginInfo', res.data);
                //@ts-ignore
                navigate.navigate('Customer');
                
            }
            dispatch(disableLoading());
         }).catch((err) => { 
            dispatch(disableLoading());
         });
       
        // dispatch(showAlert({ message: 'Sucess', type: 'alert' }))
    }

    return (<View style={styles.container}>
        <View style={styles.card}>
            <Image source={require('../../assets/icons/wrench.png')} style={{ width: 20, height: 20 }} />
            <Text
                style={{ fontSize: 35, fontWeight: 'bold', color: 'black', textTransform: 'uppercase', fontFamily: fontFamily.regular.fontFamily }}>सारथी</Text>
            <TextBox
                onChange={(text) => setUserDetails({ ...userDetails, userName: text })}
                placeholder='Enter Phone Number'
                icon='smartphone'
                maxLength={10}
                autoComplete='tel'
                autoFocus={true}
                label='Phone Number'
                value='' />
            <TextBox
                placeholder='Enter 4 digit Pin'
                maxLength={4}
                label='4 digit Pin'
                autoComplete='one-time-code'
                onChange={(text) => setUserDetails({ ...userDetails, password: text })}
                fontSize={18}
                icon='lock'
                value='' />

            <Button width={'full'} buttonColor='black' fontColor='white' onPress={() => validateUserFunction(userDetails)} title='Login' />
        </View>
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    card: {
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