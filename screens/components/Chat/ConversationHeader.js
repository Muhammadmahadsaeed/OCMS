import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import ToolbarAndroid from '@react-native-community/toolbar-android';
const ConversationHeader = (props) => {
  const user = props.navigationProps.navigation.getParam('converstion');
  const url = require('../../../asessts/images/admin.png');
  const renderMoreItems = () => {
    return (
      <ToolbarAndroid
        style={{
          height: 56,
          alignSelf: 'stretch',
          width: 20,
        }}
        contentInsetStart={50}
        rtl={true}
        title="ToolbarAndroid Example"
        actions={[
          {title: 'Settings', show: 'never'},
          {title: 'Settings 2', show: 'never'},
        ]}
      />
    );
  };
  return (
    <LinearGradient
      style={styles.header}
      colors={[Colors.Colors.blueLight, Colors.Colors.blueDark]}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}>
      <View style={styles.headerContent}>
        <View style={styles.left}>
          <View style={styles.headerBack}>
            <TouchableOpacity
              style={styles.headerBack}
              activeOpacity={0.8}
              onPress={() => props.navigationProps.navigation.pop()}>
              <Image
                source={require('../../../asessts/images/left-arrow.png')}
                style={styles.backIcon}
              />
              <Image
                source={user.profile ? {uri: user.profile} : url}
                style={styles.chatImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.chatTitle}>
            <TouchableOpacity
              onPress={() =>
                props.navigationProps.navigation.navigate('profile')
              }
              activeOpacity={0.8}>
              <Text style={styles.name} numberOfLines={1}>
                {user.userName}
              </Text>
              <Text style={styles.status} numberOfLines={1}>
                last seen today 11:20 am
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.right}>
          <View style={styles.rightIcon}>
            <TouchableOpacity style={styles.rightImg}>
              <Image
                source={require('../../../asessts/images/video-call.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rightIcon}>
            <TouchableOpacity style={styles.rightImg}>
              <Image
                source={require('../../../asessts/images/voice-call.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rightIcon}>
            <ToolbarAndroid
              style={[styles.toolbar, styles.rightIcon]}
              actions={[
                {
                  title: 'Button',
                  show: 'never',
                },
                {
                  title: 'Button',
                  show: 'never',
                },
              ]}
              onIconClicked={() => this.setState({message: 'Menu is clicked'})}
              onActionSelected={(position) =>
                this.setState({message: `action ${position} is clicked`})
              }
            />
            {/* <TouchableOpacity
              style={styles.rightImg}
              onPress={() => renderMoreItems()}>
              <Image
                source={require('../../../asessts/images/more.png')}
                style={styles.icon}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ConversationHeader;

const styles = StyleSheet.create({
  header: {
    height: 65,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  headerBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  backIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    margin: 2,
  },
  chatTitle: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
    marginVertical: 10,
    marginRight: 5,
  },
  name: {
    color: '#fff',
    fontFamily: font.Fonts.josefBold,
    fontSize: 20,
  },
  status: {
    color: '#fff',
    fontFamily: font.Fonts.josefReg,
    fontSize: 14,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    marginRight: 10,
    height: 30,
    width: 25,
  },
  rightImg: {
    padding: 5,
  },

  icon: {
    height: '100%',
    width: 25,
    resizeMode: 'contain',
  },
  toolbar: {
    padding: 5,
    backgroundColor: '#E9EAED',
    height: 56,
  },
});
