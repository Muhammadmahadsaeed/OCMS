import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image} from 'react-native';
// importing Segmented Control Tab
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {LoginWithPhone, LoginWithEmail} from '../AuthScreens';

const TobTabNavigation = () => {
  const [customStyleIndex, setCustomStyleIndex] = useState(0);

  const handleCustomIndexSelect = (index) => {
    // Tab selection for custom Tab Selection
    setCustomStyleIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{flexGrow:0.6,backgroundColor:'green'}}>
            <Image source={require('../../../asessts/images/aboutreact.png')} />
        </View>
        <View style={styles.footer}>
          <SegmentedControlTab
            values={['Login', 'Sign up']}
            selectedIndex={customStyleIndex}
            onTabPress={handleCustomIndexSelect}
            borderRadius={0}
            tabsContainerStyle={{
              height: 50,
              backgroundColor: '#F2F2F2',
            }}
            tabStyle={{
              backgroundColor: '#F2F2F2',
              borderWidth: 0,
              borderColor: 'transparent',
            }}
            activeTabStyle={{backgroundColor: 'white', marginTop: 2}}
            tabTextStyle={{color: '#444444', fontWeight: 'bold'}}
            activeTabTextStyle={{color: '#888888'}}
          />
          {customStyleIndex === 0 && <LoginWithPhone />}
          {customStyleIndex === 1 && <LoginWithEmail />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TobTabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  headerText: {
    padding: 8,
    fontSize: 14,
    color: '#444444',
    textAlign: 'center',
  },
  tabContent: {
    color: '#444444',
    fontSize: 18,
    margin: 24,
  },

  tabStyle: {
    borderColor: '#D52C43',
  },
  activeTabStyle: {
    backgroundColor: '#D52C43',
  },
  footer: {
    flex: 0.4,
    backgroundColor: '#e9ba00',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
