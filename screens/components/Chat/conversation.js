import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Images from 'react-native-chat-images';
// import Sound from 'react-native-sound';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09);
    this.state = {

      message: '',
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      startAudio: false,
    };
  }

  isMyMessage = () => {
    const { myId } = this.props;
    const senderId = '6062cb84ac8ec71b54bfcd2e';
    return senderId === myId;
  };

  renderAudio = () => { };

  onStartPlay = async (e) => {
    const fileName = e.uri.replace('file:///', '');
    const path = Platform.select({
      ios: 'hello.m4a',
      android: fileName,
      // android: `sdcard/1a12d76b-30a3-4c8d-ac8c-3da437854e18.mp4`,
    });
    try {
      const msg = await this.audioRecorderPlayer.startPlayer(path);
      this.audioRecorderPlayer.setVolume(1.0);
      this.audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.current_position === e.duration) {
          console.log('finished');
          // this.audioRecorderPlayer.stopPlayer();
          // this.audioRecorderPlayer.removePlayBackListener();
        }
        this.setState({
          currentPositionSec: e.current_position,
          currentDurationSec: e.duration,
          playTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
          duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    } catch (e) {
      console.log("err======", e)
    }
  };
  render() {
    const { message } = this.props;
    console.log(message)
    return (
      <View
        style={[
          styles.messageBox,
          // {
          //   backgroundColor: this.isMyMessage() ? '#DCF8C5' : 'white',
          //   marginLeft: this.isMyMessage() ? 50 : 0,
          //   marginRight: this.isMyMessage() ? 0 : 50,
          // },
        ]}>
        {/* {!isMyMessage() && <Text style={styles.name}>{plaintext}</Text>} */}
        {message.uri ? (
          <TouchableOpacity
            onPress={() => this.onStartPlay(message)}
            style={{ backgroundColor: 'red' }}>
            <Text>Play</Text>
            <Text>
              {this.state.playTime} / {this.state.duration}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.message}> {message.name} </Text>
        )}
        {/* {this.isMyMessage() && (
          <Text style={styles.message}>{message.messageContent}</Text>
        )} */}

        <Text style={styles.time}>11:45</Text>
      </View>
    );
  }
}

export default Conversation;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
  },
  name: {
    // color: Colors.light.tint,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {},
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
  },
});
