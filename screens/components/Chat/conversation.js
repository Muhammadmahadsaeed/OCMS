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
    console.log(e);
    const fileName = e.message.uri.replace('file:///', '');
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
          this.audioRecorderPlayer.stopPlayer()
          .catch(err => console.log(err))
          this.audioRecorderPlayer.removePlayBackListener();
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
      console.log('err======', e);
    }
  };
  isMessageType = () => {
    const {message} = this.props;
    return message.type;
  };
  openDocument = async (item) => {
    // const url =
    //   'content://com.android.providers.downloads.documents/document/418';

    // const destPath = `${RNFS.DownloadDirectoryPath}/OCMS/`;
    // await RNFS.copyFile(url, destPath);

    // console.log(await RNFS.stat(destPath));
    // Linking.openURL('file:///data/user/0/com.ocms/cache/1' )
    //   .then((supported) => {
    //     console.log(supported);
    //   })
    //   .catch((err) => console.log(err));
  };
  render() {
    const {message} = this.props;
    console.log(message.message.text)
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
        {this.isMessageType() == 'text' && (
          <View>
            <Text style={styles.message}>{message.message.text}</Text>
            <Text style={styles.time}>11:45</Text>
          </View>
        )}
        {this.isMessageType() == 'image' && (
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
          <TouchableOpacity
            onPress={() => this.onStartPlay(message)}
            style={{backgroundColor: 'red'}}>
            <Text>Play</Text>
           
          </TouchableOpacity>
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
