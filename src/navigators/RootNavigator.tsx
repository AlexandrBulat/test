import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import NavigationScreen from './NavigationScreen';
import Movies from '../containers/Movies';
import MovieDetails from '../containers/MovieDetails';

const MoviesNavigator = createStackNavigator({
  [NavigationScreen.LANDING]: {
    screen: Movies,
    navigationOptions: {
      header: null
    }
  },
  [NavigationScreen.DETAILS]: {
    screen: MovieDetails,
    navigationOptions: {

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
