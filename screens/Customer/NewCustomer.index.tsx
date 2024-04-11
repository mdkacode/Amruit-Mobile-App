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


const AddCustomer = ({ navigation, route }) => {

    const existingUser = route?.params;
    const [createFormData, setCreateFormData] = React.useState({
        id: existingUser?.id,
        customerNumber: existingUser?.customerNumber || '',
        serviceType: 'periodic',
        serviceName: existingUser?.serviceName || '',
        car: {
            label: "Select Car", value: '-', subLabel: 'Select a car',
            key: 'Select Car',
            image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
        },
        serviceDate: new Date(),
        estimatedCost: '0',
        isCompleted: false,
        productUsed: [{
            label: "Select Service", value: '-', subLabel: 'Select what needs to be done',
            key: 'Select Service',
            image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
        }],
        garageNumber: '9839284651'
    })

    const { data: searchCarData, error: searchCarError, isLoading: searchCarIsLoading } = useGetSearchCarQuery('mar')
    const { data: productListData, error: productListError, isLoading: productListIsLoading } = useGetProductListQuery('9839284651');
    const [addNewUser, { data, isError, isLoading, isSuccess }] = useAddCustomerMutation();
    const [updatedUser, { data: updateData, isError: updateIsError, isLoading: updateIsLoading, isSuccess: updateIsSuccess }] = useUpdateCustomerMutation();

    const saveCustomer = () => {
        let cloneProduct: any = JSON.stringify(createFormData);
         cloneProduct = JSON.parse(cloneProduct);
        cloneProduct.car = createFormData?.car['id'] || -1;
        if(typeof createFormData?.productUsed[0] === 'number'){
            cloneProduct.productUsed = createFormData?.productUsed || -1;
        }
        else {
            delete cloneProduct.productUsed;
        }
        if (existingUser?.customerNumber) {
            console.log(cloneProduct,"ACTIVE")
            updatedUser(cloneProduct).then((res) => {
                console.log(res, "Customer Updated")
            })
        }
        else {
            addNewUser(cloneProduct).then((res) => {
                console.log(res, "Customer Added")
            })
        }

    }


    useEffect(() => {
        if (route?.params?.car && searchCarData?.length > 0) {
            const selectedCar = searchCarData.filter(e => e.label.includes(route.params.car))[0];
            const selectedServiceType = productListData.filter(e => e.label.includes(route.params.serviceType));
            console.log(selectedCar, "Selected Car", selectedServiceType, "Selected Service Type")

            const productUsedItem = route?.params?.productUsed.map(re => {
                return productListData.find(e=> e.id === re)
              })
            if (selectedCar.label) {
                setCreateFormData({
                    ...createFormData,
                    car: {
                        ...selectedCar,
                        key: selectedCar.label
                    },
                    productUsed: productUsedItem,
                    serviceDate: new Date(route.params.serviceDate),
                })
            }

        }
    }, [route?.params])
    return (
        <View>
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
                <Dropdown options={searchCarData} onSelect={(e) => setCreateFormData({

                    ...createFormData,
                    //@ts-ignore
                    car: e,
                })} placeHolder={createFormData.car} />
                <DatePicker value={createFormData.serviceDate || new Date()} mode='date'
                    onChange={(selectedDate) => {
                        console.log(data, "Date");
                        setCreateFormData({
                            ...createFormData,
                            serviceDate: selectedDate,
                        })
                    }} label="Delivery Date" />

                   
                {existingUser && createFormData?.productUsed?.length > 0  ? <ScrollView style={{ borderWidth: 1, padding: 8, borderRadius: 10, backgroundColor: '#000', display: "flex" }}>
                    {createFormData.productUsed.length > 0 && <Text style={[AppStyles.textSemibold, { fontSize: 16, color: 'white', textTransform: "uppercase" }]}>Product Used</Text>}
                    <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {createFormData.productUsed.length > 0 && createFormData.productUsed.map((e, index) => {
                            return <View key={`${index}-productUsed`} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', margin: 5 }}>
                                <Text style={[AppStyles.textLight, { fontSize: 16, color: 'white' }]}>{e.label}</Text>
                                <Text style={[AppStyles.textLight, { fontSize: 16, color: 'white' }]}>{e.subLabel}</Text>
                            </View>
                        })}
                    </View>
                </ScrollView> : <></>}
                <Dropdown multiSelect={true} options={productListData} onSelect={(e) => setCreateFormData({

                    ...createFormData,
                    //@ts-ignore
                    productUsed: e?.length > 0 ?  [...e.map((e: any) => e.id)] : [],
                })} placeHolder={createFormData.productUsed[0]} key={'DropDOwn'} />
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
                    <Text>Completed</Text>
                    <Switch value={createFormData.isCompleted}  onValueChange={(e) => setCreateFormData({
                        ...createFormData,
                        isCompleted: e,
                    })} />
                </View>
                
                <Button title="Save" onPress={() => saveCustomer()} />
            </View>
        </View>
    );
}



export default AddCustomer;