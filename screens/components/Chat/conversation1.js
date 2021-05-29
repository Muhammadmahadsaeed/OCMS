import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Linking,
  PermissionsAndroid,
  Pressable,
  Modal, Dimensions,ScrollView
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
const screenWidth = Dimensions.get('screen').width;


const audioRecorderPlayer = new AudioRecorderPlayer();


const Conversation = (props) => {

  const dir = RNFetchBlob.fs.dirs;
  const [onPressMessage, setOnPressMessage] = useState(false);
  const [playDuration, setPlayDuration] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause,setIsPause] = useState(true);
  const playbackState = usePlaybackState();
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [currentTrackPosition, setCurrentTrackPosition] = useState(0);
  const [currentTrackDuration, setCurrentTrackDuration] = useState(0);
  const { position} = useTrackPlayerProgress();
  const [modalVisible, setModalVisible] = useState(false);
  const [fileExt,setFileExt] = useState(require('../../../asessts/images/pdf.png'))
  
  
  audioRecorderPlayer.setSubscriptionDuration(0.1);


  const [currentPositionSec,setCurrentPos] = React.useState(0);
  const [currentDurationSec,setCurrentDuration] = React.useState(0);
  const [playTime,setPlayTime] = React.useState(0);
  const [duration,setDuration] = React.useState(0);

  const [recordSecs,setRecordSecs] = React.useState(0);

  const isMyMessage = () => {
    const { myId, message } = props;
    return message.userId === myId;
  };

  const playAudio = async(uri) => {

    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({
          ios: 'hello.m4a',
          android: `${dirs.DownloadDir}/`+uri
        });

    
    await AudioManager.startPlayer(path, (res) => {

      const { status } = res

      switch (status) {
        case AudioManager.AUDIO_STATUS.begin: {
          console.log('BEGIN AUDIO')
          setIsPlaying(true);
          break;
        }

        case AudioManager.AUDIO_STATUS.play: {
          const { current_position, duration } = res.data
          setCurrentPos(current_position);
          setDuration(duration);
          break;
        }

        case AudioManager.AUDIO_STATUS.pause: {
         console.log('PAUSE AUDIO')
          setIsPause(true);
          setIsPlaying(false);
          break;
        }

        case AudioManager.AUDIO_STATUS.resume: {
          console.log('RESUME AUDIO');
          setIsPause(false);
          setIsPlaying(true);
          break;
        }

        case AudioManager.AUDIO_STATUS.stop: {
          console.log('STOP AUDIO');
          setIsPlaying(false);
          setIsPause(false);
          break;
        }
      }
    })
  }

  const pauseAudio = async() => {
    await AudioManager.pausePlayer();
    setIsPause(true);
    setIsPlaying(false);
  }

  const isMessageType = () => {
    const { message } = props;
    return message.type;
  };
  const openDocument = async (item) => {
    // console.log(item)
    const AppFolder = 'OCMS';
    const DirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder;
    RNFS.mkdir(DirectoryPath);

    const destPath = `${RNFS.ExternalStorageDirectoryPath}/OCMS/Documents/`;
    await RNFS.copyFile(item.message.url, destPath);

    const fileURL = await RNFS.stat(destPath);

    // FileViewer.open(fileURL.path, { showOpenWithDialog: true })
    //   .then((suc) => console.log(suc))
    //   .catch((err) => console.log(err));
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
    await TrackPlayer.seekTo(value * playTime);
    setSliderValue(value);
    setIsSeeking(false);
  };
  const { message, index } = props;
  // let playWidth = (currentTrackPosition / currentTrackDuration) * (screenWidth - 56);

  // if (!playWidth) {
  //   playWidth = 0;
  // }
  console.log(message.message.uri);


  let width = currentPositionSec/duration * screenWidth -56;
  return (
    <View >
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
          {isMessageType() == 'text' && (
            <View>
              <Text style={styles.message}>{message.messageText}</Text>
              <Text style={styles.time}>11:45</Text>
            </View>
          )}
          {isMessageType() == 'image' && (
            <View style={{ flex: 1 }} >
              <Images images={message.message} />
             
            </View>
          )}
          {isMessageType() == 'document' && (
            <TouchableOpacity
              style={{flex: 1}}
              activeOpacity={0.8}
              onPress={() => openDocument(message)}>
              <View style={styles.documentView}>
                {/* <Image
                  source={require('../../../asessts/images/' + message.fileExt)}
                  style={{height: 50, width: 50}}
                /> */}
                <Text numberOfLines={1} style={styles.documentText}>
                  {message.filename}
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
                  onPress={() => isPlaying ? pauseAudio() : playAudio(message.message.uri)
                  //   !isPlaying ? (
                  //   currentPositionSec == '' ? (
                  //     onStartPlay(message.message.uri) 
                  //   )
                  //   : onResumePlay()
                  // ): onPausePlay()
                }
                  style={{width: 35, height: 35}}>
                  <Image
                    source={
                      isPlaying
                        ? require('../../../asessts/images/pause.png')
                        : require('../../../asessts/images/play.png')
                    }
                    style={{height: '100%', width: '100%'}}
                  />
                </TouchableOpacity>

                <View style={{marginLeft: 15, flex: 1}}>
                  <Slider
                    // style={{width: 400, height: 40}}
                    minimumValue={0}
                    // maximumValue={100}
                    // value = {width}
                    minimumTrackTintColor="#111000"
                    maximumTrackTintColor="#000000"
                    onSlidingStart={slidingStarted}
                    onSlidingComplete={slidingCompleted}
                  />
                  <View>
                    <Text style={styles.duration}>
                      {currentPositionSec ? (currentPositionSec/(100000)).toFixed(2) : message.message.recordTime}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          {/* {isMessageType() == 'video' && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text> Video </Text>
            </TouchableOpacity>
          )} */}
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{ color: 'white' }}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
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
