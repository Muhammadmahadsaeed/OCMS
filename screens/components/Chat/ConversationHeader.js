import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../constants/colors';

const ConversationHeader = (props) => {
  const user = props.navigationProps.getParam('singleUser');

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.left}>
          <View style={styles.headerBack}>
            <TouchableOpacity
              style={styles.headerBack}
              activeOpacity={0.8}
              onPress={() => props.navigationProps.pop()}>
              <Image
                source={require('../../../asessts/images/left-arrow.png')}
                style={styles.backIcon}
              />
              <Image source={{uri: user.url}} style={styles.chatImage} />
            </TouchableOpacity>
          </View>

          <View style={styles.chatTitle}>
            <TouchableOpacity
              onPress={() => props.navigationProps.navigate('profile')}
              activeOpacity={0.8}>
              <Text style={styles.titleText}>Muhammad Mahad saeed</Text>
              <Text style={styles.titleText}>last seen today 11:20 am</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.right}>
          <View style={styles.rightIcon}>
            <TouchableOpacity style={styles.rightImg}>
              <Image
                source={require('../../../asessts/images/video-camera.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rightIcon}>
            <TouchableOpacity style={styles.rightImg}>
              <Image
                source={require('../../../asessts/images/call.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.rightImg}>
              <Image
                source={require('../../../asessts/images/more.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ConversationHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: Colors.Colors.backgroundColor,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  headerBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  backIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    margin: 2,
  },
  chatTitle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
    marginVertical: 10,
  },
  titleText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  right: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    marginRight: 10,
  },
  rightImg: {
    padding: 5,
    
  },

  icon: {
    height: '100%',
    width: 25,
    resizeMode: 'contain',
  },
});
