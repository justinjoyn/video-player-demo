import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Videos } from './modules/videos';

const MainNavigator = createStackNavigator(
  {
    Videos: {
      screen: Videos
    }
  },
  {
    initialRouteName: 'Videos',
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
