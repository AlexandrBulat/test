import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import Cryptocurrencies from '../containers/Movies';
import NavigationScreen from './NavigationScreen';

const MoviesNavigator = createStackNavigator({
  [NavigationScreen.MOVIES]: {
    screen: Cryptocurrencies,
    navigationOptions: {
      headerTitle: 'Movies'
    }
  },
  initialRouteName: NavigationScreen.MOVIES,
});

const AppNavigator = createSwitchNavigator(
  {
    [NavigationScreen.MOVIES]: MoviesNavigator,
  },
  {
    initialRouteName: NavigationScreen.MOVIES,
  },
)

export default AppNavigator
