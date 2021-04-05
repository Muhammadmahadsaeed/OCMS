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
import io from 'socket.io-client';
const socket = io.connect('https://192.168.100.54:4000');

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatMessages: [],
      connected: socket.connected,
      currentTransport: socket.connected
        ? socket.io.engine.transport.name
        : '-',
    };
  }
  componentDidMount() {
    // const userConversation = this.props.navigation.getParam('converstion');
    // this.setState({chatMessages: userConversation.conservations})
    socket.on('connection', () => this.onConnectionStateUpdate());
    // console.log(socket);
    // socket.on('output', (msg) => {
    //   console.log(msg);
    //   this.setState({chatMessages: [...this.state.chatMessages, msg]});
    // });
  }
  componentWillUnmount() {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('message');
  }
  onConnectionStateUpdate() {
    console.log(this.state.connected,this.state.currentTransport)
    this.setState({
      connected: socket.connected,
      currentTransport: socket.connected ? socket.io.engine.transport.name : '-'
    });
    if (socket.connected) {
      console.log("connect")
      // socket.io.engine.on('upgrade', () => this.onUpgrade());
    } else {
      socket.io.engine.off('upgrade');
    }
  }
  getDataFromInput = (msg) => {
    socket.emit('input', {
      messageContent: msg,
      senderId: '6062cb84ac8ec71b54bfcd2e',
      receiverId: '605844544fbd710afc40b9ba',
      sentTime: 'mahad',
    });
    console.log(msg);
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
            <InputBox getDataFromInput={this.getDataFromInput} />
          </View>
        </LinearGradient>
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
