import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigators/RootNavigator';
import { Provider } from 'react-redux'
import configureStore from './configureStore';
import { ThemeContext, ThemeMode, themes } from './ThemeContext';
import { ThemeProvider } from 'styled-components';

const Navigation = createAppContainer(AppNavigator);

const store = configureStore()

export const App = () => {

  const [theme, setTheme] = React.useState(ThemeMode.Light);


  return <ThemeContext.Provider value={{ theme, setTheme }}>
    <ThemeProvider theme={themes[theme]}>
      <Provider store={store.store}>
        <Navigation />
      </Provider>
    </ThemeProvider>
  </ThemeContext.Provider>

}
