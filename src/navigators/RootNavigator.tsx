import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import NavigationScreen from './NavigationScreen';
import Movies from '../containers/Movies';

const MoviesNavigator = createStackNavigator({
  [NavigationScreen.LANDING]: {
    screen: Movies,
    navigationOptions: {
      header: null
    }
  },
  initialRouteName: NavigationScreen.LANDING,
});

const AppNavigator = createSwitchNavigator(
  {
    [NavigationScreen.LANDING]: MoviesNavigator,
  },
  {
    initialRouteName: NavigationScreen.LANDING,
  },
)

export default AppNavigator
