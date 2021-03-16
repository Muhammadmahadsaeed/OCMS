import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image,Text} from 'react-native';

const LoginWithEmail = ({navigation}) => {
  return (
    <View style={styles.container}>
     <Text>LoginWithEmail</Text>
    </View>
  );
};

export default LoginWithEmail;

const styles = StyleSheet.create({
  container: {
  
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
