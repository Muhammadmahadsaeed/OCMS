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
class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
    };
  }
  getDataFromInput = (msg) => {
    this.setState({chatMessages: [msg, ...this.state.chatMessages]});
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
