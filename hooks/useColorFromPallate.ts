import { useMemo } from "react";
import { Colors, Theme } from "../Themes/theme";
import { useTheme } from "@shopify/restyle";



const useColorFromPallate = (colorCode: keyof Colors) => {
    const theme = useTheme<Theme>();
    const color = useMemo(() => theme.colors[colorCode] || theme.colors.cardPrimaryBackground, [colorCode]);
    return color;
};
export default useColorFromPallate;