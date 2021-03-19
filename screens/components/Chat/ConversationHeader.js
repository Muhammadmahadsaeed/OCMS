import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const ConversationHeader = (props) => (
  <View style={styles.header}>
    <View style={styles.left}>
      <TouchableOpacity onPress={() => props.navigationProps.pop()}>
      <Image
        source={require('../../../asessts/images/left-arrow.png')}
        style={styles.icon}
      />
      </TouchableOpacity>
      {/* <Image source={{uri: this.props.image}} style={styles.chatImage} /> */}
      <TouchableOpacity>
        <Text style={styles.chatTitle}>Mahad</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.right}>
      <Image
        source={require('../../../asessts/images/video-camera.png')}
        style={styles.icon}
      />
      <Image
        source={require('../../../asessts/images/call.png')}
        style={styles.icon}
      />
      <Image
        source={require('../../../asessts/images/more.png')}
        style={styles.icon}
      />
    </View>
  </View>
);

export default ConversationHeader;

const styles = StyleSheet.create({
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  icon: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
});
