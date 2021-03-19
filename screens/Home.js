import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Header from './common/Header';

const GiverUserTabBar = (props) => {
  const {
    navigationState,
    navigation,
    activeTintColor,
    inactiveTintColor,
  } = props;
  const activeTabIndex = navigation.state.index;

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.tabContainer}>
        {navigationState.routes.map((route, index) => {
          const isRouteActive = index === activeTabIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(route.routeName)}
              key={index}>
              {route.routeName === 'Camera' ? (
                <Image source={require('../asessts/images/camera.png')} />
              ) : (
                <View
                  style={{
                    paddingHorizontal: 30,
                    borderBottomWidth: 3,
                    borderBottomColor: `${isRouteActive ? 'white' : '#075e54'}`,
                  }}>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: `${tintColor}`,
                      },
                    ]}>
                    {route.routeName}
                  </Text>
                </View>
              )}
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  paymentContainer: {
    marginTop: 10,
    height: '20%',
    width: '100%',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#075e54',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: 'Montserrat-Bold_0',
  },
  paymentText: {
    marginTop: 10,
    alignItems: 'center',
  },
});
export default GiverUserTabBar;
