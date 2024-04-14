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
        color: 'black',
    },
    semibold: {
        fontFamily: 'AirbnbCereal_W_Bd',
        color: 'black',
    },
    bold: {
        fontFamily: 'AirbnbCereal_W_Blk',
        color: 'black',
    },
    light: {
        fontFamily: 'AirbnbCereal_W_Lt',
        color: 'black',
    },
    smallFont: {
        fontSize: 14,
        color: 'black',
    },
    mediumFont: {
        fontSize: 16,
        color: 'black',
    },
    largeFont: {
        fontSize: 18,
        color: 'black',
    },

});

export type FontWeights = 'regular' | 'semibold' | 'bold' | 'light';