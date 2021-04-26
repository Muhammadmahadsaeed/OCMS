import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import Images from 'react-native-chat-images';
// import Sound from 'react-native-sound';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import font from '../../constants/font';
import FileViewer from 'react-native-file-viewer';
import * as AudioManager from './AudioManager';
class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09);
    this.animatedValue = new Animated.Value(0);
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
      IsPlay: false,
      isPause: false
    };
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
  isMyMessage = () => {
    const {myId, message} = this.props;
    return message.userId === myId;
  };

  renderAudio = () => {};

  onStartPlay = async (e) => {
    this.setState({play: true});
    const fileName = e.message.uri.replace('file:///', '');
    const path = Platform.select({
      ios: 'hello.m4a',
      android: fileName,
      // android: `sdcard/1a12d76b-30a3-4c8d-ac8c-3da437854e18.mp4`,
    });
    try {
      await AudioManager.startPlayer(path, (res) => {
        const {status} = res;
        switch (status) {
          case AudioManager.AUDIO_STATUS.begin:
            this.setState({play: true});
            break;
          case AudioManager.AUDIO_STATUS.play: {
            const {current_position, duration} = res.data;
            console.log('duration:=====', current_position);
            this.setState({ playDuration: current_position,IsPlay: false })
            break;
          }
          case AudioManager.AUDIO_STATUS.pause: {
            console.log('PAUSE AUDIO');
            this.setState({isPause: true});
            break;
          }
          case AudioManager.AUDIO_STATUS.resume: {
            // console.log(('RESUME AUDIO')
            this.setState({ isPause: false })
            break;
          }

          case AudioManager.AUDIO_STATUS.stop: {
            console.log('STOP AUDIO');
            this.setState({IsPlay: false, isPause: false});
            break;
          }
        }
      });
      // const msg = await this.audioRecorderPlayer.startPlayer(path);
      // this.audioRecorderPlayer.setVolume(1.0);
      // this.audioRecorderPlayer.addPlayBackListener((e) => {
      //   if (e.current_position === e.duration) {
      //     console.log('finished');
      //     this.setState({play: false});
      //     this.audioRecorderPlayer
      //       .stopPlayer()
      //       .catch((err) => console.log(err));
      //     this.audioRecorderPlayer.removePlayBackListener();
      //   }
      //   this.setState({
      //     currentPositionSec: e.current_position,
      //     currentDurationSec: e.duration,
      //     playTime: this.audioRecorderPlayer.mmssss(
      //       Math.floor(e.current_position),
      //     ),
      //     duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      //   });
      // });
    } catch (e) {
      console.log('err======', e);
    }
  };
  isMessageType = () => {
    const {message} = this.props;
    return message.type;
  };
  openDocument = async (item) => {
    const AppFolder = 'OCMS';
    const DirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder;
    RNFS.mkdir(DirectoryPath);

    const destPath = `${RNFS.ExternalStorageDirectoryPath}/OCMS/Documents/`;
    await RNFS.copyFile(item.message.fileUri, destPath);

    const fileURL = await RNFS.stat(destPath);
    FileViewer.open(fileURL.path, {showOpenWithDialog: true})
      .then((suc) => console.log(suc))
      .catch((err) => console.log(err));
  };
  async pauseAudio() {
    await AudioManager.pausePlayer();
  }
  render() {
    const {message} = this.props;
    return (
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: this.isMyMessage() ? '#DCF8C5' : 'white',
            marginLeft: this.isMyMessage() ? 50 : 0,
            marginRight: this.isMyMessage() ? 0 : 50,
            marginVertical: this.isMyMessage() ? 5 : 5,
          },
        ]}>
        {this.isMessageType() == 'Text' && (
          <View>
            <Text style={styles.message}>{message.message.text}</Text>
            <Text style={styles.time}>11:45</Text>
          </View>
        )}
        {this.isMessageType() == 'Image' && (
          <View style={{flex: 1}}>
            <Images images={message.message.image} />
          </View>
        )}
        {this.isMessageType() == 'document' && (
          <TouchableOpacity
            style={{flex: 1}}
            activeOpacity={0.8}
            onPress={() => this.openDocument(message)}>
            <View style={styles.documentView}>
              <Image
                source={require('../../../asessts/images/pdf.png')}
                style={{height: 50, width: 50}}
              />
              <Text numberOfLines={1} style={styles.documentText}>
                {message.message.fileName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.time}>11:45</Text>
              <Text style={styles.time}>11:45</Text>
            </View>
          </TouchableOpacity>
        )}
        {this.isMessageType() == 'audio' && (
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.onStartPlay(message)}
              style={{width: 40, height: 40}}>
              <Image
                source={
                  this.state.IsPlay
                    ? require('../../../asessts/images/pause.png')
                    : require('../../../asessts/images/play.png')
                }
                style={{height: '100%', width: '100%'}}
              />
            </TouchableOpacity>
          </View>
        )}
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
  message: {
    fontFamily: font.Fonts.josefReg,
    fontSize: 18,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
    fontFamily: font.Fonts.josefReg,
  },
  documentView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  documentText: {
    flex: 1,
    fontFamily: font.Fonts.josefReg,
    fontSize: 15,
  },
});
{
  /* {message.uri ? (
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
        )} */
}
