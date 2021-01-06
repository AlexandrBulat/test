import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import NavigationScreen from './NavigationScreen';
import Movies from '../containers/Movies';
import MovieDetails from '../containers/MovieDetails';

const MoviesNavigator = createStackNavigator({
  [NavigationScreen.LANDING]: {
    screen: Movies,
    navigationOptions: {
      headerBackTitle: null,
      header: null
    }
  },
  [NavigationScreen.DETAILS]: {
    screen: MovieDetails
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
