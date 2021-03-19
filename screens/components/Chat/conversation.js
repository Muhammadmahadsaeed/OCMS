import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Conversation = () => (
  <View style={styles.top}>
    <Text style={styles.logo}>Conversation</Text>
  
  </View>
);

export default Conversation;

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
