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
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import font from '../../constants/font';
import CryptoJS from 'crypto-js';
import socketIO from 'socket.io-client';
import Animated from 'react-native-reanimated';
import RBSheet from "react-native-raw-bottom-sheet";
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

    this.fall = new Animated.Value(1);
    this.state = {
      chatMessages: [],
    };
  }
  componentDidMount() {
    const userConversation = this.props.navigation.getParam('converstion');
    console.log(userConversation);
    this.setState({ chatMessages: userConversation.conservations });
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
    socket.emit('input', {
      name: 'mahad',
      messageContent: msg,
      senderId: '6062cb84ac8ec71b54bfcd2e',
      receiverId: '605844544fbd710afc40b9ba',
      sentTime: '2021-03-31 09:37',
    });
  };
  renderContent = () => (
    <View style={{ flex: 1}}>
      <TouchableOpacity>
        <Text>Swipe down to close</Text>
      </TouchableOpacity>
    </View>
  );
  openAttachmentModal = () => {
    this.RBSheet.open()
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <ConversationHeader navigationProps={this.props} />
        <LinearGradient
          style={styles.container}
          colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.innerContainer}>
            <FlatList
              data={this.state.chatMessages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Conversation myId={5} message={item} />}
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
          ref={ref => {
            this.RBSheet = ref;
          }}

          height={300}
          closeOnDragDown={true}
          openDuration={300}
          keyboardAvoidingViewEnabled={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            },
            container: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30
            }
          }}
        >
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
