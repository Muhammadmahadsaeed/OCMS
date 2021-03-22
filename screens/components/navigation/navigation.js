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
import LoginSignupSegment from './LoginSignupSegment';
import {Profile} from '../profile/index';
const Auth = createStackNavigator(
  {
    TabScreen: {
      screen: LoginSignupSegment,

      navigationOptions: {
        headerShown: false,
      },
    },

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
    Phone: {
      screen: AuthScreens.PhoneLogin,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
      screen: AuthScreens.register,

      navigationOptions: {
        headerLeft: () => null,
        safeAreaInsets: {top: 0},
        title: 'SIGN UP YOUR ACCOUNT',
        headerTitleStyle: {
          textAlign: 'center',
          // flex: 1,
          fontSize: 14,
          fontFamily: 'Montserrat-Bold_0',
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#3d900e',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
      },
    },
    // Second: {
    //   screen: AuthScreens.ChooseImage,
    //   title: 'none',
    //   navigationOptions: {
    //     headerTransparent: true,
    //     headerBackImage: () => <CommonComponents.HeaderBackButton />,
    //     headerTitle: '',
    //   },
    // },
  },

  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

const Chat_StackNavigator = createStackNavigator({
  allChat: {
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
    chatRoom: {
      screen: chat.ChatRoom,
      navigationOptions: ({navigation}) => ({
        headerTitle: '',
        header: () => <chat.ConversationHeader navigationProps={navigation} />,
      }),
    },
    contact: {
      screen: contact.contact,
      navigationOptions: ({navigation}) => ({
        // header: () => <chat.ConversationHeader navigationProps={navigation} />,
      }),
    },
    profile: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        headerTitle: '',
        headerTransparent: () => true,
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
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
  AuthScreen: Auth,
  HomeScreen: HomeStack,
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
