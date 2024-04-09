import { createTheme } from '@shopify/restyle';
import { IColor } from '../interfaces/color';

const palette = {
    white: '#FFFFFF',
    lightGrey: '#F4F0EF',
    black: '#000000',
    grey: '#9B9B9B',
    darkGrey: '#4A4A4A',
    almostBlack: '#31363F',
    almostWhite:'#FBFBFB',
    secondary: '#0C0D34',
    // BLUE COLORS START
    normalBlue: '#007AFF',
    mediumBlue: '#378CE7',
    lightBlue: '#C6DBFF',
    // BLUE COLORS START

    // RED COLORS START
    red: '#FF0058',
    mediumRed: '#FFA1C2',
    lightRed: '#FFD7E6',
    // RED COLORS END

    // GREEN COLORS START
    green: '#00D99A',
    mediumGreen: '#9CF5D8',
    lightGreen: '#E7FBF3',
    // GREEN COLORS END
    blueForLight: '#1C1678',
    blueForDark: '#8576FF',
    greenLight:"#4E9F3D",
    greenDark:"#1E5128",
    warning: '#FFAA44',

};


const theme = createTheme({
    colors: {
        mainBackground: palette.white,
        white: palette.white,
        black: palette.black,
        cardPrimaryBackground: palette.almostWhite,
        cardSecondaryBackground: palette.lightGrey,
        textPrimary: palette.black,
        textSecondary: palette.grey,
        textTertiary: palette.darkGrey,
        primary: palette.mediumBlue,
        secondary: palette.secondary,
        error: palette.red,
        success: palette.green,
        warning: palette.warning,
        red: palette.red,
        green: palette.lightGreen,
        lightGrey: palette.lightGrey,
        mediumGrey: palette.grey,
        mediumGreen: palette.mediumGreen,
        mediumRed: palette.mediumRed,
        lightRed: palette.lightRed,
        lightGreen: palette.greenLight,
        lightBlue: palette.lightBlue,
        normalBlue: palette.normalBlue,
       
        
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
    },
    breakpoints: {
        phone: 0,
        tablet: 768,
    },
    textVariants: {
        header: {
            fontSize: 34,
            fontFamily: 'SFProDisplay-Bold',
            color: 'textPrimary',
        },
        title: {
            fontSize: 28,
            fontFamily: 'SFProDisplay-Bold',
            color: 'textPrimary',
        },
        body: {
            fontSize: 16,
            fontFamily: 'SFProDisplay-Regular',
            color: 'textPrimary',
        },
        button: {
            fontSize: 15,
            fontFamily: 'SFProDisplay-Semibold',
            color: 'textPrimary',
        },
    },
    borderRadius: {
        s: 4,
        m: 10,
        l: 25,
        xl: 75,
    },
    borderWidths: {
        none: 0,
        s: 1,
        m: 2,
    },
});

const darkTheme = createTheme({
    colors: {
        mainBackground: palette.black,
        white: palette.white,
        black: palette.black,
        cardPrimaryBackground: palette.almostBlack,
        cardSecondaryBackground: palette.darkGrey,
        textPrimary: palette.white,
        textSecondary: palette.lightGrey,
        textTertiary: palette.lightGreen,
        primary: palette.mediumBlue,
        secondary: palette.secondary,
        error: palette.lightRed,
        success: palette.lightGreen,
        warning: palette.warning,
        red: palette.red,
        green: palette.greenDark,
        lightGrey: palette.darkGrey,
        mediumGrey: palette.grey,
        mediumGreen: palette.mediumGreen,
        mediumRed: palette.mediumRed,
        lightRed: palette.red,
        lightGreen: palette.green,
        lightBlue: palette.normalBlue,
        normalBlue: palette.lightBlue,
        
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
    },
    breakpoints: {
        phone: 0,
        tablet: 768,
    },
    textVariants: {
        header: {
            fontSize: 34,
            fontFamily: 'SFProDisplay-Bold',
            color: 'textPrimary',
        },
        title: {
            fontSize: 28,
            fontFamily: 'SFProDisplay-Bold',
            color: 'textPrimary',
        },
        body: {
            fontSize: 16,
            fontFamily: 'SFProDisplay-Regular',
            color: 'textPrimary',
        },
        button: {
            fontSize: 15,
            fontFamily: 'SFProDisplay-Semibold',
            color: 'textPrimary',
        },
    },
    borderRadius: {
        s: 4,
        m: 10,
        l: 25,
        xl: 75,
    },
    borderWidths: {
        none: 0,
        s: 1,
        m: 2,
    },
});


export type Theme = typeof theme;
export type Colors = typeof theme.colors;
export type Spacing = typeof theme.spacing;
export type TextVariants = typeof theme.textVariants;
export type BorderRadius = typeof theme.borderRadius;
export type BorderWidths = typeof theme.borderRadius;

export  {theme,darkTheme};