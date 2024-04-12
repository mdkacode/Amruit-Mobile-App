import React, { useMemo, useState } from 'react';
import { TextInput, View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import useColorFromPallate from '../../../hooks/useColorFromPallate';
import IGenericProps from '../../../interfaces/genericProps';
import  { useDynamicImage,Iimages } from '../../../hooks/useDynamicImage';
import fontFamily from '../../../constants/fontFamily';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface TextBoxProps extends IGenericProps {
    placeholder?: string;
    value?: string;
    icon?: string;
    label?: string;
    editable?: boolean;
    maxLength?: number;
    onPressLabel?: () => void;
    clickLabel?: boolean;
    autoComplete?: 'tel' | "address-line1" | "address-line2" | "email" | "one-time-code" | 'off';
    autoFocus?: boolean;
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
};

const TextBox: React.FC<TextBoxProps> = (props) => {
    const { value = '',
        onChange = () => 'I am function',
        onFocus = () => 'I am function',
        onPressLabel = () => 'I am function',
        onBlur, placeholder = '', width = 'auto',
        key = 'text-box', icon,
        autoFocus = false,
        maxLength = 50,
        editable = true,
        autoComplete = 'off',
        label = '',
        clickLabel = false,
        keyboardType = 'default',
        fontColor = 'black' } = props;
    const [isError, setIsError] = useState(false);
    const iconImage = icon ? useDynamicImage(icon) : null;
    const handleInputChange = (text: string) => {
        onChange(text);
    };

    const handleFocus = () => {
        if (onFocus) {
            onFocus();
        }
    };

    const handleBlur = () => {
        if (onBlur) {
            onBlur();
        }
    };

  

    return (
        <KeyboardAvoidingView  style={{ flexDirection: 'row', alignItems: 'center',margin:1,borderRadius:10 }}>

            {iconImage && (
                <View style={{
                    flex: 0.5,
                    backgroundColor: useColorFromPallate('cardPrimaryBackground'),
                    justifyContent: 'center',
                    borderTopStartRadius: 5,
                    borderBottomStartRadius: 5,
                    padding: 4,
                    height: 40
                }} >
                    {<Image
                        source={iconImage}
                        testID='icon-element-textBox'
                        key={iconImage}
                        style={{
                            marginRight: 10,

                            height: 20,
                            width: 20,
                            tintColor: "red",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        tintColor={useColorFromPallate(fontColor)}
                    />}
                </View>
            )}
            <View style={{ flex: 7 }}>
                <TextInput
                    testID='text-box'
                   
                    key={key}
                    style={[styles.textBoxStyle, {
                        height: 40,
                        width: width === 'auto' ? 'auto' : width === 'full' ? '100%' : width,
                        color: useColorFromPallate('textPrimary'),
                        backgroundColor: useColorFromPallate('cardPrimaryBackground'),
                        fontFamily: fontFamily.regular.fontFamily,
                    }]}
                    keyboardAppearance='default'
                    returnKeyType='search'
                    keyboardType={keyboardType}
                    enablesReturnKeyAutomatically={true}
                    autoComplete={autoComplete}
                    editable={editable}
                    maxLength={50}
                    autoFocus={autoFocus}
                    defaultValue={value}
                    onChangeText={handleInputChange}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    clearButtonMode='always'
                    onBlur={handleBlur}
                />
            </View>
            <TouchableOpacity onPress={onPressLabel} style={{ flexDirection: 'column',height: 40, marginRight: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: useColorFromPallate('cardPrimaryBackground'), }}>
                {<Text
                    style={{
                        color: clickLabel ? useColorFromPallate('warning') : useColorFromPallate('black'),
                        textAlign: 'left',
                        alignContent:'flex-start',
                         verticalAlign: 'middle',
                         marginRight: 5,
                        alignItems: 'center',
                        fontFamily: clickLabel ? fontFamily.bold.fontFamily : fontFamily.regular.fontFamily,
                        justifyContent: 'center',
                        padding: clickLabel ? 5 : 0,
                        borderRadius:clickLabel ? 15 : 0,
                        textTransform: clickLabel ? 'uppercase' : 'none',
                        backgroundColor: clickLabel ? useColorFromPallate('normalBlue'):useColorFromPallate('cardPrimaryBackground')
                    }}
                >{label ? label : placeholder || ''}</Text>}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    textBoxStyle: {
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5,
        paddingLeft: 10,
    }
});



export default TextBox;