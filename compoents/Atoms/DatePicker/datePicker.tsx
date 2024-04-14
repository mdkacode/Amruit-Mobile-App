import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import useColorFromPallate from '../../../hooks/useColorFromPallate';
import fontFamily from '../../../constants/fontFamily';
import ImageDisplay from '../ImageDisplay/imageDisplay';
import moment from 'moment';

interface DatePickerProps {
    mode: 'date' | 'time' | 'datetime';
    onChange: (selectedDate?: Date) => void;
    value: Date;
    minimumDate?: Date;
    key?: string;
    label?: string;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
    const { mode = "date", minimumDate = new Date(), key = "dateTimeComponent", label = "Select Date", onChange = (e: any, selectedDate?: Date) => console.log(e), value = new Date() } = props;

    const [showPicker, setShowPicker] = useState(false);

    const showDatePicker = () => {
        setShowPicker(true);
    };

    const hideDatePicker = () => {
        setShowPicker(false);
    };

    const renderPicker = () => {
        if (Platform.OS === 'ios') {
            return (
                <Modal
                    visible={showPicker}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={hideDatePicker}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <DateTimePicker
                                value={value}
                                mode={mode}
                                minimumDate={minimumDate}
                                onChange={(event: any, selectedDate?: Date) => {
                                    hideDatePicker();
                                    onChange(selectedDate);
                                }}
                            />
                            <TouchableOpacity onPress={hideDatePicker}>
                                <Text style={{ alignSelf: 'flex-end', marginTop: 10 }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            );
        } else {
            return (
                <DateTimePicker
                    value={value}
                    mode={mode}
                    minimumDate={minimumDate}
                    onChange={(event: any, selectedDate?: Date) => {
                        hideDatePicker();
                        onChange(selectedDate);
                    }}
                />
            );
        }
    };

    return (
        <TouchableOpacity onPress={showDatePicker}>
            <View key={'dateTimeComponentView' + key} style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: useColorFromPallate('white')
            }}>
                <Text style={[fontFamily.semibold, fontFamily.bold]}>
                    {moment(value).format('DD-MM-YYYY')}
                </Text>
                <Text key={'dateTimeComponentText' + key} style={{
                    fontFamily: fontFamily.regular.fontFamily,
                    fontSize: 16,
                    color: useColorFromPallate('textTertiary')
                }}>{label}</Text>
                {showPicker && renderPicker()}
            </View>
        </TouchableOpacity>
    );
};

export default DatePicker;
