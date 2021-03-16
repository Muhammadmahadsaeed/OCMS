import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const TermAndConditon = ({navigation}) => {
  const goToSelectionScreen = () => {
   
    navigation.navigate('TabScreen')
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>OCMS</Text>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
      </View>
      <View style={styles.heading}>
        <Image
          source={require('../../../asessts/images/aboutreact.png')}
          style={{width: '90%', resizeMode: 'contain', margin: 30}}
        />
      </View>
      <View style={styles.heading}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.9}
          onPress={() => goToSelectionScreen()}>
          <Text style={styles.buttonTextStyle}>Agree and continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermAndConditon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#307ecc',
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    color: '#FFFFFF',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
