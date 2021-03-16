import React, {Component} from 'react';
import {Dimensions, Image} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
} from 'react-navigation-tabs';
// import {createDrawerNavigator} from 'react-navigation-drawer';
import * as AuthScreens from '../AuthScreens/index';

// Tab Navigation for Login with email and phone
const TabForPhoneEmail = createMaterialTopTabNavigator(
  {
    Phone: {
      screen: AuthScreens.LoginWithPhone,
    },
    Email: {
      screen: AuthScreens.LoginWithEmail,
    },
  },
  {
    tabBarComponent: AuthScreens.UserSelection,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#81b840',
      style: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor:'red'
      },
    },
    initialRouteName: 'Phone',
  },
);
// const Auth = createStackNavigator({
//   Login: {
//     screen: AuthScreens.login,
//     navigationOptions: {
//       headerShown: false,
//     },
//   },
//   // ForgotPassword: {
//   //   screen: AuthScreens.ForgotPassword,
//   //   navigationOptions: {
//   //     headerTitle: '',
//   //     headerStyle: {
//   //       backgroundColor: 'none',
//   //       shadowOffset: {
//   //         height: 0,
//   //         width: 0,
//   //       },
//   //       shadowOpacity: 0,
//   //       elevation: 0,
//   //     },
//   //     headerBackImage: () => <CommonComponents.HeaderBackButton />,
//   //   },
//   // }
// });
const RootNavigator = createSwitchNavigator({
  SplashScreen: AuthScreens.Splash,
  TermAndConditionScreen: AuthScreens.TermAndCondition,
  TabScreen: TabForPhoneEmail
  // RegisterScreen: {
  //   screen: Register_StackNavigator,
  // },
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
