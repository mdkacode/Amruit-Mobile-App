import React, { useEffect } from 'react';
import { Dimensions, Switch, Text, View } from 'react-native';
import AppStyles from '../../genericStles/AppStyles';
import Button from '../../compoents/Atoms/Buttons/Button';
import TextBox from '../../compoents/Atoms/Textbox/TextBox';
import Dropdown from '../../compoents/Atoms/Dropdown/dropdown';
import DatePicker from '../../compoents/Atoms/DatePicker/datePicker';
import { useGetProductListQuery, useGetSearchCarQuery } from '../../Store/Api/searchApi';
import { useAddCustomerMutation, useUpdateCustomerMutation } from '../../Store/Api/customerApi';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppDispatch } from '../../Store/store.index';
import { disableLoading, enableLoading } from '../../Store/Slices/loading.slice';
import { rupeeSym } from '../../utils/AppConstants';
import fontFamily from '../../constants/fontFamily';

const placeHolder = [{
    label: "Select Service", value: '-', subLabel: 'Select what needs to be done',
    key: 'Select Service',
    image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
}]
const AddCustomer = ({ navigation, route }) => {
    const dispatch = useAppDispatch();
    const existingUser = route?.params;
    const existingUserOrders = existingUser?.order || [];

    const [createFormData, setCreateFormData] = React.useState({
        id: existingUserOrders?.id,
        customerNumber: existingUserOrders?.customerNumber || '',
        serviceType: 'periodic',
        carKilometer: existingUserOrders?.carKilometer?.toString() || 0,
        carNumber: existingUserOrders?.carNumber || '',
        serviceName: existingUserOrders?.serviceName || '',
        car: existingUserOrders.car || placeHolder[0],
        serviceDate: new Date(),
        estimatedCost: existingUserOrders?.estimatedCost || 0,
        isCompleted: existingUserOrders?.isCompleted || false,
        
        productUsed: existingUser?.products || placeHolder,
        garageNumber: '9839284651'
    })

    const { data: searchCarData, error: searchCarError, isLoading: searchCarIsLoading } = useGetSearchCarQuery('mar')
    const { data: productListData, error: productListError, isLoading: productListIsLoading } = useGetProductListQuery('9839284651');
    const [addNewUser, { data, isError, isLoading, isSuccess }] = useAddCustomerMutation();
    const [updatedUser, { data: updateData, isError: updateIsError, isLoading: updateIsLoading, isSuccess: updateIsSuccess }] = useUpdateCustomerMutation();

    useEffect(() => {
        if (isLoading) {
            dispatch(enableLoading());
        }
        if (!isLoading) {
            dispatch(disableLoading());
        }
        if (isSuccess) {
            navigation.goBack()
        }
    }, [isLoading, updateIsLoading, updateIsSuccess, isSuccess])




    const saveCustomer = () => {
        let cloneProduct: any = JSON.stringify(createFormData);
        cloneProduct = JSON.parse(cloneProduct);

        cloneProduct.car = createFormData?.car['id'] || -1;

        if (typeof createFormData?.productUsed[0] === 'number') {
            cloneProduct.productUsed = createFormData?.productUsed || -1;
        }
        else {
            delete cloneProduct.productUsed;
        }
        // return
        if (existingUserOrders?.customerNumber) {
            updatedUser(cloneProduct).then((res) => {
                navigation.goBack();
            })
        }
        else {
            addNewUser(cloneProduct).then((res) => {
                navigation.goBack();
            })
        }

    }

    let totalAmount = 0;

    return (
        <ScrollView>
            <View style={AppStyles.cardStyle} >
                <TextBox
                    value={createFormData.serviceName} onChange={e => setCreateFormData({
                        ...createFormData,
                        serviceName: e,
                    })} label="Name" placeholder="Customer Name" />
                <TextBox value={createFormData.customerNumber} onChange={e => setCreateFormData({
                    ...createFormData,
                    customerNumber: e,
                })}
                    label="Phone" maxLength={10}
                    keyboardType='number-pad'
                    placeholder="Phone Number" />
                {createFormData?.car?.label && <Dropdown options={searchCarData} key={createFormData?.car?.label} onSelect={(e) => setCreateFormData({

                    ...createFormData,
                    //@ts-ignore
                    car: e,
                })} placeHolder={createFormData.car} />}


                <TextBox value={createFormData?.carKilometer || ''} onChange={e => setCreateFormData({
                    ...createFormData,
                    carKilometer: e,
                })}
                    label="Car Kilometer" keyboardType='number-pad' placeholder="Car Kilometer" />


                <TextBox value={createFormData?.carNumber || ''} onChange={e => setCreateFormData({
                    ...createFormData,
                    carNumber: e,
                })}
                    label="Car Number" keyboardType='default' placeholder="Car Number" />



                <DatePicker value={createFormData?.serviceDate || new Date()} mode='date'
                    onChange={(selectedDate) => {
                        
                        setCreateFormData({
                            ...createFormData,
                            serviceDate: selectedDate,
                        })
                    }} label="Delivery Date" />

                {createFormData?.productUsed?.length > 0 ? <ScrollView style={{ borderWidth: 1, padding: 8, borderRadius: 10, backgroundColor: '#000', display: "flex" }}>
                    {createFormData.productUsed.length > 0 && <Text style={[AppStyles.textSemibold, { fontSize: 16, color: 'white', textTransform: "uppercase" }]}>Product Used</Text>}
                    <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {createFormData.productUsed.length > 0 && createFormData.productUsed.map((e, index) => {
                            return <View key={`${index}-productUsed`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', margin: 5 }}>
                                <Text style={[AppStyles.textLight, { fontSize: 16, color: 'white' }]}>{e.label}</Text>
                                <Text style={[AppStyles.textLight, { fontSize: 16, color: 'white' }]}>{typeof e?.subLabel == 'number' ? `${rupeeSym} ${e?.subLabel}` : ''}</Text>
                            </View>
                        })}
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginVertical: 10 }} />
                        <View style={[{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', margin: 5 }]}>
                            <Text style={[fontFamily.bold, { color: "white" }]}>Total</Text>
                            <Text style={[fontFamily.bold, { color: "white" }]}>{rupeeSym} {createFormData?.productUsed.length > 0 ? createFormData?.productUsed?.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue?.subLabel), totalAmount) : ''}</Text>
                        </View>
                    </View>
                </ScrollView> : <></>}
                <Dropdown multiSelect={true} options={productListData} onSelect={(e) => setCreateFormData({

                    ...createFormData,
                    //@ts-ignore
                    productUsed: e?.length > 0 ? [...e?.map((e: any) => e.id)] : [e.id],
                })} placeHolder={createFormData?.productUsed[0] || placeHolder[0]} key={'DropDOwn'} />



               

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                    <Text>Completed</Text>
                    <Switch value={createFormData.isCompleted} onValueChange={(e) => setCreateFormData({
                        ...createFormData,
                        isCompleted: e,
                    })} />
                </View>




                <Button disabled={!createFormData.serviceName || createFormData.customerNumber.length != 10} title="Save" onPress={() => saveCustomer()} />

            </View>
        </ScrollView>
    );
}



export default AddCustomer;