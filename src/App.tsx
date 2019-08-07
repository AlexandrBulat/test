import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './navigators/RootNavigator';
import { Provider } from 'react-redux'
import configureStore from './configureStore';

const Navigation = createAppContainer(AppNavigator);

const store = configureStore()

export default class App extends React.Component {

  render() {
    return <Provider store={store.store}>
      <Navigation />
    </Provider>
  }
}
