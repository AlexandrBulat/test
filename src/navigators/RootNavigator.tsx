import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import Cryptocurrencies from '../containers/Cryptocurrencies';
import NavigationScreen from './NavigationScreen';

const CryptocurrenciesNavigator = createStackNavigator({
  [NavigationScreen.CRYPTOCURRENCIES]: {
    screen: Cryptocurrencies,
    navigationOptions: {
        headerTitle: 'Cryptocurrencies'
    }
  },
  initialRouteName: NavigationScreen.CRYPTOCURRENCIES,
});

const AppNavigator = createSwitchNavigator(
  {
    [NavigationScreen.CRYPTOCURRENCIES]: CryptocurrenciesNavigator,
  },
  {
    initialRouteName: NavigationScreen.CRYPTOCURRENCIES,
  },
)

export default AppNavigator
