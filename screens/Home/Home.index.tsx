import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Keyboard, Dimensions, View } from 'react-native';
import TextBox from '../../compoents/Atoms/Textbox/TextBox';
import { ScrollView } from 'react-native-gesture-handler';
import BarcodeScannerWithInput from '../../compoents/molecules/BarcodeScannerWithInput/BarcodeScannerWithInput';
import Dropdown from '../../compoents/Atoms/Dropdown/dropdown';
import DatePicker from '../../compoents/Atoms/DatePicker/datePicker';
import Button from '../../compoents/Atoms/Buttons/Button';
import { useGetSearchCarQuery } from '../../Store/Api/searchApi';
import { singleProductInterface, useAddProductMutation, useUpdateProductMutation } from '../../Store/Api/productApi';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../Store/store.index';
import { disableLoading, enableLoading } from '../../Store/Slices/loading.slice';

const AddProduct: React.FC<{ children: React.ReactNode }> = () => {
    const userSelector = useAppSelector(state=> state.userSlice.user.phone);
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const [addProduct, setAddProduct] = React.useState<singleProductInterface | any>(route?.params ? { ...route.params } : {
        id: 0,
        productName: '',
        car: 
            {
                label: "Select Car", value: '-', subLabel: 'Select a car',
                key: 'Select Car',
                image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
            },
        qty: 1000,
    })

    const [addProductApi, { isError, isLoading, isSuccess }] = useAddProductMutation();
    const [updateProductApi, { isError:updateProductIsError, isLoading:updateProductIsLoading, isSuccess:updateProductIsSuccess }] = useUpdateProductMutation();
    const { data } = useGetSearchCarQuery(userSelector);

    console.log(data, 'data-carList')
    const onselect = (e: any) => {
        setAddProduct({ ...addProduct, car: e });
    }
    const onScanValue = (e: string) => {
        setAddProduct({ ...addProduct, scannedValue: e });
    }

    const saveProduct = () => {
        addProduct.expiryDate = moment(addProduct.expiryDate).format('YYYY-MM-DD');
        addProduct.createdBy = userSelector;
        addProduct.garageContactNumber = userSelector;
        if(addProduct?.car?.id) addProduct.car = addProduct?.car?.id;
       
        if(route?.params) updateProductApi(addProduct);
        else addProductApi(addProduct);
        
    }

    useEffect(()=>{
        if(isLoading || updateProductIsLoading) {
            dispatch(enableLoading())
        }
        if(isSuccess || updateProductIsSuccess){
            dispatch(disableLoading());
            navigation.goBack();
        }
        if(isError || updateProductIsError){
            dispatch(disableLoading());
            alert('Failed to delete product');
        }

    },[isSuccess,isError,isLoading,updateProductIsLoading,updateProductIsError])


    useEffect(() => {
        data?.filter(e => e.label.includes(route?.params?.car)).map(e => {
            setAddProduct({ ...addProduct, car: e });
        })
    }, [route?.params?.car]);


    // const { data } = useGetSearchCarQuery('9839284651');
    return <>
        <ScrollView scrollEventThrottle={16} style={styles.container} onScroll={() => Keyboard.dismiss()}>
            <TextBox icon='card'
                value={addProduct?.productName}
                onChange={(e) => setAddProduct({ ...addProduct, productName: e })}
                placeholder='Product Name' />
            <Dropdown key={"Dropdown"} options={data} onSelect={(e) => { onselect(e) }}
                placeHolder={addProduct.car}
            />
            <TextBox placeholder='Quantity'
                value={addProduct?.qty?.toString()}
                onChange={(e) => setAddProduct({ ...addProduct, qty: parseInt(e) })}
                keyboardType='numeric' maxLength={5000} icon='count' />

            <TextBox
                value={addProduct?.purchasePrice?.toString()}
                onChange={(e) => setAddProduct({ ...addProduct, purchasePrice: parseInt(e) })}
                placeholder='Purhase Price' keyboardType='numeric' icon='rupee' />
            <TextBox
                value={addProduct?.mrp?.toString()}
                onChange={(e) => setAddProduct({ ...addProduct, mrp: parseInt(e) })}
                placeholder='MRP' keyboardType='numeric' icon='rupee' />

            <TextBox
                value={addProduct?.sellingPrice?.toString()}
                onChange={(e) => setAddProduct({ ...addProduct, sellingPrice: parseInt(e) })}
                placeholder='SP' keyboardType='numeric' icon='rupee' />

            <TextBox
                value={addProduct?.flatDiscount?.toString()}
                onChange={(e) => setAddProduct({ ...addProduct, flatDiscount: parseInt(e) })}
                placeholder='Discount' keyboardType='numeric' icon='rupee' />

            <TextBox
                value={addProduct?.gst?.toString()}
                onChange={(e) => setAddProduct({ ...addProduct, gst: parseInt(e) })}
                placeholder='GST' keyboardType='numeric' icon='percentage' />
            {/* <DatePicker mode='date'
                onChange={(e) => setAddProduct({ ...addProduct, expiryDate: e.toISOString() })}
                value={new Date()}
                label='Expiry' /> */}
            <BarcodeScannerWithInput

                onScanValue={onScanValue} />

            <Button title='Save' buttonColor={'black'} icon='barcode' fontColor='white' onPress={() => saveProduct()} />
        </ScrollView>
    </>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('screen').height,
       
      
    },
});

export default AddProduct;