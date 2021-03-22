import React from 'react';
import {
  View,
  ListView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
  FlatList,
} from 'react-native';
import InputBox from './InputBox';
import Conversation from './conversation';
const {width, height} = Dimensions.get('window');

class ChatRoom extends React.Component {
  
  render() {
    return (
      <ImageBackground
        source={require('../../../asessts/images/background.png')}
        style={styles.image}>
        <FlatList
          // data={messages}
          renderItem={({item}) => <Conversation myId={myId} message={item} />}
          inverted
        />
        <InputBox />
      </ImageBackground>
    );
  }
}

export default ChatRoom;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
});
