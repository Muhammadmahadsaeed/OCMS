import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from './constants/colors';
import font from './constants/font';
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
      <LinearGradient
        colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={styles.tabContainer}>
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
                    // paddingHorizontal: 30,
                    // borderBottomWidth: 3,
                    // borderBottomColor: `${isRouteActive ? 'white' : '#075e54'}`,
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
      </LinearGradient>
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
    borderTopColor: 'white',
    borderTopWidth: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: font.Fonts.josefBold,
    fontSize:18
  },
  paymentText: {
    marginTop: 10,
    alignItems: 'center',
  },
});
export default GiverUserTabBar;
