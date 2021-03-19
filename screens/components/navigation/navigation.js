import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Home from '../../Home';
import * as calls from '../Calls/index';
import * as chat from '../Chat/index';
import * as camera from '../Camera/index';
import * as contact from '../contact/index';
import * as AuthScreens from '../AuthScreens/index';
import * as AllNavigation from './index';

const Auth = createStackNavigator({
  Login: {
    screen: AuthScreens.login,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForgotPwd: {
    screen: AuthScreens.ForgotPassword,
    navigationOptions: {
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'none',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
      // headerBackImage: () => <CommonComponents.HeaderBackButton />,
    },
  },
});
const PhoneAuth = createStackNavigator({
  NumberScreen: {
    screen: AuthScreens.PhoneLogin,
    navigationOptions: {
      headerShown: false,
    },
  },
  // ForgotPwd: {
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
  //     // headerBackImage: () => <CommonComponents.HeaderBackButton />,
  //   },
  // },
});
const Chat_StackNavigator = createStackNavigator({
  showAllUsers: {
    screen: chat.ChatsTab,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerShown: false,
    }),
  },
});
const Camera_StackNavigator = createStackNavigator({
  camera: {
    screen: camera.CameraTab,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerShown: false,
    }),
  },
});
const Call_StackNavigator = createStackNavigator({
  AllCalls: {
    screen: calls.CallsTab,
    navigationOptions: ({navigation}) => ({
      safeAreaInsets: {top: 0},
      headerShown: false,
    }),
  },
});
// Tab Navigation for chat,call,status
const TabScreen = createMaterialTopTabNavigator(
  {
    Camera: {
      screen: Camera_StackNavigator,
      navigationOptions: {},
    },
    CHAT: {
      screen: Chat_StackNavigator,
    },
    CALLS: {
      screen: Call_StackNavigator,
    },
  },
  {
    tabBarComponent: Home,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#bbb',
    },
    initialRouteName: 'CHAT',
  },
);
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: TabScreen,
      navigationOptions: ({navigation}) => ({
        safeAreaInsets: {top: 0},
        headerShown: false,
      }),
    },
    conversation: {
      screen: chat.conversation,
      navigationOptions: ({navigation}) => ({
        header: () => <chat.ConversationHeader navigationProps={navigation} />,
      }),
    },
    contact: {
      screen: contact.contact,
      navigationOptions: ({navigation}) => ({
        // header: () => <chat.ConversationHeader navigationProps={navigation} />,
      }),
    },
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

const RootNavigator = createSwitchNavigator({
  SplashScreen: AuthScreens.Splash,
  TermAndConditionScreen: AuthScreens.TermAndCondition,
  TabScreen: AllNavigation.TopTabNavigation,
  AuthScreen: Auth,
  Phone: PhoneAuth,
  Register: {
    screen: AllNavigation.Register_StackNavigator,
  },
  HomeScreen: HomeStack,
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
