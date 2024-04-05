
import { ThemeProvider } from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { theme, darkTheme } from './Themes/theme';
import fontFamily from './constants/fontFamily';
import Button from './compoents/Atoms/Buttons/Button';
import TextBox from './compoents/Atoms/Textbox/TextBox';
import CardComponent from './compoents/molecules/Cards/CardBasic';
import MyStack from './navigation/NavigationStack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/Login/Login.index';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [darkMode, setDarkMode] = useState(isDarkMode ? darkTheme : theme );
  useEffect(()=>{
    if(isDarkMode) {
      setDarkMode(darkTheme);
    }
    else {
      setDarkMode(theme);
    }
  },[isDarkMode])
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <ThemeProvider key={'mode'+isDarkMode} theme={darkMode}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
    </ThemeProvider>
  );
}



export default App;
