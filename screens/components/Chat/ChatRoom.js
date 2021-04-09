import React from 'react';
import {
  View,
  ListView,
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
      chatMessages: [
        {name: 'mahad', id: 1},
        {name: 'mahad', id: 2},
      ],
    };
  }
  componentDidMount() {
    const userConversation = this.props.navigation.getParam('converstion');
    console.log(userConversation);
    this.setState({chatMessages: userConversation.conservations});
    // socket.on('output', (msg) => {

    //   const message = msg[0].conservations.map((item) => {
    //     let bytes = CryptoJS.AES.decrypt(item.messageContent, 'secret key 123');
    //     let plaintext = bytes.toString(CryptoJS.enc.Utf8);
    //     return {id: item._id, plaintext};
    //   });

    //   console.log('msg from conversation========', message);
    //   this.setState({chatMessages: [...this.state.chatMessages, ...message]});
    // });
  }
  getDataFromInput = (msg) => {
    console.log('=========', msg);
    // socket.emit('input', {
    //   name: 'mahad',
    //   messageContent: msg,
    //   senderId: '6062cb84ac8ec71b54bfcd2e',
    //   receiverId: '605844544fbd710afc40b9ba',
    //   sentTime: '2021-03-31 09:37',
    // });
  };
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
  renderContent = () => (
    <View style={{flex: 1}}>
      <TouchableOpacity>
        <Text>Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.selectDocument()}>
        <Text>Document</Text>
      </TouchableOpacity>
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
              data={this.state.chatMessages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <Conversation myId={5} message={item} />}
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
