
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
import Button from './compoents/molecules/Buttons/Button';
import TextBox from './compoents/molecules/Textbox/TextBox';

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
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Button
          title={'Login'}
          onPress={() => { }}
          buttonColor={"red"}
          fontSize={20}
          fontColor='textPrimary'
          icon='user'
          width={'auto'}
          fontWeights='semibold'
        />

        <TextBox 
        title='Apple'
        onPress={console.log}
        value='Apple'
        icon='card'
         onChange={console.log}
       
          />

      </SafeAreaView>
    </ThemeProvider>
  );
}



export default App;
