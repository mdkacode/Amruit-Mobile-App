
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
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
import theme from './Themes/theme';
import fontFamily from './constants/fontFamily';
import Button from './compoents/molecules/Buttons/Button';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Button
          title={'google'}
          onPress={() => { }}
          buttonColor={"lightRed"}
          fontColor='red'
          icon='user'
          width={100}
        />

      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
