import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const LoginPhoneEmailButton = ({navigationProps}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigationProps.navigation.navigate('Phone')}>
        <Text>Login With Phone</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigationProps.navigation.navigate('AuthScreen')}
        activeOpacity={0.9}>
        <Text>Login With Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPhoneEmailButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    marginVertical: 5,
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
