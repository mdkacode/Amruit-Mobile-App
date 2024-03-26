import React, { useMemo, useState } from 'react';
import { TextInput, View, Text, StyleSheet, Image } from 'react-native';
import useColorFromPallate from '../../../hooks/useColorFromPallate';
import IGenericProps from '../../../interfaces/genericProps';
import useDynamicImage from '../../../hooks/useDynamicImage';

interface TextBoxProps extends IGenericProps {
    placeholder?: string;
    value?: string;
};

const TextBox: React.FC<TextBoxProps> = (props) => {
    const { value, onChange, onFocus, onBlur, placeholder = '', width = 'auto', key = 'text-box', icon, fontColor = 'black' } = props;
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

    const memoizedValue = useMemo(() => {
        // Perform some expensive computation here
        return value.toUpperCase();
    }, [value]);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

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
            <View style={{ flex: 10 }}>
                <TextInput
                    testID='text-box'
                    key={key}
                    style={[styles.textBoxStyle, {
                        height: 40,
                        width: width === 'auto' ? 'auto' : width === 'full' ? '100%' : width,
                        color: useColorFromPallate('textPrimary'),
                        backgroundColor: useColorFromPallate('cardPrimaryBackground'),
                    }]}
                    defaultValue={value}
                    onChangeText={handleInputChange}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    clearButtonMode='always'
                    onBlur={handleBlur}
                />
            </View>
        </View>
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