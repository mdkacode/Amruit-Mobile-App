import { StyleSheet } from "react-native";
import fontFamily from "../constants/fontFamily";
import useColorFromPallate from "../hooks/useColorFromPallate";

const AppStyles = StyleSheet.create({

    textRegular: {
        fontFamily: fontFamily.regular.fontFamily,

    },
    textBold: {
        fontFamily: fontFamily.bold.fontFamily,

    },
    textLight: {
        fontFamily: fontFamily.light.fontFamily,

    },
    textSemibold: {
        fontFamily: fontFamily.semibold.fontFamily,

    },

    cardStyle: {
        backgroundColor: '#fff',
        borderRadius: 8,
        fontFamily: fontFamily.regular.fontFamily,
      
        margin: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4, // For Android
    },
    transparentCardStyle: {
        backgroundColor: '#fff',
        borderRadius: 8,
        fontFamily: fontFamily.regular.fontFamily,
        padding: 8,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4, // For Android
    },
    cardContent: {
        display: "flex",
        fontFamily: fontFamily.regular.fontFamily,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        backgroundColor: '#000',
        padding: 8,
        borderRadius: 8,
        fontFamily: fontFamily.regular.fontFamily,
    },
    bottomNavigation: {
        backgroundColor: '#fff',
        paddingTop: 10,
        borderRadius: 10,
        bottom: 0,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    }

});


export default AppStyles;