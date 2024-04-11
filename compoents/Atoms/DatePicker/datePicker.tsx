import React, { useState } from 'react';
import { Text, View } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import useColorFromPallate from '../../../hooks/useColorFromPallate';
import fontFamily from '../../../constants/fontFamily';
import ImageDisplay from '../ImageDisplay/imageDisplay';

interface DatePickerProps {
    mode: 'date' | 'time' | 'datetime';
    onChange: ( selectedDate?: Date) => void;
    value: Date;
    minimumDate?: Date;
    key?: string;
    label?: string;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {

    const { mode = "date", minimumDate = new Date(), key = "dateTimeComponent", label = "Select Date", onChange = (e: any, selectedDate?: Date) => console.log(e), value = new Date() } = props;
    return (
        <View key={'dateTimeComponentView' + key} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: useColorFromPallate('white')
        }}>
          
           
            <DateTimePicker
                key={'dateTimeComponentPicker' + key}
                testID="dateTimePicker"
                value={value}
                minimumDate={minimumDate}
                mode={mode}
                aria-label={label}
                shouldRasterizeIOS={true}
                
                locale='en-IN'
                accentColor={useColorFromPallate('black')}
                style={{
                shadowColor: useColorFromPallate('black'),
                    backgroundColor: useColorFromPallate('white'),
                 
                }}
                display="compact"
                onChange={(event: any, selectedDate?: Date) => onChange(selectedDate)}
            />
             <Text key={'dateTimeComponentText' + key} style={{
                fontFamily: fontFamily.regular.fontFamily,
                fontSize: 16,
                color: useColorFromPallate('textTertiary')
            }}>{label}</Text>
        </View>
    );
};

export default DatePicker;
