import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
} from 'react-navigation-tabs';
import Home from '../../Home';
import * as calls from '../Calls/index';
import * as chat from '../Chat/index';
import * as camera from '../Camera/index';
// import {createDrawerNavigator} from 'react-navigation-drawer';
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
const conversation_stack = createStackNavigator({
  conversation: {
    screen: chat.conversation,
    navigationOptions: ({navigation}) => ({
      header: <chat.ConversationHeader />,
    }),
  },
})
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

const RootNavigator = createSwitchNavigator({
  SplashScreen: AuthScreens.Splash,
  TermAndConditionScreen: AuthScreens.TermAndCondition,
  TabScreen: AllNavigation.TopTabNavigation,
  AuthScreen: Auth,
  Phone: PhoneAuth,
  Register: {
    screen: AllNavigation.Register_StackNavigator,
  },
  HomeScreen: {
    screen: TabScreen,
  },
  // conversation: conversation_stack
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
