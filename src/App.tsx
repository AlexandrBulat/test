import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigators/RootNavigator';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configureStore';
import { Root } from 'native-base';
import * as RNLocalize from "react-native-localize";
import { setI18nConfig } from './Localize';

const Navigation = createAppContainer(AppNavigator);

const store = configureStore()

export default class App extends React.Component {

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    this.handleLocalizationChange()
  }

  render() {
    return <Root>
      <Provider store={store.store}>
        <PersistGate
          persistor={store.persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </Root>
  }
}
