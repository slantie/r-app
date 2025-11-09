/**
 * Environment Configuration
 * 
 * Manages API URLs and configuration for different environments
 * - Development: Local backend servers
 * - Production: Deployed backend servers
 */

import { Platform } from 'react-native';

// Environment type
type Environment = 'development' | 'production';

// Configuration interface
interface ApiConfig {
  SOCIETY_API_URL: string;
  USER_API_URL: string;
  TIMEOUT: number;
  ENABLE_LOGGING: boolean;
}

// Development Configuration
const DEV_CONFIG: ApiConfig = {
  // For Android Emulator: Use 10.0.2.2 instead of localhost
  // For iOS Simulator: Use localhost
  // For Physical Device: Use your computer's IP address (e.g., '192.168.1.100')
  SOCIETY_API_URL: Platform.select({
    android: 'http://10.0.2.2:5000/api',
    ios: 'http://localhost:5000/api',
    default: 'http://localhost:5000/api',
  }) as string,
  
  USER_API_URL: Platform.select({
    android: 'http://10.0.2.2:3000/api',
    ios: 'http://localhost:3000/api',
    default: 'http://localhost:3000/api',
  }) as string,
  
  TIMEOUT: 30000, // 30 seconds for development
  ENABLE_LOGGING: true,
};

// Production Configuration
const PROD_CONFIG: ApiConfig = {
  SOCIETY_API_URL: 'https://society-api.shivalik.com/api',
  USER_API_URL: 'https://user-api.shivalik.com/api',
  TIMEOUT: 15000, // 15 seconds for production
  ENABLE_LOGGING: false,
};

// Determine current environment
const getCurrentEnvironment = (): Environment => {
  // __DEV__ is a React Native global that's true in development
  return __DEV__ ? 'development' : 'production';
};

// Get current configuration
const getConfig = (): ApiConfig => {
  const env = getCurrentEnvironment();
  return env === 'development' ? DEV_CONFIG : PROD_CONFIG;
};

// Export configuration
export const ENV_CONFIG = getConfig();
export const IS_DEV = __DEV__;
export const CURRENT_ENV = getCurrentEnvironment();

// Export individual values for convenience
export const {
  SOCIETY_API_URL,
  USER_API_URL,
  TIMEOUT,
  ENABLE_LOGGING,
} = ENV_CONFIG;

// Logging helper
export const logApiConfig = () => {
  if (ENABLE_LOGGING) {
    console.log('=== API Configuration ===');
    console.log('Environment:', CURRENT_ENV);
    console.log('Society API:', SOCIETY_API_URL);
    console.log('User API:', USER_API_URL);
    console.log('Timeout:', TIMEOUT);
    console.log('========================');
  }
};

// Export for use in other files
export default ENV_CONFIG;
