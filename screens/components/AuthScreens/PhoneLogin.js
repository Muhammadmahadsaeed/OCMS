// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import colors from '../../constants/colors';
const PhoneLogin = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {};

  return (
    <LinearGradient
      colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}>
        <View style={styles.headerImage}>
          <Text style={styles.headerText}>Community App</Text>
        </View>
        <View style={styles.footer}></View>
      </ScrollView>
    </LinearGradient>
  );
};
export default PhoneLogin;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  headerImage: {
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems:'center'
    // width: '70%',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontFamily: font.Fonts.josefBold,
  },
  footer: {
    flex: 0.4,
    backgroundColor: '#f6f6f6',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 40,
  },
});
