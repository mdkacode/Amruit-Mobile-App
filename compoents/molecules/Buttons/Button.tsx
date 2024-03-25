import React from 'react';
import { useTheme } from '@shopify/restyle';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Colors, Theme } from '../../../Themes/theme';
import useDynamicImage from '../../../hooks/useDynamicImage';
import useColorFromPallate from '../../../hooks/useColorFromPallate';



interface ButtonProps {
    title: string;
    onPress: () => void;
    buttonColor?: keyof Colors;
    icon?: string;
    width?: 'full' | 'auto' | number;
    fontColor?: keyof Colors;
    fontSize?: number;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {

    const { title, onPress, buttonColor, icon, disabled = false, width, fontColor = 'textPrimary', fontSize } = props;
    const iconImage = icon ? useDynamicImage(icon) : null;


    const theme = useTheme<Theme>();
    const { lightBlue } = theme.colors; // Update the type of theme.colors
    return (
        <TouchableOpacity disabled={disabled}
            style={[styles.button,
            {
                backgroundColor: buttonColor ? useColorFromPallate(buttonColor) : useColorFromPallate('lightBlue'),
                opacity: disabled ? 0.5 : 1,
                width: width === 'full' ? '100%' : width === 'auto' ? 'auto' : width,
            }]}
            onPress={onPress}>
            {iconImage && <View >{<Image
                source={(iconImage)}
                key={iconImage}
                style={styles.imageIcon}

                tintColor={useColorFromPallate(fontColor)} />}</View>}
            <View><Text style={
                [styles.buttonText,
                {
                    color: useColorFromPallate(fontColor)
                }
                ]}>{title}</Text></View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {

        fontSize: 16,
        fontWeight: 'bold',
    },
    imageIcon: {
        marginRight: 10,
        height: 20,
        width: 20,

        tintColor: 'white',
    },
});

export default Button;