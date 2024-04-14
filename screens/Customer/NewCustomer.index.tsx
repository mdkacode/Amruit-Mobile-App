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
import { useAppDispatch, useAppSelector } from '../../Store/store.index';
import { disableLoading, enableLoading } from '../../Store/Slices/loading.slice';
import { rupeeSym } from '../../utils/AppConstants';
import fontFamily from '../../constants/fontFamily';
import  {} from 'react-native-vision-camera';
import UploadImageComponent from '../../compoents/molecules/UploadImage/UploadImage';
const placeHolder = []
const AddCustomer = ({ navigation, route }) => {
    const dispatch = useAppDispatch();
    const existingUser = route?.params;
    const userSelector = useAppSelector(state=> state.userSlice.user.phone);
    const existingUserOrders = existingUser?.order || [];
    console.log(existingUserOrders, "existingUserOrders")
    const [imagesTostore, setImagesTostore] = React.useState<string[]>([]);
    const [createFormData, setCreateFormData] = React.useState({
        id: existingUserOrders?.id,
        customerNumber: existingUserOrders?.customerNumber || '',
        serviceType: existingUserOrders?.serviceType || false,
        carKilometer: existingUserOrders?.carKilometer?.toString() || 0,
        carNumber: existingUserOrders?.carNumber || '',
        serviceName: existingUserOrders?.serviceName || '',
        car: existingUserOrders.car || placeHolder[0],
        serviceDate: new Date(),
        estimatedCost: existingUserOrders?.estimatedCost || 0,
        isCompleted: existingUserOrders?.isCompleted || false,
        productUsed: existingUser?.products || placeHolder,
        images: existingUserOrders?.images || [],
        garageNumber: userSelector
    })

    const { data: searchCarData, error: searchCarError, isLoading: searchCarIsLoading } = useGetSearchCarQuery('mar')
    const { data: productListData, error: productListError, isLoading: productListIsLoading } = useGetProductListQuery(userSelector);
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
        cloneProduct['car'] = createFormData?.car['id'] || -1;
        let previsouImages = existingUserOrders?.images || [];
        cloneProduct['images'] =  [...previsouImages,...imagesTostore || []];

        console.log(cloneProduct, "cloneProduct",[...imagesTostore])
        cloneProduct.serviceType = createFormData?.serviceType  ? 'periodic' : 'one Time';
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
        <ScrollView style={{height:1000}}>
            <View style={[AppStyles.cardStyle]} >
            <TextBox value={createFormData.customerNumber} onChange={e => setCreateFormData({
                    ...createFormData,
                    customerNumber: e,
                })}
                    label="Phone" maxLength={10}
                    keyboardType='number-pad'
                    placeholder="Phone Number" />
                    
                <TextBox
                    value={createFormData.serviceName} onChange={e => setCreateFormData({
                        ...createFormData,
                        serviceName: e,
                    })} label="Name" placeholder="Customer Name" />
                
                {<Dropdown options={searchCarData} key={createFormData?.car?.label} onSelect={(e) => setCreateFormData({

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
                        console.log(selectedDate,"FFFdd");
                        setCreateFormData({
                            ...createFormData,
                            serviceDate: selectedDate,
                        })
                    }} label="Delivery Date" />

                {createFormData?.productUsed?.length > 0 && existingUserOrders?.productUsed?.length > 0 ? <ScrollView style={{ borderWidth: 1, padding: 8, borderRadius: 10, backgroundColor: '#000', display: "flex" }}>
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
                            <Text style={[fontFamily.bold, { color: "white" }]}>{rupeeSym} {createFormData?.productUsed.length > 0 ? createFormData?.productUsed?.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue?.subLabel), totalAmount) || 0 : ''}</Text>
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

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                    <Text>Periodic Service</Text>
                    <Switch    value={createFormData.serviceType} onValueChange={(e) => setCreateFormData({
                        ...createFormData,
                        serviceType: createFormData.serviceType ? false : true,
                    })} />
                </View>

                    
                <UploadImageComponent onImageListChange={(e:string)=> setImagesTostore([...imagesTostore,e])} fetchedImages={createFormData.images} />

                <Button disabled={!createFormData.serviceName || createFormData.customerNumber.length != 10} title="Save" onPress={() => saveCustomer()} />

            </View>
        </ScrollView>
    );
}



export default AddCustomer;