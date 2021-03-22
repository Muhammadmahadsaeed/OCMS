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
} from 'react-native';

// import {createMessage, updateChatRoom} from '../../src/graphql/mutations';

const InputBox = (props) => {
  const {chatRoomID} = props;

  const [message, setMessage] = useState('');
  const [myUserId, setMyUserId] = useState(null);

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       const userInfo = await Auth.currentAuthenticatedUser();
  //       setMyUserId(userInfo.attributes.sub);
  //     };
  //     fetchUser();
  //   }, []);

  const onMicrophonePress = () => {
    console.warn('Microphone');
  };

  //   const updateChatRoomLastMessage = async (messageId) => {
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

  const onSendPress = async () => {
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
    // setMessage('');
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };

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
            onChangeText={setMessage}
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
        <TouchableOpacity onPress={onPress}>
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
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal:7,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 50,
    marginRight: 7,
    flex: 1,
    justifyContent:'center',
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
    resizeMode:'contain'
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
