import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CryptoJS from 'crypto-js';
import Sound from 'react-native-sound';
const Conversation = (ChatMessageProps) => {
  const {message, myId} = ChatMessageProps;
  let bytes = CryptoJS.AES.decrypt(message, 'secret key 123');
  let plaintext = bytes.toString(CryptoJS.enc.Utf8);
  const [playAudio, setPlayAudio] = useState(false);
  const isMyMessage = () => {
    return message.id === myId;
  };
  const play = () => {
    setPlayAudio(true);
    console.log('play');
    const sound = new Sound(message.audio, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      }
      setPlayAudio(false);
      sound.play((success) => {
        console.log(success, 'success play');
        if (!success) {
          Alert.alert('There was an error playing this audio');
        }
      });
    });
  };
  const renderAudio = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          play();
        }}>
        <Image
          source={require('../../../asessts/images/play.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}>
        {!isMyMessage() && <Text style={styles.name}>{plaintext}</Text>}

        {/* <Text style={styles.message}>Hello mahad</Text>
        <Text style={styles.time}>11:45</Text> */}
      </View>
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'red',
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
  },
  name: {
    color: 'black',
    // color: Colors.light.tint,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    color: 'black',
  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
  },
});
