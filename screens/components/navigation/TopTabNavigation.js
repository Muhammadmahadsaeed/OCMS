import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
// importing Segmented Control Tab
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {  LoginPhoneEmailButton,
  RegisterPhoneEmailButton,} from '../AuthScreens';

const TopTabNavigation = (navigation) => {
  const [customStyleIndex, setCustomStyleIndex] = useState(0);

  const handleCustomIndexSelect = (index) => {
    // Tab selection for custom Tab Selection
    setCustomStyleIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerImage}>
            <Image
              style={styles.img}
              source={require('../../../asessts/images/aboutreact.png')}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <SegmentedControlTab
            values={['Login', 'Sign up']}
            selectedIndex={customStyleIndex}
            onTabPress={handleCustomIndexSelect}
            borderRadius={5}
            // tabsContainerStyle={{
            //   backgroundColor: '#F2F2F2',
            // }}
            tabStyle={{
              backgroundColor:'none',
              backgroundColor: '#e9ba00',
              borderWidth: 1,
              borderColor: 'transparent',
              paddingVertical:15
              // borderRadius:50
            }}
            activeTabStyle={{
              backgroundColor: '#e9ba00',
              borderBottomColor: 'black',
            }}
            tabTextStyle={{color: '#444444', fontWeight: 'bold'}}
            activeTabTextStyle={{color: '#888888'}}
          />
          {customStyleIndex === 0 && <LoginPhoneEmailButton navigationProps={navigation} />}
          {customStyleIndex === 1 && <RegisterPhoneEmailButton navigationProps={navigation}/>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopTabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexGrow: 0.6,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '70%',
  },
  img: {
    resizeMode: 'contain',
    width: '100%',
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
    // flex: 0.5,
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
