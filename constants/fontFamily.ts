import { StyleSheet } from 'react-native';
/**
 * This is the font family for the app
 * Font family is Airbnb Cereal which is located in Assets folder
 * and font is linked via npx react-native-assets
 * this file is used to define the font family for the app and will be used at only one place
 */

export default StyleSheet.create({
    regular: {
        fontFamily: 'AirbnbCereal_W_Bk',
    },
    semibold: {
        fontFamily: 'AirbnbCereal_W_Bd',
    },
    bold: {
        fontFamily: 'AirbnbCereal_W_Blk',
    },
    light: {
        fontFamily: 'AirbnbCereal_W_Lt',
    },
    smallFont: {
        fontSize: 14,
    },
    mediumFont: {
        fontSize: 16,
    },
    largeFont: {
        fontSize: 18,
    },

});