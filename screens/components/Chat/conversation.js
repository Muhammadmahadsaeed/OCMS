import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Linking,
  PermissionsAndroid, Pressable, Modal
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
import Slider from '@react-native-community/slider';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import font from '../../constants/font';
import FileViewer from 'react-native-file-viewer';
import * as AudioManager from './AudioManager';
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
} from 'react-native-track-player';

const Conversation = (props) => {
  const [onPressMessage, setOnPressMessage] = useState(false);
  const [playDuration, setPlayDuration] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackState = usePlaybackState();
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const { position, duration } = useTrackPlayerProgress(250);
  const [modalVisible, setModalVisible] = useState(false);
  // constructor(props) {
  //   super(props);
  //   this.audioRecorderPlayer = new AudioRecorderPlayer();
  //   this.audioRecorderPlayer.setSubscriptionDuration(0.09);
  //   this.animatedValue = new Animated.Value(0);
  //   this.state = {
  //     message: '',
  //     recordTime: '00:00:00',
  //     currentPositionSec: 0,
  //     currentDurationSec: 0.1,
  //     duration: '00:00:00',
  //     startAudio: false,
  //     AudioStatus: true,
  //     isPause: false,
  //     onPressMessage: false,
  //     playDuration: '',
  //   };
  // }

  // componentDidMount() {
  //   Animated.timing(this.animatedValue, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // }
  const isMyMessage = () => {
    const { myId, message } = props;
    return message.userId === myId;
  };
  const onStartPlay = async (e) => {
    if (!isPlaying) {
      setIsPlaying(true);
      const fileName = e.message.uri.replace('file:///', '');
      TrackPlayer.setupPlayer();
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: 'trackId',
        url: fileName,
        title: 'Track Title',
        artist: 'Track Artist',
      });
      await TrackPlayer.play();
    } else {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };

  // onPause = () => {
  //   this.setState({isPlay: false});
  //   TrackPlayer.pause();
  // };
  // onStartPlay = async (e) => {
  //   const fileName = e.message.uri.replace('file:///', '');
  //   const path = Platform.select({
  //     ios: 'hello.m4a',
  //     android: fileName,
  //   });
  //   try {
  //     await AudioManager.startPlayer(path, (res) => {
  //       const {status} = res;
  //       switch (status) {
  //         case AudioManager.AUDIO_STATUS.begin:
  //           this.setState({isPlay: true});
  //           break;
  //         case AudioManager.AUDIO_STATUS.play: {
  //           const {current_position, duration} = res.data;
  //           this.millisToMinutesAndSeconds(current_position);
  //           this.setState({
  //             isPlay: true,
  //             currentPositionSec: current_position,
  //             currentDurationSec: duration,
  //           });
  //           break;
  //         }
  //         case AudioManager.AUDIO_STATUS.pause: {
  //           console.log('PAUSE AUDIO');
  //           // this.setState({isPlay: false});
  //           // this.pauseAudio()
  //           // this.setState({isPause: true});
  //           break;
  //         }
  //         case AudioManager.AUDIO_STATUS.resume: {
  //           console.log('RESUME AUDIO');
  //           // AudioManager.pausePlayer()
  //           // this.setState({isPlay: false});
  //           // this.pauseAudio()
  //           break;
  //         }

  //         case AudioManager.AUDIO_STATUS.stop: {
  //           console.log('STOP AUDIO');
  //           this.setState({isPlay: false});
  //           break;
  //         }
  //       }
  //     });
  //   } catch (e) {
  //     console.log('err======', e);
  //   }
  // };
  // async pauseAudio() {
  //   await AudioManager.pausePlayer()
  // }

  // millisToMinutesAndSeconds(millis) {
  //   var minutes = Math.floor(millis / 60000);
  //   var seconds = ((millis % 60000) / 1000).toFixed(0);
  //   let time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  //   this.setState({playDuration: time});
  // }
  const isMessageType = () => {
    const { message } = props;
    return message.type;
  };
  const openDocument = async (item) => {
    const AppFolder = 'OCMS';
    const DirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder;
    RNFS.mkdir(DirectoryPath);

    const destPath = `${RNFS.ExternalStorageDirectoryPath}/OCMS/Documents/`;
    await RNFS.copyFile(item.message.fileUri, destPath);

    const fileURL = await RNFS.stat(destPath);
    FileViewer.open(fileURL.path, { showOpenWithDialog: true })
      .then((suc) => console.log(suc))
      .catch((err) => console.log(err));
  };
  const onSelectMsg = (message) => {
    if (onPressMessage === false) {
      toggleSelect();
    }
    props.getSelectedMessage(message);
  };
  const toggleSelect = () => {
    setOnPressMessage(!onPressMessage);
  };
  const removeSelectMsg = () => {
    if (onPressMessage) {
      toggleSelect();
    }
    props.getSelectedMessage(null);
  };
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);
  const slidingStarted = () => {
    setIsSeeking(true);
  };
  const slidingCompleted = async (value) => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };
  const { message } = props;
  return (
    <View
      style={
        onPressMessage
          ? { backgroundColor: 'green', margin: 2 }
          : { backgroundColor: 'transparent', margin: 2 }
      }>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => onSelectMsg(message)}
        onPress={() => removeSelectMsg(message)}
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
            marginVertical: isMyMessage() ? 5 : 5,
          },
        ]}>
        {isMessageType() == 'Text' && (
          <View>
            <Text style={styles.message}>{message.message.text}</Text>
            <Text style={styles.time}>11:45</Text>
          </View>
        )}
        {isMessageType() == 'Image' && (
          <View style={{ flex: 1 }}>
            <Images images={message.message.image} />
          </View>
        )}
        {isMessageType() == 'document' && (
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.8}
            onPress={() => openDocument(message)}>
            <View style={styles.documentView}>
              <Image
                source={require('../../../asessts/images/pdf.png')}
                style={{ height: 50, width: 50 }}
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
        {isMessageType() == 'audio' && (
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onStartPlay(message)}
                style={{ width: 35, height: 35 }}>
                <Image
                  source={
                    isPlaying
                      ? require('../../../asessts/images/pause.png')
                      : require('../../../asessts/images/play.png')
                  }
                  style={{ height: '100%', width: '100%' }}
                />
              </TouchableOpacity>

              <View style={{ marginLeft: 15, flex: 1 }}>
                <Slider
                  // style={{width: 400, height: 40}}
                  minimumValue={0}
                  maximumValue={1}
                  value={sliderValue}
                  minimumTrackTintColor="#111000"
                  maximumTrackTintColor="#000000"
                  onSlidingStart={slidingStarted}
                  onSlidingComplete={slidingCompleted}
                />
                <View>
                  <Text style={styles.duration}>
                    {playDuration ? playDuration : message.message.recordTime}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        {isMessageType() == 'Video' && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text> Video </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{flex:1,backgroundColor:'black'}}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{color:'white'}}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
  // }
};

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
  duration: {
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
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'gray',
  },
});
