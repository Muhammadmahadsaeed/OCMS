// Import React and Component
import React, { useState, createRef, useRef } from 'react';
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
  ToastAndroid,
  Platform,
  AlertIOS, ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from "react-native-phone-number-input";
import font from '../../constants/font';
import colors from '../../constants/colors';
import { api } from '../../config/env';
const PhoneLogin = ({ navigation }) => {
  const [userPhone, setUserPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [phoneEmptyErorr, setphoneEmptyErorr] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const phoneInput = useRef("");

  const check = (text) => {
    setUserPhone(text)
    const checkValid = phoneInput.current?.isValidNumber(text);
    setIsValid(checkValid ? checkValid : false);
  }
  const handleSubmitPress = () => {
    if (userPhone === '') {
      setphoneEmptyErorr(true);
    } else {
      fetch(`${api}public/gKey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNo: userPhone }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          if (responseJson.status == '0') {
            setErrortext(responseJson.data[0].msg);
          } else {
            setLoading(false);
            navigation.navigate('PhoneOtp');
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    }
  };

  return (
    <LinearGradient
      colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerImage}>
            <Text style={styles.headerText}>Community App</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <KeyboardAvoidingView enabled>
            <View style={[styles.heading, { marginTop: 40 }]}>
              <Text style={styles.headingText}>
                Enter your phone number to continue
              </Text>
            </View>

            <View style={styles.SectionStyle}>
              <View style={styles.iconLeft}>
                <Image
                  source={require('../../../asessts/images/user-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>
              <PhoneInput
                ref={phoneInput}
                containerStyle={styles.phonecontainer}
                textInputStyle={styles.phonetext}
                codeTextStyle={styles.phonecodetext}
                textContainerStyle={styles.phonetextcontainer}
                defaultValue={userPhone}
                defaultCode="PK"
                layout="second"
                onChangeText={(text) => {
                  check(text)
                }}
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
              />


              <View style={styles.iconRight}>
                {!isValid && (
                  <Image
                    source={require('../../../asessts/images/invalidIcon.png')}
                    style={styles.iconRightImage}
                  />
                )}
              </View>
            </View>





            {errortext != '' ? (
              <View style={styles.errorView}>
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              </View>
            ) : null}
            <View style={styles.heading}>
              <Text style={styles.headingText}>
                Enter an OTP pin sent to your phone number for confirmation
              </Text>
            </View>
            <View style={styles.row}>
              <View>
                <Image
                  source={require('../../../asessts/images/process.png')}
                />
              </View>
              <LinearGradient
                style={styles.buttonView}
                colors={[colors.Colors.blueLight, colors.Colors.blueDark]}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={handleSubmitPress}>
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.buttonTextStyle}>Next</Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </KeyboardAvoidingView>
        </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    fontFamily: font.Fonts.josefBold,
  },
  footer: {
    backgroundColor: '#FBFBFB',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    // height:'70%'
  },
  heading: {
    width: '70%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  headingText: {
    color: colors.Colors.gray,
    fontFamily: font.Fonts.josefReg,
    fontSize: 18,
  },
  SectionStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#d8d8d8',
    backgroundColor: '#F3F1F1'
  },
  iconLeft: {
    left: 3,
    height: 50,
    width: 25,
    justifyContent: 'center',
    paddingVertical: 4,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  iconRight: {
    position: 'absolute',
    right: 3,
    height: 50,
    width: 35,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
  },
  iconLeftImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
  },
  iconRightImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  inputStyle: {
    flex: 1,
    color: colors.Colors.gray,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: font.Fonts.josefReg,
    fontSize: 20,
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 40,
  },
  buttonView: {
    borderRadius: 30,
  },
  buttonStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 50,
  },

  buttonTextStyle: {
    color: 'white',
    fontFamily: font.Fonts.josefBold,
    fontSize: 18,
  },
  errorView: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'left',
    fontFamily: font.Fonts.josefReg,
    fontSize: 16,
  },
  phonecontainer: {
    backgroundColor: '#F3F1F1',
    height: 47,
    width: '80%',
    marginTop:1
  },
  phonetext: {
    backgroundColor: '#F3F1F1',
    height: 47,
    fontFamily: font.Fonts.josefReg,
    fontSize: 20,
    color: colors.Colors.gray
  },
  phonecodetext: {
    fontFamily: font.Fonts.josefReg,
    fontSize: 20,
    color: colors.Colors.gray
  },
  phonetextcontainer: {
    backgroundColor: '#F3F1F1',
    height: 47,
    marginRight: 20
  }
});
