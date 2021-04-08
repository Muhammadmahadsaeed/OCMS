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
import ContactSearchBar from '../../common/ContactSearchbar';
import colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import HeaderBackButton from '../../common/HeaderBack';
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
        headerTransparent: true,
        headerBackImage: () => <HeaderBackButton />,
        headerTitle: '',
      },
    },
    PhoneRegister: {
      screen: AuthScreens.PhoneRegister,
      navigationOptions: {
        headerShown: false,
      },
    },
    Phone: {
      screen: AuthScreens.PhoneLogin,
      navigationOptions: {
        headerShown: false,
      },
    },
    PhoneOtp: {
      screen: AuthScreens.PhoneOTP,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    Register: {
      screen: AuthScreens.register,
      navigationOptions: {
        headerTransparent: true,
        headerBackImage: () => <HeaderBackButton />,
        headerTitle: '',
      },
    },
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
    },
    Chats: {
      screen: Chat_StackNavigator,
    },
    Call: {
      screen: Call_StackNavigator,
    },
  },
  {
    tabBarComponent: Home,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#bbb',
    },
    initialRouteName: 'Chats',
  },
);
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: TabScreen,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    chatRoom: {
      screen: chat.ChatRoom,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
    cameraFromChat: {
      screen: chat.CameraFromChat,
      navigationOptions: ({navigation}) => ({
        safeAreaInsets: {top: 0},
        headerShown: false,
      }),
    },
    contact: {
      screen: contact.contact,
      navigationOptions: ({navigation}) => ({
        headerTitle: '',
        headerShown: false,
        // header: () => <ContactSearchBar navigationProps={navigation} />,
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
Camera_StackNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == 'camera') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
const RootNavigator = createSwitchNavigator({
  // SplashScreen: AuthScreens.Splash,
  // TermAndConditionScreen: AuthScreens.TermAndCondition,
  // AuthScreen: Auth,
  HomeScreen: HomeStack,
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
