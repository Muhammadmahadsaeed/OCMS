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
} from 'react-native';

const {width, height} = Dimensions.get('window');

class conversation extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../../asessts/images/background.jpg')}
          style={styles.image}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.input}>
              <TextInput
                style={{flex: 1}}
                // value={this.state.msg}
                // onChangeText={(msg) => this.setState({msg})}
                blurOnSubmit={false}
                // onSubmitEditing={() => this.send()}
                placeholder="Type a message"
                returnKeyType="send"
              />
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

export default conversation;

const styles = StyleSheet.create({
  image: {
    width,
    height,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
});
