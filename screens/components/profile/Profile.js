import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Animated,
} from 'react-native';

import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

class Profile extends React.Component {
  constructor() {
    super();
    this.navTitle = React.createRef();
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageHeaderScrollView
          maxHeight={200}
          minHeight={MIN_HEIGHT}
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          renderHeader={() => (
            <Image
              source={require('../../../asessts/images/tobias.jpg')}
              style={styles.image}
            />
          )}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>hello</Text>
            </View>
          )}
          renderFixedForeground={() => (
            <Animated.View style={styles.navTitleView} ref={this.navTitleView}>
              <Text style={styles.navTitle}>hello</Text>
            </Animated.View>
          )}>
          <TriggeringView style={{minHeight:300}}
            onHide={() => this.navTitleView.current.fadeInUp(200)}
            onDisplay={() => this.navTitleView.current.fadeOut(100)}>
            <Text>Scroll Me!</Text>
          </TriggeringView>
        </ImageHeaderScrollView>
      </View>
    );
  }
}

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
});
