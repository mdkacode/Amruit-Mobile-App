import React, { memo, useEffect, useLayoutEffect } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View, Linking } from 'react-native';
import AppStyles from '../../genericStles/AppStyles';
import ImageDisplay from '../../compoents/Atoms/ImageDisplay/imageDisplay';
import useColorFromPallate from '../../hooks/useColorFromPallate';
import fontFamily from '../../constants/fontFamily';
import Button from '../../compoents/Atoms/Buttons/Button';
import { logoutUserGlobalFunction } from '../../utils/authUtils';
import { useAppDispatch, useAppSelector } from '../../Store/store.index';
import { setUser } from '../../Store/Slices/user.slice';
import { useGetCustomerListQuery } from '../../Store/Api/customerApi';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { disableLoading, enableLoading } from '../../Store/Slices/loading.slice';
import moment from 'moment';
import { rupeeSym } from '../../utils/AppConstants';


const Customer = ({ navigation, route }) => {


    const selector = useAppSelector(state => state.userSlice.user);
    const isFocused = useIsFocused();
    const { data, isError, isFetching, isLoading, refetch } = useGetCustomerListQuery('9839284651');
    const dispatch = useAppDispatch();


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

    const makeCall = (phoneNumber: string) => {
        Linking.openURL(`tel:${phoneNumber}`).then((res) => { }).catch((err) => {
            alert('Failed to make call')
        })
    }

    useFocusEffect(
        React.useCallback(() => {

            if (isFocused) {
                dispatch(setUser({ user: { ...selector }, isLoggedIn: true }));
                navigation.setOptions({
                    headerLeft: null,
                });
                navigation.setOptions({
                    headerTitle: (e: any) => {
                        return <HeaderComponent />
                    }
                });
                refetch();
            }
            return () => {
                if (!isFocused) {
                    // Do something when the screen is unfocused
                }
            };
        }, [isFocused])
    );

    useEffect(() => {
        if (isLoading) {
            dispatch(enableLoading());
        }
        if (!isLoading) {
            dispatch(disableLoading());
        }
    }, [isLoading])

    const markStatus = (index: number, status: boolean) => {
        let defaultColor: 'green' | 'red' = !status ? 'red' : 'green';
        let defaultText: "In Progress" | "Completed" = !status ? 'In Progress' : "Completed";
        return <View key={`${index}-CardView`} style={{
            position: 'absolute',
            right: 0,
            bottom: -10,
            width: "auto",
            padding: 2,
            borderRadius: 5,
            backgroundColor: defaultColor
        }}>
            <Text key={`${index}-textStatus`}
                style={[{ fontFamily: fontFamily.regular.fontFamily, fontSize: 12 }, { color: ('white'), padding: 3 }]}>{defaultText}</Text>
        </View>
    }

    return (
        <ScrollView key="customerScrollView">
            {data && data.length == 0 && <View key="customerView" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height - 100 }}>
                <Text key="noCustumerText" style={[AppStyles.textSemibold, { fontSize: 16 }]}>No Customers Found</Text>
                <Button key="logoutBtn" title="Logout" fontColor='white' buttonColor='black' fontSize={14} onPress={() => logoutUserGlobalFunction()} />
            </View>}
            {data?.length > 0 && data?.map((e, index) => {
                const { customerNumber, car, serviceDate, serviceName, estimatedCost, isCompleted, productUsed, garageNumber, serviceType,totalPrice,createdAt } = e.order;
                return <TouchableOpacity key={`${index}-touchableOpacity`} onPress={() => navigation.push('AddCustomer',e.order)} style={AppStyles.cardStyle}  >
                    {markStatus(index, isCompleted)}
                    <View key={`${index}-carDetails`} style={AppStyles.cardContent}>

                        <View key={`${index}-flex-View`} style={{ display: 'flex', flexDirection: "row", gap: 10 }}>
                            <ImageDisplay key={`${index}-car-image`} rounded height={30} width={30} borderColor='#fff' source="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />

                            <View key={`${index}-carDetail-view`} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                <Text key={`${index}-${serviceName || ''}-carOwnerName-view`} style={AppStyles.textBold}>{serviceName}</Text>
                                <Text key={`${index}carName-view`} style={AppStyles.textLight}>{car} | {serviceType}</Text>
                                <Text key={`${index}-PickupCarTime`} style={AppStyles.textLight}>Started - {moment(createdAt).format("DD-MM-YY")}</Text>
                                <Text key={`${index}-PickupCarTimeDeliver`} style={AppStyles.textRegular}>Deliver-   {moment(serviceDate).format("DD-MM-YY")}</Text>
                                <Text key={`${index}-PickupAmount`} style={AppStyles.textSemibold}>Amount: {rupeeSym}{e.totalPrice}</Text>
                            </View>

                        </View>

                        <View>

                            <Button title="CALL" fontColor='white' buttonColor='black' fontSize={12} onPress={() => makeCall(customerNumber)} />

                        </View>

                    </View>
                </TouchableOpacity>
            })
            }

        </ScrollView>
    );
}



export default memo(Customer, (prevProps, nextProps) => {
    return prevProps === nextProps;
});