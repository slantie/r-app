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
            // Use real API flow (mock data mode removed)
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
                console.log('OTP Success', response.data);
                // New API structure: response.data = { success, message, data: {...} }
                const apiData = response.data?.data || response.data?.result; // Support both old and new API

                // Store access token for subsequent API calls
                PrefManager.setValue(STRING.TOKEN, apiData.accessToken);

                // New API returns: isNewUser, isProfileComplete, isMemberRegistered, memberStatus
                const isNewUser = apiData.isNewUser;
                const isProfileComplete = apiData.isProfileComplete;
                const isMemberRegistered = apiData.isMemberRegistered;
                const memberStatus = apiData.memberStatus;

                console.log(
                    '🔑 OTP verified successfully',
                    '\n  - Is New User:', isNewUser,
                    '\n  - Profile Complete:', isProfileComplete,
                    '\n  - Member Registered:', isMemberRegistered,
                    '\n  - Member Status:', memberStatus
                );

                // Prepare userData object for storage and navigation
                const userData = {
                    ...apiData.user,
                    accessToken: apiData.accessToken,
                    isNewUser,
                    isProfileComplete,
                    isMemberRegistered,
                    memberStatus,
                    member: apiData.member
                };

                // Navigation logic based on registration state:
                // Step 1: If profile is not complete, go to profile completion
                if (!isProfileComplete) {
                    console.log('📝 Profile incomplete - navigating to profile setup');
                    PrefManager.setValue('userData', JSON.stringify(userData));
                    navigation.navigate('Profile', { userData });
                }
                // Step 2: If profile complete but not registered as member, go to building selection
                else if (!isMemberRegistered) {
                    console.log('🏢 Profile complete but not a member - navigating to building selection');
                    PrefManager.setValue('userData', JSON.stringify(userData));
                    navigation.navigate('WhoAmI', { userData }); // Reuse this screen for building selection
                }
                // Step 3: If member registered but pending approval, show status and go to home
                else if (memberStatus === 'pending') {
                    console.log('⏳ Member registration pending approval - navigating to home');
                    PrefManager.setValue('userData', JSON.stringify(userData));
                    Alert.alert(
                        'Registration Pending',
                        'Your membership request is pending approval from the building admin. You can still explore the app.',
                        [{ text: 'OK' }]
                    );
                    dispatch(
                        setAuthToken({
                            accessToken: userData.accessToken,
                            userData: userData,
                        }),
                    );
                }
                // Step 4: Member approved - full access to main app
                else if (memberStatus === 'approved') {
                    console.log('✅ Member approved - full access granted');
                    PrefManager.setValue('userData', JSON.stringify(userData));
                    dispatch(
                        setAuthToken({
                            accessToken: userData.accessToken,
                            userData: userData,
                        }),
                    );
                }
                // Fallback: Any other status
                else {
                    console.log('ℹ️ Unknown member status - navigating to home with limited access');
                    PrefManager.setValue('userData', JSON.stringify(userData));
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
