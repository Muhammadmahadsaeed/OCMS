import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
export default class CameraTab extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      limit: 10,
      page: 1,
      isLoading: false,
      loading: true,
    };
  }


  render() {
    return (
      <View style={styles.container}>
          <Text>Camera tab</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
