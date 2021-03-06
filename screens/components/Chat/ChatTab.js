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
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {fetchUser, api} from '../../config/env';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import font from '../../constants/font';
import axios from 'axios';
import {connect} from 'react-redux';
class ChatTab extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          name: 'Lennart Johansson',
          city: 'Stockholm',
        },
        {
          name: 'Karl Eriksson',
          city: 'London',
        },
        {
          name: 'Pekka Hartikainen',
          city: 'Helsinki',
        },
        {
          name: 'Mia Svensson',
          city: 'Berlin',
        },
      ],
      limit: 10,
      page: 1,
      isLoading: false,
      loading: true,
    };
  }

  // componentDidMount() {
  //   this.setState({isLoading: true}, this.getData);
  // }
  // getData = async () => {
  //   const {limit} = this.state;
  //   fetch(`${api}message/${this.props.user.user.user._id}`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.setState({
  //         data: json.data,
  //         // data: this.state.data.concat(json),
  //         isLoading: false,
  //         loading: false,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };

  renderItemComponent(props) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('chatRoom', {converstion: props.item})
        }>
        <View style={styles.row}>
          <Image
            source={
              props.item.profile ? {uri: props.item.profile} : this.state.url
            }
            // source={{
            //   uri: props.item.profile,
            // }}
            style={styles.pic}
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              borderBottomWidth: 2,
              borderBottomColor: '#c5c4c4',
              paddingVertical: 10,
            }}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1}>
                {props.item.userName}
              </Text>
            </View>
            <View style={styles.msgContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.msgTxt} numberOfLines={1}>
                  {props.item.messageContent}
                </Text>
              </View>
              <View>
                <Text style={styles.time}>10:20</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  handleLoadMore = () => {
    this.setState(
      {limit: this.state.limit + 10, isLoading: true},
      this.getData,
    );
  };
  renderFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    ) : null;
  };
  goToContact = async () => {
    // if (Platform.OS !== 'android') {
    //   return Promise.resolve(true);
    // }
    // if (Platform.OS === 'android') {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //       {
    //         title: "Contacts",
    //         message: "This app would like to view your contacts."
    //       }
    //     )
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log('You can use the storage');
    //     } else {
    //       console.log('permission denied');
    //       return;
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //     return;
    //   }
    // }
    this.props.navigation.navigate('contact');
  };
  render() {
    return (
      <LinearGradient
        style={styles.container}
        colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}>
        <View style={styles.innerContainer}>
          <View style={styles.searchView}>
            <View style={styles.touchableButtonLeft}>
              {/* <Image
                  source={require('../../../assets/email2.png')}
                  style={styles.buttonImage}
                /> */}
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder="Search Conversation"
              placeholderTextColor={colors.Colors.blueLight}
              keyboardType="default"
              returnKeyType="next"
            />
          </View>
          {/* {this.state.data ? (
            <View style={{flex: 1}}> */}
              {/* {this.state.loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" animating color="black" />
                </View>
              ) : ( */}
                <FlatList
                  data={this.state.data}
                  showsVerticalScrollIndicator={false}
                  renderItem={(item) => this.renderItemComponent(item)}
                  keyExtractor={(item, index) => index.toString()}
                  // onEndReached={this.handleLoadMore}
                  // onEndReachedThreshold={0}
                  // ListFooterComponent={this.renderFooter}
                />
              {/* )} */}
            {/* </View>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../../../asessts/images/box.png')} />
              <Text style={{textAlign: 'center'}}>
                You've no recent messages, let's start a conversation!
              </Text>
            </View>
          )} */}
          <LinearGradient
            style={styles.bottomView}
            colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 1}}>
            <TouchableOpacity
              style={{padding: 20, borderRadius: 50}}
              activeOpacity={0.9}
              onPress={() => this.goToContact()}>
              <Image source={require('../../../asessts/images/chat.png')} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(ChatTab);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  //input fields
  searchView: {
    flexDirection: 'row',
    height: 45,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#c4c5c6',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButtonLeft: {
    position: 'absolute',
    left: 3,
    height: 45,
    width: 35,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    fontSize: 20,
    marginLeft: 40,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    fontFamily: font.Fonts.josefReg,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pic: {
    borderRadius: 50,
    width: 70,
    height: 70,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameTxt: {
    color: 'black',
    fontSize: 20,
    fontFamily: font.Fonts.josefBold,
  },
  time: {
    color: '#777',
    fontSize: 12,
    fontFamily: font.Fonts.josefReg,
  },
  msgContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  msgTxt: {
    color: '#666',
    fontSize: 16,
    fontFamily: font.Fonts.josefReg,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  bottomView: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 100,
  },
});
