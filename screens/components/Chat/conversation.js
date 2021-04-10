import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

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
  }

  isMyMessage = () => {
    const {message,myid} = this.props;
    const senderId = '606c09f764a37520dc978307';
    return senderId === myid;
  };
  play = () => {
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
  renderAudio = () => {
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

  onStartPlay = async (e) => {
    console.log('onStartPlay');
    const path = Platform.select({
      ios: 'hello.m4a',
      android: `file:///sdcard/2f89d5bb-159d-4e82-b29c-c2f4783b6b97.mp4`,
    });
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    this.audioRecorderPlayer.setVolume(1.0);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      // this.setState({
      //   currentPositionSec: e.current_position,
      //   currentDurationSec: e.duration,
      //   playTime: this.audioRecorderPlayer.mmssss(
      //     Math.floor(e.current_position),
      //   ),
      //   duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      // });
    });
  };
  render() {
    const {message} = this.props;
    console.log(message.name)
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.messageBox,
            {
              backgroundColor:'red'
              // backgroundColor: this.isMyMessage() ? '#DCF8C5' : 'white',
            //   marginLeft: this.isMyMessage() ? 50 : 0,
            //   marginRight: this.isMyMessage() ? 0 : 50,
            },
          ]}>
          {/* {!isMyMessage() && <Text style={styles.name}>{plaintext}</Text>} */}
          <TouchableOpacity onPress={this.onStartPlay} style={{backgroundColor:'red'}}>
            <Text>Play</Text>
          </TouchableOpacity>
          {/* {this.isMyMessage() && <Text style={styles.message}>mahad</Text>} */}
          <Text style={styles.message}> {message.name} </Text>
          <Text style={styles.time}>11:45</Text>
        </View>
      </View>
    );
  }
}

export default Conversation;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor:'red'
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
