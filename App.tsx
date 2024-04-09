
import { ThemeProvider } from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  KeyboardAvoidingView,
  useColorScheme,
} from 'react-native';

import { theme, darkTheme } from './Themes/theme';
import MyStack from './navigation/NavigationStack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './Store/store.index';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [darkMode, setDarkMode] = useState(isDarkMode ? darkTheme : theme);
  useEffect(() => {
    if (isDarkMode) {
      setDarkMode(darkTheme);
    }
    else {
      setDarkMode(theme);
    }
  }, [isDarkMode])
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <ThemeProvider key={'mode' + isDarkMode} theme={darkMode}>
      <NavigationContainer key={'appNavigation'}>
        <KeyboardAvoidingView key={'appKeyboardAvoidView'} style={{ flex: 1 }}>
          <Provider key={'AppStoreProvider'} store={store}>
            <MyStack key={'appStack'} />
          </Provider>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </ThemeProvider>
  );
}



export default App;
