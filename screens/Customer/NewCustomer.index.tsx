import React, { useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import AppStyles from '../../genericStles/AppStyles';
import Button from '../../compoents/Atoms/Buttons/Button';
import TextBox from '../../compoents/Atoms/Textbox/TextBox';
import Dropdown from '../../compoents/Atoms/Dropdown/dropdown';
import DatePicker from '../../compoents/Atoms/DatePicker/datePicker';


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
                <Dropdown options={[
                    { label: 'Toyota Camry', value: 'Toyota Camry', image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/GLA-2024/9731/1679039244149/front-left-side-47.jpg?tr=w-420', subLabel: 'Luxury sedan' },
                    { label: 'Honda Accord', value: 'Honda Accord', image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/GLA-2024/9731/1679039244149/front-left-side-47.jpg?tr=w-420', subLabel: 'Reliable sedan' },
                    { label: 'Nissan Altima', value: 'Nissan Altima', image: 'https://images.hgmsites.net/hug/nissan-altima_100686444_h.jpg', subLabel: 'Efficient sedan' },
                    { label: 'Ford F-150', value: 'Ford F-150', image: 'https://images.hgmsites.net/hug/ford-f-150_100680330_h.jpg', subLabel: 'Powerful pickup truck' },
                    { label: 'Chevrolet Silverado', value: 'Chevrolet Silverado', image: 'https://images.hgmsites.net/hug/chevrolet-silverado-1500_100688885_h.jpg', subLabel: 'Durable pickup truck' },

                ]} placeHolder={selectedItem} />
                <DatePicker value={new Date()} mode='date'
                    onChange={(e) => console.log(e)} label="Delivery Date" />
                <Dropdown options={[
                    { label: 'Toyota Camry', value: 'Toyota Camry', image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/GLA-2024/9731/1679039244149/front-left-side-47.jpg?tr=w-420', subLabel: 'Luxury sedan' },
                    { label: 'Honda Accord', value: 'Honda Accord', image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/GLA-2024/9731/1679039244149/front-left-side-47.jpg?tr=w-420', subLabel: 'Reliable sedan' },
                    { label: 'Nissan Altima', value: 'Nissan Altima', image: 'https://images.hgmsites.net/hug/nissan-altima_100686444_h.jpg', subLabel: 'Efficient sedan' },
                    { label: 'Ford F-150', value: 'Ford F-150', image: 'https://images.hgmsites.net/hug/ford-f-150_100680330_h.jpg', subLabel: 'Powerful pickup truck' },
                    { label: 'Chevrolet Silverado', value: 'Chevrolet Silverado', image: 'https://images.hgmsites.net/hug/chevrolet-silverado-1500_100688885_h.jpg', subLabel: 'Durable pickup truck' },

                ]} placeHolder={selectService} />

                <Button title="Save" onPress={() => console.log('Save')} />
            </View>
        </View>
    );
}



export default AddCustomer;