import React from 'react';
import {View} from 'react-native';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
var ScrollableTabView = require('react-native-scrollable-tab-view');
// importing Segmented Control Tab
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Header from './common/Header';
import CallTab from './components/Calls.js/CallTab';
import ChatTab from './components/Chat/ChatTab';
// import Calls from './CallsTab';
// import Chats from './ChatsTab';
// import Contacts from './ContactsTab';
const One = () => {
  return <Text style={styles.text}>This is first view</Text>;
};
const Two = () => {
  return <Text style={styles.text}>This is second view</Text>;
};
const segments = [
  {
    title: 'One',
    view: One,
  },
  {
    title: 'Two',
    view: Two,
  },
];
// Main Component
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Contacts: [],
      Chats: [],
      Calls: [],
      customStyleIndex: 0,
    };
    // fetch('/Users/chauhan/Desktop/Whatsapp/App/data/data.json')
    //  .then(response => response.json())
    //  .then(data => this.setState({
    //    Contacts: data.Contacts,
    //    Chats: data.Chats,
    //    Calls: data.Calls,
    //  }));
  }

  handleCustomIndexSelect = (index) => {
    // Tab selection for custom Tab Selection
    this.setState({customStyleIndex: index});
  };
  render() {
    const {customStyleIndex} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header />
        <SegmentedControlTab segments={segments} />
        {/* <SegmentedControlTab
          values={['Login', 'Sign up']}
          selectedIndex={customStyleIndex}
          onTabPress={this.handleCustomIndexSelect}
          borderRadius={5}
          // tabsContainerStyle={{
          //   backgroundColor: '#F2F2F2',
          // }}
          tabStyle={{
            backgroundColor: 'none',
            backgroundColor: '#e9ba00',
            borderWidth: 1,
            borderColor: 'transparent',
            paddingVertical: 15,
            // borderRadius:50
          }}
          activeTabStyle={{
            backgroundColor: '#e9ba00',
            borderBottomColor: 'black',
          }}
          tabTextStyle={{color: '#444444', fontWeight: 'bold'}}
          activeTabTextStyle={{color: '#888888'}}
        />
        {customStyleIndex === 0 && <ChatTab />}
        {customStyleIndex === 1 && <CallTab />} */}

        {/* <ScrollableTabView
          style={{ borderColor: '#fff' }}
          tabBarUnderlineStyle={{ backgroundColor: '#fff' }}
          tabBarBackgroundColor="#075e54"
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#88b0ac"
          initialPage={1}
        >
          <Calls
            tabLabel="CALLS"
            CallsData={this.state.Calls}
            {...this.props}
          />
            <ChatTab
            tabLabel="CHATS"
            // ChatsData={this.state.Chats}
            {...this.props}
          />
          <Chats
            tabLabel="CHATS"
            ChatsData={this.state.Chats}
            {...this.props}
          />
          <Contacts
            tabLabel="CONTACTS"
            ContactsData={this.state.Contacts}
            {...this.props}
          />
        </ScrollableTabView>
      */}
      </View>
    );
  }
}

export default Home;
