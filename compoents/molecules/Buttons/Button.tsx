import React from 'react';
import { useTheme } from '@shopify/restyle';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Colors, Theme } from '../../../Themes/theme';
import useDynamicImage from '../../../hooks/useDynamicImage';
import useColorFromPallate from '../../../hooks/useColorFromPallate';
import ErrorBoundary from '../../../classes/ErrorBoundary';
import  fontStyleSheet, { FontWeights } from '../../../constants/fontFamily';
/**
 * Button component that can be customized with various props.
 */
interface ButtonProps {
    /**
     * The title of the button.
     */
    title: string;
    /**
     * The function to be called when the button is pressed.
     */
    onPress: () => void;
    /**
     * The color of the button. Should be one of the keys in the Colors object.
     */
    buttonColor?: keyof Colors;
    /**
     * The name of the icon to be displayed on the button.
     */
    icon?: string;
    /**
     * The width of the button. Can be 'full', 'auto', or a number representing the width in pixels.
     */
    width?: 'full' | 'auto' | number;
    /**
     * The color of the button text. Should be one of the keys in the Colors object.
     */
    fontColor?: keyof Colors;
    /**
     * The font size of the button text.
     */
    fontSize?: number;
    /**
     * Whether the button is disabled or not.
     */
    disabled?: boolean;

    fontWeights?: FontWeights;
}

/**
 * Button component that can be customized with various props.
 * 
 * @param props - The props for the Button component.
 * @returns The rendered Button component.
 */
const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { title, onPress, buttonColor, icon, disabled = false, width, fontColor = 'textPrimary', fontSize,fontWeights='regular' } = props;
    const iconImage = icon ? useDynamicImage(icon) : null;

    const theme = useTheme<Theme>();

    /**
     * Fallback UI to be rendered when an error occurs inside the Button component.
     * 
     * @returns The fallback UI.
     */
    const fallbackUI = () => {
        return (
            <TouchableOpacity key={`fallbackui-${title}-header`} disabled={disabled} style={styles.button} onPress={onPress}>
                <Text key={`fallbackui-${title}`}>{title || ''}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ErrorBoundary key={`button-${title}`} fallbackUI={fallbackUI()} >
            <TouchableOpacity
                disabled={disabled}
                style={[
                    styles.button,
                    {
                        backgroundColor: buttonColor ? useColorFromPallate(buttonColor) : useColorFromPallate('lightBlue'),
                        opacity: disabled ? 0.5 : 1,
                        width: width === 'full' ? '100%' : width === 'auto' ? 'auto' : width,
                    }
                ]}
                onPress={onPress}
            >
                {iconImage && (
                    <View >
                        {<Image
                            source={iconImage}
                            testID='icon-element'
                            key={iconImage}
                            style={styles.imageIcon}
                            tintColor={useColorFromPallate(fontColor)}
                        />}
                    </View>
                )}
                <View>
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                fontSize: fontSize || 16,
                                fontFamily: fontStyleSheet[fontWeights]?.fontFamily || fontStyleSheet.regular.fontFamily,
                                color: useColorFromPallate(fontColor)
                            }
                        ]}
                    >
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        </ErrorBoundary>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        elevation: 2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 2,
    },
    imageIcon: {
        marginRight: 10,
        height: 20,
        width: 20,
        tintColor: 'white',
    },
});

export default Button;