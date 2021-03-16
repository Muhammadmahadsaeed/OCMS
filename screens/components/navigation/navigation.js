import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

// import {createDrawerNavigator} from 'react-navigation-drawer';
import * as AuthScreens from '../AuthScreens/index';
import * as AllNavigation from './index';

const RootNavigator = createSwitchNavigator({
  SplashScreen: AuthScreens.Splash,
  TermAndConditionScreen: AuthScreens.TermAndCondition,
  // TabScreen: AllNavigation.TobTabNavigation,
  TabScreen: AllNavigation.Auth,
  register: {
    screen: AllNavigation.Register_StackNavigator,
  },
});

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;
