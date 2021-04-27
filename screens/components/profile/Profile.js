import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';


class Profile extends React.Component {
  constructor() {
    super();

  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={styles.header}>

          </View>
          <View style={styles.form}>
            <View style={styles.notificationView}>
              <Text>Notification</Text>
              <Text>Notification</Text>
            </View>
            <View>
              <Text>About</Text>
            </View>
            <View>
              <Text>About</Text>
              <TouchableOpacity>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

      </View>
    );
  }
}

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    // justifyContent: 'center',
  },
  form: {
    backgroundColor: '#FBFBFB',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    // height:'70%'
  },
  notificationView: {
    backgroundColor: '#FFFFFF', marginHorizontal: 20,
    marginVertical: 20, padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});
