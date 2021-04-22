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
import ContactSearchBar from '../../common/ContactSearchbar';
import {fetchUser, api} from '../../config/env';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import font from '../../constants/font';
var axios = require('axios');
import {connect} from 'react-redux';
class contact extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      limit: 10,
      page: 1,
      isLoading: false,
      loading: true,
      text: '',
      url: require('../../../asessts/images/admin.png'),
      loginCompany: '',
    };
  }
  componentDidMount() {
    let loginCompany = this.props.user.user.user.loginCompany;

    this.setState({isLoading: true, loginCompany: loginCompany}, this.getData);
  }
  getData = async () => {
    const {limit} = this.state;

    // fetch(`${fetchUser}?_limit=${limit}`)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     this.setState({
    //       data: this.state.data.concat(json),
    //       isLoading: false,
    //       loading: false,
    //     });
    //   })
    //   .catch((err) => console.log(err));
    const companyName = {
      loginCompany: this.state.loginCompany,
    };
    fetch(`${api}contact/getAllContact/${limit}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(companyName),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: this.state.data.concat(json.data),
          isLoading: false,
          loading: false,
        });
      })
      .catch((err) => console.log('==========', err));
  };
  searchUser = (value) => {
    console.log(value);
    this.setState({text: value});
  };
  renderItemComponent(props) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigation.navigate('chatRoom', {converstion: props.item})
        }>
        <View style={styles.row}>
          <Image
            source={
              props.item.profile ? {uri: props.item.profile} : this.state.url
            }
            style={styles.pic}
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              paddingVertical: 10,
            }}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{props.item.userName}</Text>
            </View>
            <View style={styles.msgContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.msgTxt}>Hey, I am Syed Kashan Tayyab</Text>
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
  render() {
    return (
      <View style={styles.container}>
        <ContactSearchBar
          navigationProps={this.props}
          searchUser={this.searchUser}
        />
        <LinearGradient
          style={styles.container}
          colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <View style={styles.innerContainer}>
            {this.state.loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" animating color="black" />
              </View>
            ) : (
              <FlatList
                data={this.state.data}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => this.renderItemComponent(item)}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0}
                ListFooterComponent={this.renderFooter}
              />
            )}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  pic: {
    borderRadius: 100,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  nameTxt: {
    color: 'black',
    fontSize: 20,
    fontFamily: font.Fonts.josefBold,
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
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(contact);
// export default contact
