import {createStackNavigator} from 'react-navigation-stack';
import * as AuthScreens from '../AuthScreens/index';

export const Auth = createStackNavigator({
    Login: {
      screen: AuthScreens.login,
      navigationOptions: {
        headerShown: false,
      },
    },
    // ForgotPassword: {
    //   screen: AuthScreens.ForgotPassword,
    //   navigationOptions: {
    //     headerTitle: '',
    //     headerStyle: {
    //       backgroundColor: 'none',
    //       shadowOffset: {
    //         height: 0,
    //         width: 0,
    //       },
    //       shadowOpacity: 0,
    //       elevation: 0,
    //     },
    //     headerBackImage: () => <CommonComponents.HeaderBackButton />,
    //   },
    // }
  });