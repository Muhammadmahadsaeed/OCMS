// import React, { PureComponent } from 'react';
// import {
//     SafeAreaView,
//     AppRegistry,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//     PermissionsAndroid,
//     Dimensions,
//     Image,
// } from 'react-native';
// import Gallery from './gallery'
// export default class ImageGrid extends PureComponent {

//     render() {

//         return (
//             <SafeAreaView style={{ flex: 1 }}>
//                 <Gallery />
//             </SafeAreaView>
//         );
//     }
// }

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import ToolbarAndroid from '@react-native-community/toolbar-android';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu!',
});
const initialMessage = Platform.select({
  ios: 'Toolbar-Android is no-op in iOS',
  android: 'Click on the toolbar icons above to test...',
});

export default class ToolbarAndroidExample extends Component {
  constructor() {
    super();

    this.state = {message: initialMessage};
  }

  render() {
    return (
        <ToolbarAndroid
        style={styles.toolbar}
        titleColor="white"
        title="example"
        navIcon={require('../../../../asessts/images/more.png')}
        logo={require('../../../../asessts/images/more.png')}
        actions={[
          {
            title: 'Button',
            icon: require('../../../../asessts/images/more.png'),
            show: 'never',
          },
          {
            title: 'Button',
            icon: require('../../../../asessts/images/more.png'),
            show: 'never',
          },
        ]}
        onIconClicked={() => this.setState({message: 'Menu is clicked'})}
        onActionSelected={(position) =>
          this.setState({message: `action ${position} is clicked`})
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: 'blue',
    height: 56,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  message: {
    color: 'red',
    fontSize: 15,
    margin: 8,
  },
});
