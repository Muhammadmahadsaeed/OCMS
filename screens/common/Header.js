import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Header = () => (
  <View style={styles.top}>
    <Text style={styles.logo}>WhatsApp</Text>
    <View style={styles.icons}>
      <TouchableOpacity style={styles.imgContainer}>
        <Image
          source={require('../../asessts/images/search.png')}
          style={{height: 25, width: 25}}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.imgContainer}>
        <Image
          source={require('../../asessts/images/more.png')}
          style={{height: 25, width: 25,resizeMode:'contain'}}
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    backgroundColor: '#075e54',
    borderColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  logo: {
    fontSize: 23,
    color: '#fff',
    margin: 10,
    fontWeight: '500',
  },
  icons: {
    flexDirection: 'row',
  },
  imgContainer: {
    marginHorizontal: 5,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
