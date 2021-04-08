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
import font from '../../constants/font';
import colors from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
const PhoneOTP = ({navigation}) => {
  const [isSuccess, setSuccess] = useState(false);
  const onSubmit = () => {
    console.log('submit');
    setSuccess(true);
    // setTimeout(() => {
    //   setSuccess(false);
    //   navigation.navigate('HomeScreen');
    // }, 3000);
  };
  if (isSuccess) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successImg}>
          <Image
            source={require('../../../asessts/images/success.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.successText}>
          <Text style={styles.successTextHeading}>Successful</Text>
          <Text style={styles.successTextPara}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            marginTop: 60,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../../../asessts/images/otpheader.png')} />
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.otpHeading}>
            <Text style={styles.otpHeadingText}>Enter OTP pin ...</Text>
          </View>

          <KeyboardAvoidingView enabled>
            <View style={styles.row}>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="?" //12345
                  textAlign={'center'}
                  placeholderTextColor={colors.Colors.gray}
                  keyboardType="numeric"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                  maxLength={1}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="?" //12345
                  textAlign={'center'}
                  placeholderTextColor={colors.Colors.gray}
                  keyboardType="numeric"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                  maxLength={1}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="?" //12345
                  textAlign={'center'}
                  placeholderTextColor={colors.Colors.gray}
                  keyboardType="numeric"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                  maxLength={1}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="?" //12345
                  textAlign={'center'}
                  placeholderTextColor={colors.Colors.gray}
                  keyboardType="numeric"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                  maxLength={1}
                />
              </View>
            </View>
            <View style={styles.otpHeading}>
              <Text style={[styles.otpHeadingText, {color: '#707070'}]}>
                You can only access to your account using this OTP pin
              </Text>
            </View>
            <View
              style={[
                styles.otpHeading,
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Image
                source={require('../../../asessts/images/check-circle.png')}
              />
              <Text style={[styles.otpHeadingText, {color: '#707070'}]}>
                I agree to the terms of use and privacy policy
              </Text>
            </View>
            <LinearGradient
              colors={[colors.Colors.blueLight, colors.Colors.blueDark]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.linear}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onSubmit()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </LinearGradient>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default PhoneOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F1F1',
  },
  otpHeading: {
    marginTop: 50,
    marginBottom: 30,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  otpHeadingText: {
    fontSize: 16,
    color: colors.Colors.blueLight,
    fontFamily: font.Fonts.josefBold,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  SectionStyle: {
    height: 50,
    width: 50,
    backgroundColor: '#E1E1E1',
    borderRadius: 100,
  },
  inputStyle: {
    color: colors.Colors.gray,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#E1E1E1',
    fontFamily: font.Fonts.josefReg,
    fontSize: 20,
    height: 50,
    width: 50,
    textAlign: 'center',
  },
  linear: {
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
    fontFamily: font.Fonts.josefBold,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successImg: {
    height: 200,
    width: 200,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  successText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  successTextHeading: {
    color: '#43AEFF',
    fontSize: 30,
    fontFamily: font.Fonts.josefLight,
  },
  successTextPara: {
    fontSize: 16,
    color: '#707070',
    fontFamily: font.Fonts.josefReg,
    textAlign: 'center',
  },
});
