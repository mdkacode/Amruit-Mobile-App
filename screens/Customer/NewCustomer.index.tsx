import React, { useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import AppStyles from '../../genericStles/AppStyles';
import Button from '../../compoents/Atoms/Buttons/Button';
import TextBox from '../../compoents/Atoms/Textbox/TextBox';
import Dropdown from '../../compoents/Atoms/Dropdown/dropdown';
import DatePicker from '../../compoents/Atoms/DatePicker/datePicker';
import { useGetProductListQuery, useGetSearchCarQuery } from '../../Store/Api/searchApi';


const AddCustomer = ({ navigation, route }) => {

    const [selectedItem, setSelectedItem] = React.useState<any>({
        label: "Select Car", value: '-', subLabel: 'Select a car',
        key: 'Select Car',
        image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    });

    const [selectService, setSelectedService] = React.useState<any>({
        label: "Select Service", value: '-', subLabel: 'Select what needs to be done',
        key: 'Select Service',
        image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    });

    const { data: searchCarData, error: searchCarError, isLoading: searchCarIsLoading } = useGetSearchCarQuery('mar')
    const { data: productListData, error: productListError, isLoading: productListIsLoading } = useGetProductListQuery('9839284651');
    
    // useEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: (e: any) => {
    //             return <HeaderComponent />
    //         }
    //     });
    // }, []);

    return (
        <View>
            <View style={AppStyles.cardStyle} >
                <TextBox label="Name" placeholder="Customer Name" />
                <TextBox label="Phone" maxLength={10}
                    keyboardType='number-pad'
                    placeholder="Phone Number" />
                <Dropdown options={searchCarData}  onSelect={(e) => setSelectedItem(e)} placeHolder={selectedItem} />
                <DatePicker value={new Date()} mode='date'
                    onChange={(e) => console.log(e)} label="Delivery Date" />
                <Dropdown options={productListData} placeHolder={selectService} />

                <Button title="Save" onPress={() => console.log('Save')} />
            </View>
        </View>
    );
}



export default AddCustomer;