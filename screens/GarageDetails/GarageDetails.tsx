import React, { useEffect } from 'react';
import { BackHandler, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../Store/store.index';
import { IGarage, useGetGarageQuery, useUpdateGarageMutation } from '../../Store/Api/garageApi';
import CardComponent from '../../compoents/molecules/Cards/CardBasic';
import AppStyles from '../../genericStles/AppStyles';
import fontFamily from '../../constants/fontFamily';
import TextBox from '../../compoents/Atoms/Textbox/TextBox';
import Button from '../../compoents/Atoms/Buttons/Button';
import { disableLoading, enableLoading } from '../../Store/Slices/loading.slice';
import { useIsFocused } from '@react-navigation/native';
import { logoutUserGlobalFunction } from '../../utils/authUtils';


const GarageDetails = () => {

    const userSelector = useAppSelector((state) => state.userSlice);
    const isFocused = useIsFocused();
    const dispatcher = useAppDispatch();
    const [userPhoneNumber, setUserPhoneNumber] = React.useState<string>('');
    const { data, isError, isFetching, isLoading, isSuccess, refetch } = useGetGarageQuery(userPhoneNumber);
    const [updateGarageData, { isLoading: editIsLoading, isSuccess: editIsSuccess, isError: iseditError }] = useUpdateGarageMutation();
    const [editGarage, setEditGarage] = React.useState<IGarage>({
        garageOwner: '',
        address: '',
        contactNumber: '',
        ownerPhoneNumber: '',
        garageName: '',
        isPaid: false,
        isMessageEnabled: false,
        icon: '',
        createAt: '',
        updatedAt: '',
        id: 0
    });


    useEffect(() => {
        if (isFocused) refetch();
    }, [isFocused]);


    useEffect(() => {
        if (userSelector.user?.phone && userPhoneNumber === '') {
            setUserPhoneNumber(userSelector.user?.phone)
        }
    }, [userSelector.user?.phone]);


    useEffect(() => {
        if (data) {
            setEditGarage(data);
        }
    }, [data]);

    useEffect(() => {

        if (isFetching || isLoading || editIsLoading) {
            dispatcher(enableLoading());
        }
        if (isSuccess || isError || iseditError || editIsSuccess) {
            dispatcher(disableLoading())
        }

    }, [isError, isFetching, isLoading, isSuccess, iseditError, editIsLoading, editIsSuccess])

    return (
        <>
            <View style={[AppStyles.cardStyle]}>
                <View style={{ display: 'flex', gap: 5, padding: 10 }}>
                    <Text style={[fontFamily.bold, fontFamily.largeFont, { textTransform: "uppercase",fontSize:35 }]}>{editGarage?.garageName}</Text>
                    <Text style={[fontFamily.semibold, fontFamily.mediumFont]}>ADDRESS: {editGarage?.address}</Text>
                    <Text style={[fontFamily.semibold, fontFamily.mediumFont]}>NUMBER :{editGarage?.contactNumber}</Text>
                    <Text style={[fontFamily.semibold, fontFamily.mediumFont]}>CEO: {editGarage?.garageOwner}</Text>
                </View>
            </View>

            <View style={[AppStyles.cardStyle]}>
                <TextBox title='Garage Name' label='Garage Name' placeholder='Enter Garage Name' onChange={e => {
                    setEditGarage({ ...editGarage, garageName: e })
                }} value={editGarage?.garageName} />

                <TextBox title='Address' label='Address' placeholder='Enter Address'
                    onChange={e => {
                        setEditGarage({ ...editGarage, address: e })
                    }}
                    value={editGarage?.address} />

                <TextBox
                    onChange={e => {
                        setEditGarage({ ...editGarage, garageOwner: e })
                    }}
                    title='Founder Name' label='Founder' placeholder='Enter Founder' value={editGarage?.garageOwner} editable={false} />

                <Button buttonColor='black' fontColor='white' title='UPDATE GARAGE' onPress={() => {
                    updateGarageData(editGarage).then(res => {
                        refetch();
                    })

                }} />

            </View>

            <View style={{ marginTop: 10 }}>

                <Button buttonColor='red' title='Logout' fontColor='white'
                    onPress={() => {
                        logoutUserGlobalFunction()
                        BackHandler.exitApp();
                    }}></Button>

            </View>

        </>
    )
}

export default GarageDetails;