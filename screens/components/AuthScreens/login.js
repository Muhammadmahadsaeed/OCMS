import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View,Text, StyleSheet, Image} from 'react-native';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../asessts/images/aboutreact.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <Text>sajkjfkjsakfja</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
