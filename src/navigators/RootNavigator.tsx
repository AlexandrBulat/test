import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import NavigationScreen from './NavigationScreen';
import { Landing } from '../containers/Landing';

const MoviesNavigator = createStackNavigator({
  [NavigationScreen.LANDING]: {
    screen: Landing,
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
