import React from 'react';
import {
  View,
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
import ConversationHeader from './ConversationHeader';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import font from '../../constants/font';
import CryptoJS from 'crypto-js';
import socketIO from 'socket.io-client';
import Animated from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import axios from 'axios';
import {api} from '../../config/env';
import ImagePicker from 'react-native-image-crop-picker';
const socket = socketIO('http://192.168.1.62:4000', {
  transports: ['websocket'],
  jsonp: false,
});
socket.connect();

socket.on('connect', () => {
  console.log('connected to socket server');
});
class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.InputBoxRef = React.createRef();
    this.state = {
      userId: 2,
      isMessageSelected: false,
      data: [
        {
          msgId: 1,
          userId: 1,
          type: 'Text',
          message: {
            text: 'hello',
          },
          selected: false,
        },
        {
          msgId: 2,
          userId: 1,
          type: 'Video',
          message: {
            text: 'video',
          },
          selected: false,
        },
        {
          msgId: 2,
          userId: 2,
          type: 'Text',
          message: {
            text: 'hi',
          },
          selected: false,
        },
        {
          msgId: 3,
          userId: 1,
          type: 'Text',
          message: {
            text: 'kaise ho',
          },
          selected: false,
        },
        {
          msgId: 4,
          userId: 2,
          type: 'Text',
          message: {
            text: 'theek',
          },
          selected: false,
        },

        {
          msgId: 5,
          userId: 1,
          type: 'Text',
          message: {
            text: 'tm btao',
          },
          selected: false,
        },
      ],
      // data: [],

      receiverId: '',
    };
  }
  componentDidMount() {
    const converstion = this.props.navigation.getParam('converstion');
    this.setState({
      receiverId: converstion._id,
      // userId: '6062cb84ac8ec71b54bfcd2e',
    });
    // this.getMessages();
    // socket.on('output', (msg) => {
    //   this.getMessages();
    // });
  }
  getDataFromInput = (msg) => {
    // fetch(`${api}chat/`, {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     senderId: '605444a8e2924b2bec69e360',
    //     receiverId: this.state.receiverId,
    //     messageType: 'Text',
    //     messageContent: msg.message,
    //     sentTime: '2021-04-23 00:12:01',
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    this.setState({data: [...this.state.data, msg]});
    // })
    // .catch((err) => console.log(err));
    // this.setState({data: [...this.state.data, msg]});
    // socket.emit('input', {
    //   name: 'mahad',
    //   messageContent: msg,
    //   senderId: '6062cb84ac8ec71b54bfcd2e', //login user id
    //   receiverId: this.state.receiverId, //recvr user id
    //   sentTime: '2021-03-31 09:37',
    // });
  };
  getMessages = () => {
    const converstion = this.props.navigation.getParam('converstion');
    fetch(`${api}chat/conservation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        senderId: '605444a8e2924b2bec69e360', //login user id
        receiverId: converstion._id, //recvr user id
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // let message = json.data.map((item) => {
        //   let bytes = CryptoJS.AES.decrypt(
        //     item.messageContent,
        //     'secret key 123',
        //   );
        //   let encryptedMsg = bytes.toString(CryptoJS.enc.Utf8);

        //   return {
        //     _id: item._id,
        //     isRead: item.isRead,
        //     messageContent: encryptedMsg,
        //     messageType: item.messageType,
        //     receivedTime: item.receivedTime,
        //     receiverId: item.receiverId,
        //     senderId: item.senderId,
        //     sentTime: item.sentTime,
        //   };
        // });
        // this.setState({chatMessages: [...this.state.chatMessages, ...message]});
        // this.setState({data: [...this.state.data, ...message]});
        this.setState({data: json.data.reverse()});
      })
      .catch((err) => console.log(err));
  };

  selectDocument = async () => {
    this.RBSheet.close();
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      for (const result of res) {
        const fileName = result.uri.replace('file://', '');
        RNFetchBlob.fs
          .readStream(fileName, 'base64', 1048576)
          .then((ifStream) => {
            ifStream.open();
            ifStream.onData((data) => {
              let base64 = `data:${result.type};base64,${data}`;
              const fileExt = result.type.split('/');
              const param = {
                base64: base64,
                height: 300,
                width: 300,
                fileName: result.name,
                size: 1048576, // size, in bytes
                type: result.type,
                ext: fileExt[1],
                fileUri: result.uri,
              };
              let messageObj = {
                userId: 2,
                type: 'document',
                message: param,
              };
              this.getDataFromInput(messageObj);
            });
            ifStream.onError((err) => {
              console.log(err);
            });
          });
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        console.log('Canceled from single doc picker');
      } else {
        //For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  selectImage = () => {
    this.RBSheet.close();
    this.props.navigation.navigate('imageGrid');
    // this.InputBoxRef.current.getAlert();
    // ImagePicker.openPicker({
    //   multiple: true,
    //   // includeBase64: true,
    //   compressImageQuality: 0.8,
    //   maxFiles: 5,
    //   compressImageMaxHeight: 400,
    //   compressImageMaxWidth: 300,
    //   mediaType: 'photo',
    // })
    //   .then((images) => {
    //     if (images.length > 5) {
    //       console.log('5 s zaida h bhai');
    //     } else {
    //       // const imageName = images[0].path.split("/").pop()
    //       // const data = new FormData();
    //       // data.append('img', {
    //       //   name: imageName,
    //       //   type: images[0].mime,
    //       //   uri:
    //       //     Platform.OS === 'android'
    //       //       ? images[0].path
    //       //       : images[0].path.replace('file://', ''),
    //       // });
    //       // fetch('http://192.168.1.30:3000/image/upload', {
    //       //   method: 'POST',
    //       //   body: data,
    //       //   headers: {
    //       //     'Content-Type': 'multipart/form-data',
    //       //   },
    //       // })
    //       //   .then((response) => response.json())
    //       //   .then((json) => {
    //       //     console.log(json);
    //       //   })
    //       //   .catch((err) => console.log('err======', err));
    //       let imageArr = images.map((item) => {
    //         let imageObj = {
    //           url: `data:${item.mime};base64,${item.data}`,
    //         };
    //         return imageObj;
    //       });

    //       let messageObj = {
    //         userId: 2,
    //         type: 'Image',
    //         message: {
    //           image: imageArr,
    //         },
    //       };
    //       this.getDataFromInput(messageObj);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };
  selectVideo = async () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then((video) => {
        console.log(video);
      })
      .catch((err) => console.log(err));
  };
  renderContent = () => (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 10,
        }}>
        <View>
          <TouchableOpacity
            onPress={() => this.selectImage()}
            activeOpacity={0.8}>
            <Image
              source={require('../../../asessts/images/gallery-icon.png')}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => this.selectDocument()}
            activeOpacity={0.8}>
            <Image source={require('../../../asessts/images/doc-icon.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.selectVideo()}
            activeOpacity={0.8}>
            <Image
              source={require('../../../asessts/images/gallery-icon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  openAttachmentModal = () => {
    this.RBSheet.open();
  };
  componentWillUnmount() {
    ImagePicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch((e) => {
        console.log(e);
      });
  }
  getSelectedMessage = (message) => {
    if (message) {
      this.setState({isMessageSelected: true});
    } else {
      this.setState({isMessageSelected: false});
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <ConversationHeader
          navigationProps={this.props}
          getSelectedMessage={this.getSelectedMessage}
          isMessageSelected={this.state.isMessageSelected}
        />
        <LinearGradient
          style={styles.container}
          colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <View style={styles.innerContainer}>
            <FlatList
              style={{
                flex: 1,
              }}
              showsVerticalScrollIndicator={false}
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <Conversation
                  myId={this.state.userId}
                  message={item}
                  getSelectedMessage={this.getSelectedMessage}
                />
              )}
              inverted={1}
              // inverted={true}
            />
            <InputBox
              ref={this.InputBoxRef}
              getDataFromInput={this.getDataFromInput}
              navigation={this.props}
              openAttachmentModal={this.openAttachmentModal}
            />
          </View>
        </LinearGradient>
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={300}
          closeOnDragDown={true}
          openDuration={300}
          keyboardAvoidingViewEnabled={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            },
          }}>
          {this.renderContent()}
        </RBSheet>
      </View>
    );
  }
}

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
