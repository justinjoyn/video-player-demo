import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Videos } from './modules/videos';
import { Player } from './modules/player';

const MainNavigator = createStackNavigator(
  {
    Videos: {
      screen: Videos
    },
    Player: {
      screen: Player
    }
  },
  {
    initialRouteName: 'Videos',
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
