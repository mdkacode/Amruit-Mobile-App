import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import TextBox from '../../compoents/Atoms/Textbox/TextBox';
import { ScrollView } from 'react-native-gesture-handler';
import BarcodeScannerWithInput from '../../compoents/molecules/BarcodeScannerWithInput/BarcodeScannerWithInput';
import Dropdown from '../../compoents/Atoms/Dropdown/dropdown';
import DatePicker from '../../compoents/Atoms/DatePicker/datePicker';
import Button from '../../compoents/Atoms/Buttons/Button';

const HomeScreen: React.FC<{ children: React.ReactNode }> = () => {

    const [selectedItem, setSelectedItem] = React.useState<any>({
        label: "Select Car", value: '-', subLabel: 'Select a car',
        key: 'Select Car',
        image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    });
    const onselect = (e: any) => {
        setSelectedItem(e);
    }
    const onScanValue = (e: string) => {
        console.log(e, "Scanned Value");
    }
    return <SafeAreaView style={styles.container}>
        <ScrollView scrollEventThrottle={16} style={styles.container} onScroll={() => Keyboard.dismiss()}>
            <TextBox icon='card' placeholder='Product Name' />
            <Dropdown key={"Dropdown"} options={[
                { label: 'Toyota Camry', value: 'Toyota Camry', image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/GLA-2024/9731/1679039244149/front-left-side-47.jpg?tr=w-420', subLabel: 'Luxury sedan' },
                { label: 'Honda Accord', value: 'Honda Accord', image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/GLA-2024/9731/1679039244149/front-left-side-47.jpg?tr=w-420', subLabel: 'Reliable sedan' },
                { label: 'Nissan Altima', value: 'Nissan Altima', image: 'https://images.hgmsites.net/hug/nissan-altima_100686444_h.jpg', subLabel: 'Efficient sedan' },
                { label: 'Ford F-150', value: 'Ford F-150', image: 'https://images.hgmsites.net/hug/ford-f-150_100680330_h.jpg', subLabel: 'Powerful pickup truck' },
                { label: 'Chevrolet Silverado', value: 'Chevrolet Silverado', image: 'https://images.hgmsites.net/hug/chevrolet-silverado-1500_100688885_h.jpg', subLabel: 'Durable pickup truck' },
                { label: 'Ram 1500', value: 'Ram 1500', image: 'https://images.hgmsites.net/hug/ram-1500_100686891_h.jpg', subLabel: 'Versatile pickup truck' },
                { label: 'Toyota Corolla', value: 'Toyota Corolla', image: 'https://images.hgmsites.net/lrg/toyota-corolla_100659300_l.jpg', subLabel: 'Compact car' },
                { label: 'Honda Civic', value: 'Honda Civic', image: 'https://images.hgmsites.net/lrg/honda-civic_100686775_l.jpg', subLabel: 'Economical sedan' },
                { label: 'Volkswagen Jetta', value: 'Volkswagen Jetta', image: 'https://images.hgmsites.net/hug/volkswagen-jetta_100711572_h.jpg', subLabel: 'Sporty sedan' },
                { label: 'BMW 3 Series', value: 'BMW 3 Series', image: 'https://images.hgmsites.net/hug/bmw-3-series_100752095_h.jpg', subLabel: 'Luxury compact sedan' },
                { label: 'Audi A4', value: 'Audi A4', image: 'https://images.hgmsites.net/hug/audi-a4_100660184_h.jpg', subLabel: 'Premium sedan' },
                { label: 'Mercedes-Benz C-Class', value: 'Mercedes-Benz C-Class', image: 'https://images.hgmsites.net/hug/mercedes-benz-c-class_100653882_h.jpg', subLabel: 'Executive sedan' },
                { label: 'Lexus ES', value: 'Lexus ES', image: 'https://images.hgmsites.net/hug/lexus-es_100691580_h.jpg', subLabel: 'Luxury sedan' },
                { label: 'Tesla Model 3', value: 'Tesla Model 3', image: 'https://images.hgmsites.net/lrg/tesla-model-3_100690848_l.jpg', subLabel: 'Electric sedan' },
                { label: 'Ford Mustang', value: 'Ford Mustang', image: 'https://images.hgmsites.net/lrg/ford-mustang_100709111_l.jpg', subLabel: 'Iconic sports car' },
                { label: 'Chevrolet Camaro', value: 'Chevrolet Camaro', image: 'https://images.hgmsites.net/lrg/chevrolet-camaro_100689504_l.jpg', subLabel: 'Muscle car' },
                { label: 'Dodge Challenger', value: 'Dodge Challenger', image: 'https://images.hgmsites.net/lrg/dodge-challenger_100697488_l.jpg', subLabel: 'Classic American muscle' },
                { label: 'Porsche 911', value: 'Porsche 911', image: 'https://images.hgmsites.net/hug/porsche-911_100720876_h.jpg', subLabel: 'Sports car icon' },
                { label: 'Toyota RAV4', value: 'Toyota RAV4', image: 'https://images.hgmsites.net/hug/toyota-rav4_100729773_h.jpg', subLabel: 'Compact SUV' },
                { label: 'Honda CR-V', value: 'Honda CR-V', image: 'https://images.hgmsites.net/hug/honda-cr-v_100748059_h.jpg', subLabel: 'Versatile SUV' },
                { label: 'Nissan Rogue', value: 'Nissan Rogue', image: 'https://images.hgmsites.net/hug/nissan-rogue_100768454_h.jpg', subLabel: 'Family SUV' },
                { label: 'Jeep Grand Cherokee', value: 'Jeep Grand Cherokee', image: 'https://images.hgmsites.net/hug/jeep-grand-cherokee_100712974_h.jpg', subLabel: 'Off-road SUV' },
                { label: 'Subaru Outback', value: 'Subaru Outback', image: 'https://images.hgmsites.net/hug/subaru-outback_100737472_h.jpg', subLabel: 'Adventure SUV' },
                { label: 'Ford Explorer', value: 'Ford Explorer', image: 'https://images.hgmsites.net/hug/ford-explorer_100667194_h.jpg', subLabel: 'Family SUV' },
                { label: 'Chevrolet Tahoe', value: 'Chevrolet Tahoe', image: 'https://images.hgmsites.net/hug/chevrolet-tahoe_100686686_h.jpg', subLabel: 'Full-size SUV' },
                { label: 'Cadillac Escalade', value: 'Cadillac Escalade', image: 'https://images.hgmsites.net/hug/cadillac-escalade_100690694_h.jpg', subLabel: 'Luxury SUV' },
                { label: 'Toyota Highlander', value: 'Toyota Highlander', image: 'https://images.hgmsites.net/hug/toyota-highlander_100686366_h.jpg', subLabel: 'Midsize SUV' },
                { label: 'Audi Q5', value: 'Audi Q5', image: 'https://images.hgmsites.net/hug/audi-q5_100731455_h.jpg', subLabel: 'Premium SUV' },
                { label: 'Mercedes-Benz GLE', value: 'Mercedes-Benz GLE', image: 'https://images.hgmsites.net/hug/mercedes-benz-gle-class_100732034_h.jpg', subLabel: 'Luxury SUV' },
                { label: 'Lexus RX', value: 'Lexus RX', image: 'https://images.hgmsites.net/hug/lexus-rx_100697853_h.jpg', subLabel: 'Premium SUV' },
                { label: 'Tesla Model Y', value: 'Tesla Model Y', image: 'https://images.hgmsites.net/hug/tesla-model-y_100782470_h.jpg', subLabel: 'Electric SUV' },
                { label: 'Ford Escape', value: 'Ford Escape', image: 'https://images.hgmsites.net/hug/ford-escape_100683891_h.jpg', subLabel: 'Compact SUV' },
                { label: 'Honda Pilot', value: 'Honda Pilot', image: 'https://images.hgmsites.net/hug/honda-pilot_100736931_h.jpg', subLabel: 'Family SUV' },
                { label: 'Jeep Wrangler', value: 'Jeep Wrangler', image: 'https://images.hgmsites.net/hug/jeep-wrangler_100768307_h.jpg', subLabel: 'Off-road SUV' },
                { label: 'Subaru Forester', value: 'Subaru Forester', image: 'https://images.hgmsites.net/hug/subaru-forester_100771334_h.jpg', subLabel: 'Adventure SUV' },
                { label: 'Chevrolet Equinox', value: 'Chevrolet Equinox', image: 'https://images.hgmsites.net/hug/chevrolet-equinox_100768547_h.jpg', subLabel: 'Versatile SUV' },
                { label: 'Cadillac XT5', value: 'Cadillac XT5', image: 'https://images.hgmsites.net/hug/cadillac-xt5_100768322_h.jpg', subLabel: 'Luxury SUV' },
                { label: 'GMC Yukon', value: 'GMC Yukon', image: 'https://images.hgmsites.net/hug/gmc-yukon_100775057_h.jpg', subLabel: 'Full-size SUV' },
                { label: 'Toyota 4Runner', value: 'Toyota 4Runner', image: 'https://images.hgmsites.net/hug/toyota-4runner_100768751_h.jpg', subLabel: 'Off-road SUV' },
                { label: 'Audi Q7', value: 'Audi Q7', image: 'https://images.hgmsites.net/hug/audi-q7_100742442_h.jpg', subLabel: 'Luxury SUV' },
                { label: 'BMW X5', value: 'BMW X5', image: 'https://images.hgmsites.net/hug/bmw-x5_100682910_h.jpg', subLabel: 'Executive SUV' },
                { label: 'Lexus NX', value: 'Lexus NX', image: 'https://images.hgmsites.net/hug/lexus-nx_100770773_h.jpg', subLabel: 'Luxury SUV' },
                { label: 'Tesla Model X', value: 'Tesla Model X', image: 'https://images.hgmsites.net/hug/tesla-model-x_100700340_h.jpg', subLabel: 'Electric SUV' },
                { label: 'Ford Edge', value: 'Ford Edge', image: 'https://images.hgmsites.net/hug/ford-edge_100768107_h.jpg', subLabel: 'Midsize SUV' },
                { label: 'Honda Passport', value: 'Honda Passport', image: 'https://images.hgmsites.net/hug/honda-passport_100768223_h.jpg', subLabel: 'Adventure SUV' },
                { label: 'Jeep Cherokee', value: 'Jeep Cherokee', image: 'https://images.hgmsites.net/hug/jeep-cherokee_100774794_h.jpg', subLabel: 'Versatile SUV' },
                { label: 'Subaru Crosstrek', value: 'Subaru Crosstrek', image: 'https://images.hgmsites.net/hug/subaru-crosstrek_100782693_h.jpg', subLabel: 'Compact SUV' },
                { label: 'Chevrolet Traverse', value: 'Chevrolet Traverse', image: 'https://images.hgmsites.net/hug/chevrolet-traverse_100773679_h.jpg', subLabel: 'Family SUV' },
                { label: 'GMC Terrain', value: 'GMC Terrain', image: 'https://images.hgmsites.net/hug/gmc-terrain_100773744_h.jpg', subLabel: 'Compact SUV' },
                { label: 'Toyota Sequoia', value: 'Toyota Sequoia', image: 'https://images.hgmsites.net/hug/toyota-sequoia_100773970_h.jpg', subLabel: 'Full-size SUV' },
                { label: 'Audi Q8', value: 'Audi Q8', image: 'https://images.hgmsites.net/hug/audi-q8_100775303_h.jpg', subLabel: 'Luxury SUV' },
                { label: 'BMW X3', value: 'BMW X3', image: 'https://images.hgmsites.net/hug/bmw-x3_100773745_h.jpg', subLabel: 'Executive SUV' },
                { label: 'Lexus GX', value: 'Lexus GX', image: 'https://images.hgmsites.net/hug/lexus-gx_100775470_h.jpg', subLabel: 'Luxury SUV' },
                { label: 'Tesla Model Y', value: 'Tesla Model Y', image: 'https://images.hgmsites.net/hug/tesla-model-y_100782470_h.jpg', subLabel: 'Electric SUV' },
                { label: 'Ford Bronco', value: 'Ford Bronco', image: 'https://images.hgmsites.net/hug/ford-bronco_100783233_h.jpg', subLabel: 'Off-road SUV' },
                { label: 'Honda HR-V', value: 'Honda HR-V', image: 'https://images.hgmsites.net/hug/honda-hr-v_100783389_h.jpg', subLabel: 'Compact SUV' },
                { label: 'Jeep Compass', value: 'Jeep Compass', image: 'https://images.hgmsites.net/hug/jeep-compass_100783237_h.jpg', subLabel: 'Adventure SUV' },
                { label: 'Subaru Ascent', value: 'Subaru Ascent', image: 'https://images.hgmsites.net/hug/subaru-ascent_100783359_h.jpg', subLabel: 'Family SUV' },
                { label: 'Chevrolet Blazer', value: 'Chevrolet Blazer', image: 'https://images.hgmsites.net/hug/chevrolet-blazer_100783328_h.jpg', subLabel: 'Sporty SUV' },
                { label: 'GMC Acadia', value: 'GMC Acadia', image: 'https://images.hgmsites.net/hug/gmc-acadia_100783175_h.jpg', subLabel: 'Versatile SUV' },
                { label: 'Toyota Land Cruiser', value: 'Toyota Land Cruiser', image: 'https://images.hgmsites.net/hug/toyota-land-cruiser_100783229_h.jpg', subLabel: 'Legendary SUV' },
                { label: 'Audi e-Tron', value: 'Audi e-Tron', image: 'https://images.hgmsites.net/hug/audi-e-tron_100783050_h.jpg', subLabel: 'Electric SUV' },
                { label: 'BMW X7', value: 'BMW X7', image: 'https://images.hgmsites.net/hug/bmw-x7_100782670_h.jpg', subLabel: 'Luxury SUV' },
                { label: 'Lexus LX', value: 'Lexus LX', image: 'https://images.hgmsites.net/hug/lexus-lx_100783291_h.jpg', subLabel: 'Luxury SUV' },
                { label: 'Ford Expedition', value: 'Ford Expedition', image: 'https://images.hgmsites.net/hug/ford-expedition_100782951_h.jpg', subLabel: 'Full-size SUV' },
                { label: 'Honda Odyssey', value: 'Honda Odyssey', image: 'https://images.hgmsites.net/hug/honda-odyssey_100782765_h.jpg', subLabel: 'Family minivan' },
                { label: 'Chrysler Pacifica', value: 'Chrysler Pacifica', image: 'https://images.hgmsites.net/hug/chrysler-pacifica_100783016_h.jpg', subLabel: 'Modern minivan' },
                { label: 'Toyota Sienna', value: 'Toyota Sienna', image: 'https://images.hgmsites.net/hug/toyota-sienna_100783084_h.jpg', subLabel: 'Versatile minivan' },
                { label: 'Kia Carnival', value: 'Kia Carnival', image: 'https://images.hgmsites.net/hug/kia-carnival_100783203_h.jpg', subLabel: 'Spacious minivan' },
                { label: 'Mercedes-Benz Sprinter', value: 'Mercedes-Benz Sprinter', image: 'https://images.hgmsites.net/hug/mercedes-benz-sprinter_100783142_h.jpg', subLabel: 'Commercial van' },
                { label: 'Ford Transit', value: 'Ford Transit', image: 'https://images.hgmsites.net/hug/ford-transit_100783122_h.jpg', subLabel: 'Cargo van' },
                { label: 'Chevrolet Express', value: 'Chevrolet Express', image: 'https://images.hgmsites.net/hug/chevrolet-express_100783198_h.jpg', subLabel: 'Utility van' },
                { label: 'GMC Savana', value: 'GMC Savana', image: 'https://images.hgmsites.net/hug/gmc-savana_100783112_h.jpg', subLabel: 'Cargo van' },
                { label: 'Nissan NV', value: 'Nissan NV', image: 'https://images.hgmsites.net/hug/nissan-nv_100783033_h.jpg', subLabel: 'Commercial van' },
                { label: 'Ram ProMaster', value: 'Ram ProMaster', image: 'https://images.hgmsites.net/hug/ram-promaster_100783166_h.jpg', subLabel: 'Cargo van' },
                { label: 'Fiat Ducato', value: 'Fiat Ducato', image: 'https://images.hgmsites.net/hug/fiat-ducato_100783247_h.jpg', subLabel: 'Commercial van' },
                { label: 'Volkswagen Transporter', value: 'Volkswagen Transporter', image: 'https://images.hgmsites.net/hug/volkswagen-transporter_100783277_h.jpg', subLabel: 'Cargo van' },
                { label: 'Toyota Tundra', value: 'Toyota Tundra', image: 'https://images.hgmsites.net/hug/toyota-tundra_100783033_h.jpg', subLabel: 'Full-size pickup truck' },
                { label: 'Nissan Titan', value: 'Nissan Titan', image: 'https://images.hgmsites.net/hug/nissan-titan_100783226_h.jpg', subLabel: 'Powerful pickup truck' },
                { label: 'GMC Sierra', value: 'GMC Sierra', image: 'https://images.hgmsites.net/hug/gmc-sierra-1500_100783161_h.jpg', subLabel: 'Durable pickup truck' },
                { label: 'Chevrolet Colorado', value: 'Chevrolet Colorado', image: 'https://images.hgmsites.net/hug/chevrolet-colorado_100783123_h.jpg', subLabel: 'Midsize pickup truck' },
                { label: 'Ford Ranger', value: 'Ford Ranger', image: 'https://images.hgmsites.net/hug/ford-ranger_100783279_h.jpg', subLabel: 'Compact pickup truck' },
                { label: 'Honda Ridgeline', value: 'Honda Ridgeline', image: 'https://images.hgmsites.net/hug/honda-ridgeline_100783288_h.jpg', subLabel: 'Versatile pickup truck' },
                { label: 'Ram 2500', value: 'Ram 2500', image: 'https://images.hgmsites.net/hug/ram-2500_100783170_h.jpg', subLabel: 'Heavy-duty pickup truck' },
                { label: 'Chevrolet Silverado HD', value: 'Chevrolet Silverado HD', image: 'https://images.hgmsites.net/hug/chevrolet-silverado-2500hd_100783233_h.jpg', subLabel: 'Powerful pickup truck' },
                { label: 'GMC Sierra HD', value: 'GMC Sierra HD', image: 'https://images.hgmsites.net/hug/gmc-sierra-2500hd_100783134_h.jpg', subLabel: 'Heavy-duty pickup truck' },
                { label: 'Ford Super Duty', value: 'Ford Super Duty', image: 'https://images.hgmsites.net/hug/ford-super-duty-f-250_100783288_h.jpg', subLabel: 'Heavy-duty pickup truck' },
                { label: 'Ram 3500', value: 'Ram 3500', image: 'https://images.hgmsites.net/hug/ram-3500_100783311_h.jpg', subLabel: 'Heavy-duty pickup truck' }
            ]} onSelect={(e) => { onselect(e) }}
                placeHolder={selectedItem}
            />
            <TextBox placeholder='Quantity' keyboardType='numeric' maxLength={5000} icon='count' />
            <TextBox placeholder='Purhase Price' keyboardType='numeric' icon='rupee' />
            <TextBox placeholder='MRP' keyboardType='numeric' icon='rupee' />
            <TextBox placeholder='SP' keyboardType='numeric' icon='rupee' />
            <TextBox placeholder='Discount' keyboardType='numeric' icon='rupee' />
            <TextBox placeholder='GST' keyboardType='numeric' icon='percentage' />
            <TextBox placeholder='Phone Number' autoComplete='tel' keyboardType='numeric' label='Vendor 📞' icon='call' />
            <DatePicker mode='date' value={new Date()} onChange={(e) => console.log(e, "ACTIV")} label='Date' />
            <BarcodeScannerWithInput onScanValue={onScanValue} />

            <Button title='Save' buttonColor={'black'} icon='barcode' fontColor='white' onPress={() => console.log('Save')} />
        </ScrollView>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeScreen;