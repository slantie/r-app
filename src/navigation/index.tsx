import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import AuthStack from './stackNavigator/authStack';
import AppStack from './stackNavigator/appStack';
import PrefManager from '../utils/prefManager';
import { setAuthToken } from '../store/actions/auth/loginAction';
import { COLORS, STRING } from '../constants';


const RootNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: any) => state.otp);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await PrefManager.getValue(STRING.TOKEN);
      const userData = await PrefManager.getValue('userData');
      if (token && userData) {
        console.log('✅ Token found, dispatching setAuthToken...');
        dispatch(setAuthToken({ accessToken: token, userData }));
      } else {
        console.log('❌ No token found');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Log when isAuthenticated changes
  useEffect(() => {
    console.log('🔄 isAuthenticated changed to:', isAuthenticated);
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.WHITE }}>
        <ActivityIndicator size="large" color={COLORS.BLACK} />
      </View>
    );
  }

  return (
    <NavigationContainer key={isAuthenticated ? 'authenticated' : 'unauthenticated'}>
      {isAuthenticated ? (
        <>
          <AppStack />
        </>
      ) : (
        <>
          <AuthStack />
        </>
      )}
    </NavigationContainer>
  );
}

export default RootNavigation;