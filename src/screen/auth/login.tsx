import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Loginstyles } from './styles';
import {
  Container,
  CountryInputField,
  CustomButton,
  KeyboardAvoidingView,
} from '../../components/common';
import { COLORS, IMAGES } from '../../constants';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/actions/auth/loginAction';
import { getMaxPhoneLength, openLink } from '../../utils/helper';
import PrefManager from '../../utils/prefManager';
import STRING from '../../constants/strings';
import { validateIndianPhoneNumber } from '../../utils/validationHelper';

const Login = ({ navigation }: any) => {
  const dispatch = useDispatch() as any;
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneError, setPhoneError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code);
    setPhoneError(''); // Clear error when country code changes
  };

  const handlePhoneNumberChange = (text: string) => {
    setMobileNumber(text);
    setPhoneError(''); // Clear error when phone number changes
  };

  // Auto-clear error after 2 seconds
  useEffect(() => {
    if (phoneError) {
      const timer = setTimeout(() => {
        setPhoneError('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [phoneError]);

  const handleLoginValidation = () => {
    const maxLength = getMaxPhoneLength(countryCode);

    // Check if mobile number is blank
    if (mobileNumber.trim() === '') {
      setPhoneError('Please enter your mobile number');
      return;
    }

    // Check if mobile number length is less than required
    if (mobileNumber.length < maxLength) {
      setPhoneError(
        `Please enter a valid phone number with ${maxLength} digits.`,
      );
      return;
    }

    // Special validation for Indian phone numbers (+91)
    if (countryCode === '+91') {
      const validationResult = validateIndianPhoneNumber(
        mobileNumber,
        countryCode,
      );
      if (!validationResult.isValid) {
        setPhoneError(
          validationResult.fieldErrors.phoneNumber || 'Invalid phone number',
        );
        return;
      }
    }

    // If validation passes, clear error and proceed with login
    setPhoneError('');
    handleLogin();
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Clear any existing token
      PrefManager.removeValue(STRING.TOKEN);

      // Static credentials bypass - check if mobile number matches static number
      const STATIC_MOBILE_NUMBER = '9988776655';

      if (mobileNumber === STATIC_MOBILE_NUMBER) {
        console.log('Static login detected - bypassing API');
        // Navigate directly to OTP screen with phone number
        navigation.navigate('OtpScreen', {
          phoneNumber: mobileNumber,
          countryCode: countryCode,
        });
        setIsLoading(false);
        return;
      }

      // Original API flow for other numbers
      const payload = {
        countryCode: countryCode,
        phoneNumber: mobileNumber,
      };

      const response = await dispatch(loginAction(payload));

      if (response.status === 200) {
        console.log('Login Success', response.data);
        // Navigate to OTP screen with phone number
        navigation.navigate('OtpScreen', {
          phoneNumber: mobileNumber,
          countryCode: countryCode,
        });
      } else {
        console.log('Login Failed', response);
        Alert.alert('Login Failed', 'Please try again');
      }
    } catch (error: any) {
      console.log('Login error:', error);
      Alert.alert('Login Failed', error.message || 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsPress = () => {
    openLink('https://realestateos.io/terms-and-conditions');
  };

  const handlePrivacyPress = () => {
    openLink('https://realestateos.io/privacy-policy');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={Loginstyles.container}>
            {/* App Logo */}
            <View style={Loginstyles.header}>
              <Image source={IMAGES.APP_LOGO} style={Loginstyles.logo} />
            </View>

            {/* Login Title */}
            <View style={Loginstyles.titleContainer}>
              <Text style={Loginstyles.title}>Login</Text>
            </View>

            {/* Mobile Number Input Section */}
            <View style={Loginstyles.inputSection}>
              <Text style={Loginstyles.inputLabel}>
                Enter your mobile number to receive a verification code.
              </Text>
            </View>
            <View style={Loginstyles.inputContainer}>
              <CountryInputField
                placeholder="Mobile No"
                value={mobileNumber}
                onChangeText={handlePhoneNumberChange}
                onCountryCodeChange={handleCountryCodeChange}
                maxLength={getMaxPhoneLength(countryCode)}
              />
            </View>

            {/* Error Message */}
            {phoneError ? (
              <View
                style={[Loginstyles.errorContainer, { alignSelf: 'flex-end' }]}
              >
                <Text style={Loginstyles.errorText}>{phoneError}</Text>
              </View>
            ) : null}

            {/* Continue Button */}
            <View style={Loginstyles.buttonContainer}>
              <CustomButton
                title="Continue"
                onPress={handleLoginValidation}
                loading={isLoading}
              />
              <View style={Loginstyles.termsContainer}>
                <Text style={Loginstyles.termsText}>
                  By continuing you agree to the{' '}
                  <Text style={Loginstyles.linkText} onPress={handleTermsPress}>
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={Loginstyles.linkText}
                    onPress={handlePrivacyPress}
                  >
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
