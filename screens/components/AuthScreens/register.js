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
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
const RegisterScreen = (navigation) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [agree, setAgree] = useState(false);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [nameEmptyErorr, setNameEmptyErorr] = useState(false);
  const [emailEmptyErorr, setEmailEmptyErorr] = useState(false);
  const [companyEmptyErorr, setCompanyEmptyErorr] = useState(false);
  const [phoneEmptyErorr, setPhoneEmptyErorr] = useState(false);
  const [pwdEmptyErorr, setpwdEmptyErorr] = useState(false);
  const [confirmPwdEmptyErorr, setconfirmPwdEmptyErorr] = useState(false);
  const userNameInputRef = createRef();
  const emailInputRef = createRef();
  const companyInputRef = createRef();
  const numberInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();

  const handleSubmitButton = () => {
    Toast.show({
      type: 'success | error | info',
      position: 'top | bottom',
      text1: 'Hello',
      text2: 'This is some something 👋',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      onShow: () => {},
      onHide: () => {},
      onPress: () => {}
    });
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
  //   if (isRegistraionSuccess) {
  //     return (
  //       <View
  //         style={{
  //           flex: 1,
  //           backgroundColor: '#307ecc',
  //           justifyContent: 'center',
  //         }}>
  //         <Image
  //           source={require('../Image/success.png')}
  //           style={{
  //             height: 150,
  //             resizeMode: 'contain',
  //             alignSelf: 'center'
  //           }}
  //         />
  //         <Text style={styles.successTextStyle}>
  //           Registration Successful
  //         </Text>
  //         <TouchableOpacity
  //           style={styles.buttonStyle}
  //           activeOpacity={0.5}
  //           onPress={() => props.navigation.navigate('LoginScreen')}>
  //           <Text style={styles.buttonTextStyle}>Login Now</Text>
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   }
  const setTermAndCondition = () => {
    setAgree(!agree);
  };
  const launchImageLibrary = async () => {
    if (fileUri) {
      setFileUri('');
    } else {
      ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: false,
        includeBase64: true,
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,

      }).then(response => {
        setFileUri(response.path);
      })
        .catch((err) => console.log(err))
    }
  };
  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{ uri: fileUri }} style={styles.imageIconStyle} />;
    } else {
      return (
        <Image
          source={require('../../../asessts/images/admin.png')}
          style={styles.imageIconStyle}
        />
      );
    }
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
            <View style={styles.imgView}>
              <TouchableOpacity activeOpacity={0.8}
                onPress={launchImageLibrary}
                style={styles.editBtnSection}>
                <Image
                  style={styles.imageIconStyle}
                  source={
                    fileUri
                      ? require('../../../asessts/images/wrong.png')
                      : require('../../../asessts/images/pencl.png')
                  }
                />
              </TouchableOpacity>
              {renderFileUri()}
            </View>
          </View>
          <View style={styles.headingView}>
            <Text style={styles.heading}>Create an account</Text>
            <Text style={styles.para}>Enter your credentials</Text>
          </View>
        </View>
        <View style={styles.form}>
          <KeyboardAvoidingView enabled>
            <View style={[styles.SectionStyle, { marginTop: 40 }]}>
              <View style={styles.iconLeft}>
                <Image
                  source={require('../../../asessts/images/user-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>

              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setUserName(text)}
                underlineColorAndroid="#f000"
                placeholder="Enter your username"
                placeholderTextColor={colors.Colors.gray}
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
              {nameEmptyErorr &&
                <View style={styles.iconRight} >

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
                  source={require('../../../asessts/images/organization-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setCompanyName(text)}
                underlineColorAndroid="#f000"
                placeholder="Enter your company name"
                placeholderTextColor={colors.Colors.gray}
                keyboardType="default"
                ref={companyInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  numberInputRef.current && numberInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
              {companyEmptyErorr &&
                <View style={styles.iconRight} >

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
                  source={require('../../../asessts/images/user-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(number) => setPhoneNumber(number)}
                underlineColorAndroid="#f000"
                placeholder="Phone number"
                placeholderTextColor={colors.Colors.gray}
                keyboardType="numeric"
                ref={numberInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
              {phoneEmptyErorr &&
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
                  source={require('../../../asessts/images/confirm-pwd-icon.png')}
                  style={styles.iconLeftImage}
                />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => setUserConfirmPassword(text)}
                underlineColorAndroid="#f000"
                placeholder="Enter confirm password"
                placeholderTextColor={colors.Colors.gray}
                ref={confirmPasswordInputRef}
                returnKeyType="next"
                secureTextEntry={true}
                blurOnSubmit={false}
              />
              {confirmPwdEmptyErorr &&
                <View style={styles.iconRight}>

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
                onPress={() => setTermAndCondition()}>
                <Image
                  style={{ height: 20, width: 20 }}
                  source={
                    agree
                      ? require('../../../asessts/images/Icon-check-circle.png')
                      : require('../../../asessts/images/check-circle.png')
                  }
                />
              </TouchableOpacity>
              <Text style={styles.termText}>
                I agree to the terms of use and privacy policy
              </Text>
            </View>

            <LinearGradient
              colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
              style={styles.linearButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmitButton}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </LinearGradient>
          </KeyboardAvoidingView>
          {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  linear: {
    flex: 1,
  },
  header: {
    flex: 1,
    // height: 250,
    // justifyContent: 'center',
  },
  editBtnSection: {
    height: 30,
    width: 30,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 1,
  },
  imageIconStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
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
    // justifyContent: 'flex-end',
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
    marginBottom: 40,
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
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  termText: {
    fontFamily: font.Fonts.josefReg,
    fontSize: 16,
    color: '#707070',
    marginLeft: 10,
  },
});
