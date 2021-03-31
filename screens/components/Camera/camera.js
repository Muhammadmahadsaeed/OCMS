import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Toolbar from './toolbar';
import styles from './styles';
import Gallery from './gallery';
export default class Camera extends PureComponent {
  state = {
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    cameraType: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.off,
  };

  setFlashMode = (flashMode) => this.setState({flashMode});
  setCameraType = (cameraType) => this.setState({cameraType});
  handleCaptureIn = () => {
    this.setState({capturing: true});
  };

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures],
    });
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();

    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures],
    });
  };

  async componentDidMount() {
    const hasCameraPermission = await this.requestCameraPermission();
    if (hasCameraPermission) this.setState({hasCameraPermission});
  }
  requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures,
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        <RNCamera
          type={cameraType}
          flashMode={flashMode}
          style={styles.preview}
          ref={(camera) => (this.camera = camera)}
        />
        {captures.length > 0 && <Gallery captures={captures} />}

        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </SafeAreaView>
    );
  }
}
