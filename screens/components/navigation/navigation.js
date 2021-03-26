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
    PhoneOtp:{
      screen: AuthScreens.PhoneOTP,
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => (
        //   <CommonComponents.HamBurger navigationProps={navigation} />
        // ),
        safeAreaInsets: {top: 0},
        headerTitle: '',
        headerStyle: {
          backgroundColor: 'transparent',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
      }),
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
        // headerLeft: () => (
        //   <CommonComponents.HamBurger navigationProps={navigation} />
        // ),
        safeAreaInsets: {top: 0},
        headerTitleStyle: {
          alignSelf: 'center',
          color: 'white',
          fontFamily: font.Fonts.josefBold,
          
        },
        headerTitle: 'Community App',
        headerBackground: () => (
          <LinearGradient
            colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 1}}
            style={{flex: 1}}
          />
        ),
        headerStyle: {
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
        // headerRight: () => (
        //   <CommonComponents.ShopButton navigationProps={navigation} />
        // ),
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

const RootNavigator = createSwitchNavigator({
  SplashScreen: AuthScreens.Splash,
  TermAndConditionScreen: AuthScreens.TermAndCondition,
  AuthScreen: Auth,
  HomeScreen: HomeStack,
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
