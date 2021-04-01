import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  PermissionsAndroid,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import CryptoJS from 'crypto-js';
// import {createMessage, updateChatRoom} from '../../src/graphql/mutations';

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }
  // state = {
  //   message: '',
  //   startAudio: false,
  //   hasPermission: false,
  //   audioPath: `${
  //     AudioUtils.DocumentDirectoryPath
  //   }/${this.messageIdGenerator()}test.aac`,
  //   playAudio: false,
  //   fetchChats: false,
  //   audioSettings: {
  //     SampleRate: 22050,
  //     Channels: 1,
  //     AudioQuality: 'Low',
  //     AudioEncoding: 'aac',
  //     MeteringEnabled: true,
  //     IncludeBase64: true,
  //     AudioEncodingBitRate: 32000,
  //   },
  // };
  messageIdGenerator() {
    // generates uuid.
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  // const [message, setMessage] = useState('');
  // const [myUserId, setMyUserId] = useState(null);
  // const [startAudio,setAudio] = useState(false)
  // const [playAudio,setPlayAudio] = useState(false)
  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       const userInfo = await Auth.currentAuthenticatedUser();
  //       setMyUserId(userInfo.attributes.sub);
  //     };
  //     fetchUser();
  //   }, []);

  onMicrophonePress = () => {
    console.warn('Microphone');
  };

  //   updateChatRoomLastMessage = async (messageId) => {
  //     try {
  //       await API.graphql(
  //         graphqlOperation(updateChatRoom, {
  //           input: {
  //             id: chatRoomID,
  //             lastMessageID: messageId,
  //           },
  //         }),
  //       );
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  onSendPress = async () => {
    const {message} = this.state;
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(message, 'secret key 123').toString();
    this.props.getDataFromInput(ciphertext);

    // try {
    //   const newMessageData = await API.graphql(
    //     graphqlOperation(createMessage, {
    //       input: {
    //         content: message,
    //         userID: myUserId,
    //         chatRoomID,
    //       },
    //     }),
    //   );
    //   await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
    // } catch (e) {
    //   console.log(e);
    // }
    this.setState({message: ''});
  };
  componentDidMount() {
    this.checkPermission().then(async (hasPermission) => {
      this.setState({hasPermission});
      if (!hasPermission) return;
    });
  }
  checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }
    const rationale = {
      title: 'Microphone Permission',
      message:
        'AudioExample needs access to your microphone so you can record audio.',
    };
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      rationale,
    ).then((result) => {
      console.log('Permission result:', result);
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }
  onPress = () => {
    if (!this.state.message) {
      this.handleAudio();
    } else {
      this.onSendPress();
    }
  };
  handleAudio = async () => {
    const path = 'hello.m4a';
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      });
    });
    console.log(`uri: ${uri}`);
  };

  render() {
    const {message} = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={{width: '100%'}}>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <Image
              source={require('../../../asessts/images/searchIcon.png')}
              style={styles.icon}
            />

            <TextInput
              placeholder={'Type a message'}
              style={styles.textInput}
              multiline
              value={message}
              onChangeText={(text) => this.setState({message: text})}
            />
            <Image
              source={require('../../../asessts/images/searchIcon.png')}
              style={styles.icon}
            />
            {!message && (
              <Image
                source={require('../../../asessts/images/searchIcon.png')}
                style={styles.icon}
              />
            )}
          </View>
          <TouchableOpacity onPress={this.onPress}>
            <View style={styles.buttonContainer}>
              {!message ? (
                <Image
                  source={require('../../../asessts/images/enableMic.png')}
                  style={styles.icon}
                />
              ) : (
                //   <MaterialCommunityIcons
                //     name="microphone"
                //     size={28}
                //     color="white"
                //   />
                <Text>ll</Text>
                //   <MaterialIcons name="send" size={28} color="white" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default InputBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 50,
    marginRight: 7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  buttonContainer: {
    backgroundColor: '#075E54',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
