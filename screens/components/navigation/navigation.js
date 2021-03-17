import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

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

const RootNavigator = createSwitchNavigator({
  SplashScreen: AuthScreens.Splash,
  TermAndConditionScreen: AuthScreens.TermAndCondition,
  TabScreen: AllNavigation.TopTabNavigation,
  AuthScreen: Auth,
  Register: {
    screen: AllNavigation.Register_StackNavigator,
  },
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
