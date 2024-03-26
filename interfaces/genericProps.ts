import { Colors } from "../Themes/theme";
import { FontWeights } from "../constants/fontFamily";

/**
 * Represents the generic props for a button component.
 */
interface IGenericProps {
    /**
     * The title of the button.
     */
    title?: string;
    
    key?: string;
    /**
     * The function to be called when the button is pressed.
     */
    onPress?: () => void;
    
    /**
     * The function to be called when the value of the button changes.
     * @param value - The new value of the button.
     */
    onChange?: (value: string) => void;
    
    /**
     * The function to be called when the button receives focus.
     */
    onFocus?: () => void;
    
    /**
     * The function to be called when the button loses focus.
     */
    onBlur?: () => void;
    
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
    
    /**
     * The font weights for the button text.
     */
    fontWeights?: FontWeights;
}

export default IGenericProps;