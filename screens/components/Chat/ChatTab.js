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
} from 'react-native';

export default class ChatTab extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => this.setState({data: json}));
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };
  renderItemComponent(props) {
    
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image
            source={{
              uri:
                'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
            }}
            style={styles.pic}
          />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{props.item.title}</Text>
              <Text style={styles.time}>{props.item.completed}</Text>
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
  //handling onPress action
  getListViewItem = (item) => {
    Alert.alert(item.key);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={(item) => this.renderItemComponent(item)}
          keyExtractor={(item) => item.id.toString()}
        />
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
});
