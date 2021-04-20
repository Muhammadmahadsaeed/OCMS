import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import font from '../constants/font';
const Header = (props) => {
  const toggleDrawer = () => {
   
    props.navigationProps.navigation.toggleDrawer()
  };
  return (
    <LinearGradient
      colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 1}}
      style={styles.top}>
      <View>
        <TouchableOpacity
          style={styles.imgContainer}
          activeOpacity={0.8}
          onPress={toggleDrawer}>
          <Image
            source={require('../../asessts/images/menu.png')}
            style={{height: 25, width: 25, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.text}>Community App</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.imgContainer}>
          <Image
            source={require('../../asessts/images/settings.png')}
            style={{height: 25, width: 25, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    backgroundColor: colors.Colors.backgroundColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 12,
    height: 65,
  },
  text: {
    fontSize: 23,
    color: 'white',
    fontFamily: font.Fonts.josefBold,
  },
  imgContainer: {
    marginHorizontal: 5,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
