import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Keyboard, Platform, TouchableOpacity, Alert, TouchableWithoutFeedback, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OtpScreenStyles } from './styles';
import { CustomButton, KeyboardAvoidingView } from '../../components/common';
import { IMAGES } from '../../constants';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { useDispatch } from 'react-redux';
import { otpVarifyAction } from '../../store/actions/auth/otpVarifyAction';
import { loginAction, setAuthToken } from '../../store/actions/auth/loginAction';
import PrefManager from '../../utils/prefManager';
import STRING from '../../constants/strings';

const OtpScreen = ({ route, navigation }: any) => {
    const dispatch = useDispatch() as any;
    const CELL_COUNT = 6;
    const [cursorVisible, setCursorVisible] = useState(true);
    const codeFieldRef = useRef<any>(null);
    const [value, setValue] = useState("");
    const [otp, setOtp] = useState<string>("");
    const [timer, setTimer] = useState(120);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Get phone number and country code from route params
    const { phoneNumber, countryCode } = route.params || { phoneNumber: '', countryCode: '+91' };

    const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Get remaining time from storage
    const getRemainingTime = async () => {
        try {
            const endTime = await AsyncStorage.getItem('otp_timer_end_time');
            if (endTime) {
                return Math.max(0, Math.floor((parseInt(endTime) - Date.now()) / 1000));
            }
        } catch (error) {
            console.log('Timer error:', error);
        }
        return 0;
    };

    // Update timer display and handle expiry
    const updateTimer = async () => {
        const remaining = await getRemainingTime();
        setTimer(remaining);
        setIsResendDisabled(remaining > 0);

        if (remaining <= 0) {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
            await AsyncStorage.removeItem('otp_timer_end_time');
        }
    };

    // Start or restart timer
    const startTimer = async () => {
        const endTime = Date.now() + (120 * 1000);
        await AsyncStorage.setItem('otp_timer_end_time', endTime.toString());

        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

        setTimer(120);
        setIsResendDisabled(true);
        timerIntervalRef.current = setInterval(updateTimer, 1000);
    };

    // Handle app foreground
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (state) => {
            if (state === 'active') updateTimer();
        });
        return () => subscription.remove();
    }, []);

    // Initialize timer on mount
    useEffect(() => {
        const init = async () => {
            const remaining = await getRemainingTime();
            if (remaining > 0) {
                setTimer(remaining);
                setIsResendDisabled(true);
                timerIntervalRef.current = setInterval(updateTimer, 1000);
            } else {
                startTimer();
            }
        };
        init();
        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, []);

    const handleOtpChange = (value: any) => {
        // Only allow numeric characters (0-9)
        const sanitizedVal = value.replace(/[^0-9]/g, '');
        setOtp(sanitizedVal);
        if (sanitizedVal.length === CELL_COUNT) {
            Keyboard.dismiss();
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleOtpVerification = async () => {
        // Dismiss keyboard when verifying OTP
        Keyboard.dismiss();

        if (otp.length !== CELL_COUNT) {
            Alert.alert('Validation Error', 'Please enter a valid 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            // Static credentials bypass - check if mobile number and OTP match static values
            const STATIC_MOBILE_NUMBER = '9988776655';
            const STATIC_OTP = '123456';

            if (phoneNumber === STATIC_MOBILE_NUMBER && otp === STATIC_OTP) {
                console.log('Static OTP verification detected - bypassing API and going directly to home');

                // Create mock user data to bypass all profile checks
                const mockUserData = {
                    accessToken: 'static_auth_token_' + Date.now(),
                    isProfileSubmit: true,
                    identitySelection: 'completed',
                    isTerritorySubmit: true,
                    phoneNumber: phoneNumber,
                    countryCode: countryCode,
                    // Add any other required user data fields
                };

                // Store access token and user data
                PrefManager.setValue(STRING.TOKEN, mockUserData.accessToken);
                PrefManager.setValue('userData', mockUserData);

                // Set authentication token to bypass all screens and go directly to home
                dispatch(
                    setAuthToken({
                        accessToken: mockUserData.accessToken,
                        userData: mockUserData,
                    }),
                );

                setIsLoading(false);
                return;
            }

            // Original API flow for other credentials
            const payload = {
                countryCode: countryCode,
                phoneNumber: phoneNumber,
                otp: otp,
                type: 'New',
                newCounrtryCode: countryCode,
                newPhoneNumber: phoneNumber
            };

            const response = await dispatch(otpVarifyAction(payload));

            if (response.status === 200) {
                console.log('OTP Success', response.data?.result);
                const userData = response.data?.result;

                // Store access token for subsequent API calls
                PrefManager.setValue(STRING.TOKEN, userData.accessToken);

                // Three-step flow check
                const isProfileSubmit = userData.isProfileSubmit;
                const identitySelection = userData.identitySelection;
                const isTerritorySubmit = userData.isTerritorySubmit;

                console.log(
                    'Profile Status:', isProfileSubmit,
                    'Identity Selection:', identitySelection,
                    'Territory Status:', isTerritorySubmit,
                );

                // Step 1: Check if profile is submitted
                if (!isProfileSubmit) {
                    console.log('📝 Profile not submitted - moving to profile setup');
                    navigation.navigate('Profile', { userData });
                }
                // Step 2: If profile is submitted, check identity selection
                else if (!identitySelection || identitySelection === "") {
                    console.log('🆔 Profile submitted but identity not selected - moving to WhoAmI screen');
                    navigation.navigate('WhoAmI', { userData });
                }
                // Step 3: If identity is selected, check territory submission
                else if (!isTerritorySubmit) {
                    console.log('📍 Profile and identity submitted but territory not submitted - moving to territory setup');
                    navigation.navigate('Territory', { userData });
                }
                // All three conditions are met - proceed to main app
                else {
                    console.log('✅ All steps completed - logging in to main app');
                    PrefManager.setValue('userData', userData);
                    dispatch(
                        setAuthToken({
                            accessToken: userData.accessToken,
                            userData: userData,
                        }),
                    );
                }
            } else {
                console.log('OTP Failed', response);
                Alert.alert('OTP Verification Failed', 'Please try again');
            }
        } catch (error: any) {
            console.log('OTP error:', error.response?.data?.message || error.message);
            Alert.alert(
                'OTP Verification Failed',
                error.response?.data?.message || 'Please try again',
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (isResendDisabled) return;

        // Dismiss keyboard when resending OTP
        Keyboard.dismiss();

        try {
            const payload = {
                countryCode: countryCode,
                phoneNumber: phoneNumber,
            };

            const response = await dispatch(loginAction(payload));

            if (response.status === 200) {
                console.log('Resend OTP Success', response.data?.result);
                console.log('✅ OTP resent successfully');
                // Start new timer countdown
                startTimer();
                Alert.alert('Success', 'OTP has been resent to your mobile number');
            } else {
                console.log('Resend OTP Failed', response);
                Alert.alert('Resend Failed', 'Please try again');
            }
        } catch (error: any) {
            console.log(
                'Resend OTP Failed',
                error.response?.data?.message || error.message,
            );
            Alert.alert(
                'Resend OTP Failed',
                error.response?.data?.message || 'Please try again',
            );
        }
    };

    const handleEditPhone = () => {
        // Dismiss keyboard when editing phone
        Keyboard.dismiss();
        navigation.goBack();
    };

    const formatTimer = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={OtpScreenStyles.container}>
                    <View style={OtpScreenStyles.header}>
                        <Image source={IMAGES.APP_LOGO} style={OtpScreenStyles.logo} />
                    </View>
                    <View style={OtpScreenStyles.titleContainer}>
                        <Text style={OtpScreenStyles.title}>VERIFY OTP</Text>
                        <Text style={OtpScreenStyles.subtitle}>Enter the 6-digit code sent to your mobile number.</Text>
                    </View>
                    <View style={OtpScreenStyles.mobileContainer}>
                        <Text style={OtpScreenStyles.mobileText}>{countryCode} {phoneNumber}</Text>
                        <TouchableOpacity onPress={handleEditPhone}>
                            <Image source={IMAGES.EDIT} style={OtpScreenStyles.editIcon}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: '15%'}}>
                        <CodeField
                            ref={codeFieldRef}
                            {...prop}
                            value={otp}
                            onChangeText={handleOtpChange}
                            cellCount={CELL_COUNT}
                            rootStyle={{
                                alignSelf: 'center',
                            }}
                            textContentType="oneTimeCode"
                            keyboardType="number-pad"
                            returnKeyType="done"
                            autoFocus={true}
                            onSubmitEditing={dismissKeyboard}
                            blurOnSubmit={true}
                            {...(Platform.OS === 'android' ? { autoComplete: 'sms-otp' } : {})}
                            renderCell={({ index, symbol, isFocused }) => (
                                <View
                                    key={index}
                                    style={[OtpScreenStyles.otpCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    <Text style={OtpScreenStyles.otpCellText}>
                                        {symbol || (isFocused ? (cursorVisible ? "|" : " ") : "*")}
                                    </Text>
                                </View>
                            )}
                        />
                        <Text style={OtpScreenStyles.timer}>{formatTimer(timer)}</Text>
                    </View>
                    <View style={{alignSelf:'center',marginTop:'10%'}}>
                        <CustomButton
                            title='Verify OTP'
                            onPress={handleOtpVerification}
                            disabled={otp.length !== CELL_COUNT || isLoading}
                        />
                    </View>
                    <View style={OtpScreenStyles.resendContainer}>
                        <Text style={OtpScreenStyles.resendText}>Didn't receive the code?</Text>
                        <TouchableOpacity
                            onPress={handleResendOtp}
                            disabled={isResendDisabled}
                            activeOpacity={isResendDisabled ? 0.5 : 1}
                        >
                            <Text style={[
                                OtpScreenStyles.resendButtonText,
                                isResendDisabled && { opacity: 0.5 }
                            ]}>
                                Resend OTP
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default OtpScreen;
