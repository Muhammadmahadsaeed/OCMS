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
import {fetchUser} from '../../config/env';
export default class contact extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      limit: 10,
      page: 1,
      isLoading: false,
      loading: true,
      text: '',
    };
  }

  componentDidMount() {
    this.setState({isLoading: true}, this.getData);
  }
  getData = async () => {
    const {limit} = this.state;

    fetch(`${fetchUser}?_limit=${limit}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: this.state.data.concat(json),
          isLoading: false,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };
  searchUser = (value) => {
    this.setState({text: value});
  };
  renderItemComponent(props) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('conversation')}>
        <View style={styles.row}>
          <Image
            source={{
              uri: props.item.thumbnailUrl,
            }}
            style={styles.pic}
          />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{props.item.title}</Text>
              <Text style={styles.time}>{props.item.id}</Text>
            </View>
            <View style={styles.msgContainer}>
              {/* <Icon
                name={props.icon}
                size={15}
                color="#b3b3b3"
                style={{marginLeft: 15, marginRight: 5}}
              /> */}
              <Text style={styles.msgTxt}>{props.item.id}</Text>
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
        {this.state.loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" animating color="black" />
          </View>
        ) : (
          <FlatList
            data={this.state.data}
            renderItem={(item) => this.renderItemComponent(item)}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
            ListFooterComponent={this.renderFooter}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f7f7f7',
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  time: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
