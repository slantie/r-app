// API Service Wrapper
// Handles switching between MOCK and REAL API calls
// Change USE_MOCK_DATA to toggle between mock and real backend

import { AxiosResponse } from 'axios';
import { MakeApiRequest } from './apiService';
import MockApiService from './mockApiService';
import { GET, POST } from '../constants/api';
import { print } from '../utils/method';

// ============================================
// 🎛️ CONFIGURATION - TOGGLE HERE
// ============================================

/**
 * Toggle between Mock and Real API
 * 
 * true  = Use mock data (no backend needed)
 * false = Use real backend API
 */
export const USE_MOCK_DATA = true; // 👈 CHANGE THIS TO FALSE WHEN BACKEND IS READY

// ============================================
// ENHANCED API WRAPPER
// ============================================

interface EnhancedApiRequestProps {
  apiUrl: string;
  apiMethod?: string;
  apiData?: any;
  apiHeaders?: Record<string, string>;
  apiParams?: Record<string, any>;
  timeout?: number;
  mockHandler?: () => Promise<any>; // Optional mock handler
}

/**
 * Enhanced API Request that supports mock data
 */
export async function MakeEnhancedApiRequest({
  apiUrl,
  apiMethod = GET,
  apiData = {},
  apiHeaders = {},
  apiParams = {},
  timeout = 15000,
  mockHandler,
}: EnhancedApiRequestProps): Promise<AxiosResponse<any>> {
  
  // If mock mode is enabled and mock handler is provided
  if (USE_MOCK_DATA && mockHandler) {
    try {
      print(`[MOCK MODE] Calling mock handler for: ${apiUrl}`, '', 1);
      const mockResponse = await mockHandler();
      
      // Format mock response to match Axios response structure
      const formattedResponse: AxiosResponse = {
        data: mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      
      print('[MOCK MODE] Mock response:', mockResponse, 1);
      return Promise.resolve(formattedResponse);
    } catch (error: any) {
      print('[MOCK MODE] Mock error:', error, 0);
      return Promise.reject(error);
    }
  }

  // Use real API
  print(`[REAL API MODE] Calling: ${apiUrl}`, '', 1);
  return MakeApiRequest({
    apiUrl,
    apiMethod,
    apiData,
    apiHeaders,
    apiParams,
    timeout,
  });
}

// ============================================
// SPECIALIZED API WRAPPERS
// ============================================

/**
 * Login API - Send OTP
 */
export const apiSendPhoneOTP = async (
  apiUrl: string,
  credentials: { countryCode: string; phoneNumber: string }
) => {
  return MakeEnhancedApiRequest({
    apiUrl,
    apiMethod: POST,
    apiData: credentials,
    mockHandler: USE_MOCK_DATA
      ? () => MockApiService.sendPhoneOTP(credentials.countryCode, credentials.phoneNumber)
      : undefined,
  });
};

/**
 * OTP Verify API
 */
export const apiVerifyPhoneOTP = async (
  apiUrl: string,
  credentials: {
    countryCode: string;
    phoneNumber: string;
    otp: string;
    type?: string;
    newCounrtryCode?: string;
    newPhoneNumber?: string;
  }
) => {
  return MakeEnhancedApiRequest({
    apiUrl,
    apiMethod: POST,
    apiData: credentials,
    mockHandler: USE_MOCK_DATA
      ? () =>
          MockApiService.verifyPhoneOTP(
            credentials.countryCode,
            credentials.phoneNumber,
            credentials.otp
          )
      : undefined,
  });
};

/**
 * Resend OTP API
 */
export const apiResendOTP = async (
  apiUrl: string,
  credentials: { countryCode: string; phoneNumber: string }
) => {
  return MakeEnhancedApiRequest({
    apiUrl,
    apiMethod: POST,
    apiData: credentials,
    mockHandler: USE_MOCK_DATA
      ? () => MockApiService.resendOTP(credentials.countryCode, credentials.phoneNumber)
      : undefined,
  });
};

/**
 * Territory List API
 */
export const apiGetTerritoryList = async (
  apiUrl: string,
  params?: { page?: number }
) => {
  return MakeEnhancedApiRequest({
    apiUrl,
    apiMethod: GET,
    apiParams: params,
    mockHandler: USE_MOCK_DATA
      ? () => MockApiService.getTerritoryList(params?.page || 1)
      : undefined,
  });
};

/**
 * Who Am I - Identity Selection API
 */
export const apiWhoAmI = async (
  apiUrl: string,
  data: { identityType: string }
) => {
  return MakeEnhancedApiRequest({
    apiUrl,
    apiMethod: POST,
    apiData: data,
    mockHandler: USE_MOCK_DATA
      ? () => MockApiService.whoAmI(data.identityType)
      : undefined,
  });
};

/**
 * Submit Territory Details API
 */
export const apiSubmitTerritoryDetails = async (
  apiUrl: string,
  data: any // Accept any territory payload structure
) => {
  return MakeEnhancedApiRequest({
    apiUrl,
    apiMethod: POST,
    apiData: data,
    mockHandler: USE_MOCK_DATA
      ? () => MockApiService.submitTerritoryDetails(data)
      : undefined,
  });
};

/**
 * Profile Registration API
 */
export const apiProfileRegistration = async (
  apiUrl: string,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    gender?: string;
    profileImage?: string;
  }
) => {
  return MakeEnhancedApiRequest({
    apiUrl,
    apiMethod: POST,
    apiData: data,
    mockHandler: USE_MOCK_DATA
      ? () => MockApiService.profileRegistration(data)
      : undefined,
  });
};

/**
 * Generic API call (for endpoints without specific mock handlers)
 */
export const apiGenericRequest = async (
  apiUrl: string,
  apiMethod: string = GET,
  apiData?: any,
  apiParams?: any
) => {
  return MakeEnhancedApiRequest({
    apiUrl,
    apiMethod,
    apiData,
    apiParams,
    // No mock handler - will use real API or fail gracefully
  });
};
