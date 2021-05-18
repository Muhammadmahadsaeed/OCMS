import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import Contacts from 'react-native-contacts';
const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      // if (Platform.OS !== 'android') {
      //   return Promise.resolve(true);
      // }
      // if (Platform.OS === 'android') {
      //   if (PermissionsAndroid.RESULTS.GRANTED) {
      //     console.log('You can use the storage');
      //   } else {
      //     console.log('permission denied');
      //     return;
      //   }
      // }
      // loadContacts();
      if (user) {
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('TermAndConditionScreen');
      }
    }, 3000);
  }, [user]);
  const loadContacts = () => {
    // Contacts.getAll()
    //   .then((contacts) => {
    //     const contactArr = contacts.map((item) => {
    //       return item.phoneNumbers[0];
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../asessts/images/aboutreact.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        // size="large"
        style={styles.activityIndicator}
        size={50}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
