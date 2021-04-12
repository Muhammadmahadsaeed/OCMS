// Import React and Component
import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import font from '../../constants/font';
import colors from '../../constants/colors';
const LoginWithEmail = (navigation) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [emailEmptyErorr, setemailEmptyErorr] = useState(false);
  const [pwdEmptyErorr, setpwdEmptyErorr] = useState(false);
  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    navigation.navigation.navigate('HomeScreen');
    // setErrortext('');
    // if (!userName) {
    //   alert('Please fill Name');
    //   return;
    // }
    // if (!userEmail) {
    //   alert('Please fill Email');
    //   return;
    // }
    // if (!userAge) {
    //   alert('Please fill Age');
    //   return;
    // }
    // if (!userAddress) {
    //   alert('Please fill Address');
    //   return;
    // }
    // if (!userPassword) {
    //   alert('Please fill Password');
    //   return;
    // }
    // //Show Loader
    // setLoading(true);
    // var dataToSend = {
    //   name: userName,
    //   email: userEmail,
    //   age: userAge,
    //   address: userAddress,
    //   password: userPassword,
    // };
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');
    // fetch('http://localhost:3000/api/user/register', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type':
    //     'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status === 'success') {
    //       setIsRegistraionSuccess(true);
    //       console.log(
    //         'Registration Successful. Please Login to proceed'
    //       );
    //     } else {
    //       setErrortext(responseJson.msg);
    //     }
    //   })
    //   .catch((error) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };

  return (
    <LinearGradient
      colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linear}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View style={styles.header}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.imgView}></View>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.heading}>Login your account</Text>
          </View>
        </View>
        <View style={styles.form}>
          <KeyboardAvoidingView enabled>
            <View style={[styles.SectionStyle, { marginTop: 40 }]}>
              <View style={styles.iconLeft}>
                <Image
                  source={require('../../../asessts/images/email-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>

              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setUserEmail(text)}
                underlineColorAndroid="#f000"
                placeholder="Enter your email"
                placeholderTextColor={colors.Colors.gray}
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  companyInputRef.current && companyInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
              {emailEmptyErorr &&
                <View style={styles.iconRight}>

                  <Image
                    source={require('../../../asessts/images/invalidIcon.png')}
                    style={styles.iconRightImage}
                  />
                </View>
              }
            </View>
            <View style={styles.SectionStyle}>
              <View style={styles.iconLeft}>
                <Image
                  source={require('../../../asessts/images/pwd-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>

              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setUserPassword(text)}
                underlineColorAndroid="#f000"
                placeholder="Enter password"
                placeholderTextColor={colors.Colors.gray}
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={() =>
                  confirmPasswordInputRef.current &&
                  confirmPasswordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
              {pwdEmptyErorr &&
                <View style={styles.iconRight} >

                  <Image
                    source={require('../../../asessts/images/invalidIcon.png')}
                    style={styles.iconRightImage}
                  />
                </View>
              }
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <View style={styles.textView}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ padding: 10 }}
                onPress={() => navigation.navigation.navigate('ForgotPwd')}>
                <Text style={styles.termText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <LinearGradient
              colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
              style={styles.linearButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmitButton}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
              style={[styles.linearButton, { marginBottom: 40 }]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </LinearGradient>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default LoginWithEmail;

const styles = StyleSheet.create({
  linear: {
    flex: 1,
  },
  header: {
    flex: 1,
    // justifyContent: 'center',
  },
  imgView: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 50,
  },

  headingView: {
    paddingVertical: 20,
    marginLeft: 20,
    flexDirection: 'column',
    alignItems: 'baseline',
  },
  heading: {
    color: 'white',
    fontFamily: font.Fonts.josefBold,
    fontSize: 26,
  },
  para: {
    color: 'white',
    fontFamily: font.Fonts.josefReg,
    fontSize: 16,
  },
  form: {
    backgroundColor: '#FBFBFB',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
    // height:'70%'
  },
  SectionStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#d8d8d8',
    backgroundColor: '#F3F1F1',
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
  iconLeftImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
  },
  iconRight: {
    position: 'absolute',
    right: 3,
    height: 45,
    width: 35,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',

  },
  iconRightImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    color: 'black',
    borderColor: '#7DE24E',
    height: 50,
    width: '80%',
    alignItems: 'center',
    borderRadius: 30,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },

  buttonTextStyle: {
    color: '#81b840',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: colors.Colors.gray,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: font.Fonts.josefReg,

    fontSize: 20,
  },

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  linearButton: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
    marginBottom: 20,
  },
  button: {
    marginVertical: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: font.Fonts.josefBold,
    textAlign: 'center',
  },
  textView: {
    flex: 1,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  termText: {
    fontFamily: font.Fonts.josefReg,
    fontSize: 18,
    color: colors.Colors.blueLight,
    // marginLeft: 10,
  },
});
