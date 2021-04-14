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
const socket = socketIO('http://192.168.100.54:4000', {
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
    this.state = {
      userId: '',
      data: [{name: 'kashan'}, {name: 'mahad'}, {name: 'zaka'}],
      receiverId: '',
    };
  }
  componentDidMount() {
    const converstion = this.props.navigation.getParam('converstion');
    // this.setState({
    //   receiverId: converstion._id,
    //   userId: '6062cb84ac8ec71b54bfcd2e',
    // });
    // this.getMessages();
    // socket.on('output', (msg) => {
    //   this.getMessages();
    // });
  }
  getDataFromInput = (msg) => {
    this.setState({data: [...this.state.data, ...msg]});
    // socket.emit('input', {
    //   name: 'mahad',
    //   messageContent: msg,
    //   senderId: '6062cb84ac8ec71b54bfcd2e', //login user id
    //   receiverId: this.state.receiverId, //recvr user id
    //   sentTime: '2021-03-31 09:37',
    // });
  };
  // getMessages = () => {
  //   const converstion = this.props.navigation.getParam('converstion');

  //   fetch(`${api}/message/conservation/`, {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({
  //       userId: '6062cb84ac8ec71b54bfcd2e', //login user id
  //       chatUserId: converstion._id, //recvr user id
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       let message = json.data.map((item) => {
  //         let bytes = CryptoJS.AES.decrypt(
  //           item.messageContent,
  //           'secret key 123',
  //         );
  //         let encryptedMsg = bytes.toString(CryptoJS.enc.Utf8);

  //         return {
  //           _id: item._id,
  //           isRead: item.isRead,
  //           messageContent: encryptedMsg,
  //           messageType: item.messageType,
  //           receivedTime: item.receivedTime,
  //           receiverId: item.receiverId,
  //           senderId: item.senderId,
  //           sentTime: item.sentTime,
  //         };
  //       });

  //       // this.setState({chatMessages: [...this.state.chatMessages, ...message]});
  //       // this.setState({data: [...this.state.data, ...message]});
  //       this.setState({data: message.reverse()});
  //     })
  //     .catch((err) => console.log(err));
  // };
  selectDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const fileName = res.uri.replace('file://', '');
      RNFetchBlob.fs
        .readStream(fileName, 'base64', 1048576)
        .then((ifStream) => {
          ifStream.open();
          ifStream.onData((data) => {
            let base64 = `data:${res.type};base64,${data}`;
            const param = {
              base64: base64,
              width: 300,
              height: 300,
              fileName: res.name,
              size: 1048576, // size, in bytes
              type: res.type,
              name: res.name,
            };
            console.log('params doc==', param);
          });
          ifStream.onError((err) => {
            console.log(err);
          });
        });
      // console.log('res : ' + JSON.stringify(res));
      // console.log('URI : ' + res.uri);
      // console.log('Type : ' + res.type);
      // console.log('File Name : ' + res.name);
      // console.log('File Size : ' + res.size);
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
  selectImage = async () => {};
  selectAudio = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      console.log("res===",res)
      const fileName = res.uri.replace('file://', '');
      RNFetchBlob.fs
        .readStream(fileName, 'base64', 1048576)
        .then((ifStream) => {
          ifStream.open();
          ifStream.onData((data) => {
            let base64 = `data:${res.type};base64,${data}`;
            const param = {
              base64: base64,
              width: 300,
              height: 300,
              fileName: res.name,
              size: 1048576, // size, in bytes
              type: res.type,
              name: res.name,
            };
            console.log('params doc==', param);
          });
          ifStream.onError((err) => {
            console.log(err);
          });
        });
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
            onPress={() => this.selectAudio()}
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
  render() {
    return (
      <View style={{flex: 1}}>
        <ConversationHeader navigationProps={this.props} />
        <LinearGradient
          style={styles.container}
          colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <View style={styles.innerContainer}>
            <FlatList
              style={{
                flex: 1,
                // borderTopLeftRadius: 30,
                // borderTopRightRadius: 30,
              }}
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <Conversation myId={this.state.userId} message={item} />
              )}
              inverted={true}
            />
            <InputBox
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
  },
});
