import { createStackNavigator, createAppContainer } from 'react-navigation';
import Main from './pages/main';

const AppNavigator = createStackNavigator({
    Home: {
        screen: Main
    }

}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#d93638",
        },
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },

        headerTintColor: 'white'
    }
});

export default createAppContainer(AppNavigator);