import React, { useEffect } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AppStyles from '../../genericStles/AppStyles';
import ImageDisplay from '../../compoents/Atoms/ImageDisplay/imageDisplay';
import useColorFromPallate from '../../hooks/useColorFromPallate';
import fontFamily from '../../constants/fontFamily';
import Button from '../../compoents/Atoms/Buttons/Button';
import { logoutUserGlobalFunction } from '../../utils/authUtils';
import {  useAppDispatch, useAppSelector } from '../../Store/store.index';
import { setUser } from '../../Store/Slices/user.slice';


const Customer = ({ navigation, route }) => {


    const selector = useAppSelector(state=> state.userSlice.user);
    const dispatch = useAppDispatch();
    React.useLayoutEffect(() => {
        dispatch(setUser({ user: { ...selector }, isLoggedIn: true }));
        navigation.setOptions({
          headerLeft: null,
        });
      }, [navigation]);

      
    const HeaderComponent = () => {

        return <View style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            flexGrow: 1,
            width: Dimensions.get('window').width - 20,
            paddingLeft: 10,
            paddingRight: 10,

            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Text style={[AppStyles.textSemibold, { textTransform: 'uppercase' }]}>Customers List</Text>
            <Button title="+ Add Customer"
                fontColor='white'
                buttonColor='black'
                fontSize={14}
                onPress={() => navigation.push('AddCustomer')} />
        </View>
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: (e: any) => {
                return <HeaderComponent />
            }
        });
    }, []);

    return (
        <ScrollView>
            <TouchableOpacity onPress={()=>navigation.push('Add Customer')} style={AppStyles.cardStyle}  >
                <View style={{
                    position: 'absolute',
                    right: 0,
                    bottom: -10,
                    width: "auto",
                    padding: 2,
                    borderRadius: 5,
                    backgroundColor: useColorFromPallate('lightGreen')
                }}>
                    <Text style={[{ fontFamily: fontFamily.regular.fontFamily, fontSize: 12 }, { color: useColorFromPallate('white'), padding: 3 }]}>In Progress</Text>
                </View>
                <View style={AppStyles.cardContent}>
                    <View style={{ display: 'flex', flexDirection: "row", gap: 10 }}>
                        <ImageDisplay rounded height={30} width={30} borderColor='#fff' source="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
                        <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <Text style={AppStyles.textBold}>Mayank Dwivedi</Text>
                            <Text style={AppStyles.textLight}>Alto LXI (P)</Text>
                            <Text style={AppStyles.textRegular}>Deliver by 9:00PM</Text>
                        </View>
                    </View>
                    <View>

                        <Button title="CALL" fontColor='white' buttonColor='black' fontSize={12} onPress={() => console.log('foofol')} />

                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.push('Add Customer')} style={AppStyles.cardStyle} >
                <View style={{
                    position: 'absolute',
                    right: 0,
                    bottom: -10,
                    width: "auto",
                    padding: 2,
                    borderRadius: 5,
                    backgroundColor: useColorFromPallate('lightGreen')
                }}>
                    <Text style={[{ fontFamily: fontFamily.regular.fontFamily, fontSize: 12 }, { color: useColorFromPallate('white'), padding: 3 }]}>In Progress</Text>
                </View>
                <View style={AppStyles.cardContent}>
                    <View style={{ display: 'flex', flexDirection: "row", gap: 10 }}>
                        <ImageDisplay rounded height={30} width={30} borderColor='#fff' source="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
                        <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <Text style={AppStyles.textBold}>Mayank Dwivedi</Text>
                            <Text style={AppStyles.textLight}>Alto LXI (P)</Text>
                            <Text style={AppStyles.textRegular}>Deliver by 9:00PM</Text>
                        </View>
                    </View>
                    <View>

                        <Button title="CALL" fontColor='white' buttonColor='black' fontSize={12} onPress={() => console.log('foofol')} />

                    </View>
                </View>
            </TouchableOpacity>
            
        </ScrollView>
    );
}



export default Customer;