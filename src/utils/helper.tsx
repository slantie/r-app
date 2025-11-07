import { Linking, PermissionsAndroid, Platform } from "react-native";
import { countryPhoneData } from "../constants/countryCodes";
import moment from "moment";
import RNFS from "react-native-fs";
import { Image as CompressorImage } from "react-native-compressor";
import ImageResizer from '@bam.tech/react-native-image-resizer';


export const getMaxPhoneLength = (CountryCode: string) => {
    const countryData = countryPhoneData;
    const country = countryData.find((item: any) => item.dial_code === CountryCode);
    return country ? country.max_phone_length : 10;
  };

// Format phone number with country code for display
export const formatPhoneNumber = (phoneNumber: string, countryCode: string = '+91'): string => {
  if (!phoneNumber || phoneNumber === 'Not specified') {
    return 'Not specified';
  }

  // Clean the phone number - remove all non-digits except +
  let cleanedPhone = phoneNumber.replace(/[^\d+]/g, '');
  let cleanedCountryCode = countryCode.replace(/[^\d+]/g, '');

  // If country code doesn't start with +, add it
  if (cleanedCountryCode && !cleanedCountryCode.startsWith('+')) {
    cleanedCountryCode = '+' + cleanedCountryCode;
  }

  // If phone number already has country code, use it as is
  if (cleanedPhone.startsWith('+')) {
    return cleanedPhone;
  }

  // Combine country code and phone number
  return `${cleanedCountryCode} ${cleanedPhone}`;
};

// Extract country code and phone number from a full phone number
export const parsePhoneNumber = (fullPhoneNumber: string): { countryCode: string; phoneNumber: string } => {
  if (!fullPhoneNumber || fullPhoneNumber === 'Not specified') {
    return { countryCode: '+91', phoneNumber: '' };
  }

  // Clean the phone number
  let cleaned = fullPhoneNumber.replace(/[^\d+]/g, '').trim();

  // If starts with +, extract country code and number
  if (cleaned.startsWith('+')) {
    const match = cleaned.match(/^(\+\d{1,4})(\d{7,})$/);
    if (match) {
      return {
        countryCode: match[1],
        phoneNumber: match[2]
      };
    } else {
      // Fallback: assume +91 if match fails
      return {
        countryCode: '+91',
        phoneNumber: cleaned.replace(/^\+\d{1,4}/, '')
      };
    }
  } else {
    // For numbers without +, assume they are Indian numbers
    return {
      countryCode: '+91',
      phoneNumber: cleaned
    };
  }
};

export const getImageNameFromUri = (uri: string) => {
    const parts = uri.split('/');
    return parts[parts.length - 1];
};

export const openLink = (url: string) => {
  // Properly encode the URL to handle spaces and special characters
  const encodedUrl = encodeURI(url);
  Linking.openURL(encodedUrl).catch(err => console.error('Failed to open URL:', err));
};

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.trim().length > 0;
};

export const validateRequiredFields = (fields: { [key: string]: string }, requiredFields: string[]): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  requiredFields.forEach(field => {
    const value = fields[field];
    if (!value || !value.trim()) {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
      errors.push(`${fieldName} is required`);
    }
  });

  // Special validation for email if it exists
  if (fields.email && fields.email.trim() && !validateEmail(fields.email)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Property utility functions
export const extractFlatNumber = (propertyName: string): string | null => {
  // Safety check for input
  if (!propertyName || typeof propertyName !== 'string') {
    return null;
  }

  // Match patterns like "105, Gurukul Road" or "A-101, Building Name" or "Flat 202, Tower A"
  const patterns = [
    /^(\d+)[,\s]/, // "105, " or "105 "
    /^([A-Z]?\d+[A-Z]?)[,\s]/, // "A101, " or "101A, "
    /^Flat\s*(\d+)[,\s]/i, // "Flat 202, " or "flat 202 "
    /^House\s*(\d+)[,\s]/i, // "House 101, " or "house 101 "
    /^Office\s*(\d+)[,\s]/i, // "Office 301, " or "office 301 "
  ];

  try {
    for (const pattern of patterns) {
      const match = propertyName.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
  } catch (error) {
    console.error('Error in extractFlatNumber:', error);
  }

  return null;
};

export const extractPropertyName = (propertyName: string): string => {
  // Safety check for input
  if (!propertyName || typeof propertyName !== 'string') {
    return '';
  }

  // Remove flat number patterns from the beginning
  const patterns = [
    /^(\d+)[,\s]+/, // "105, " or "105 "
    /^([A-Z]?\d+[A-Z]?)[,\s]+/, // "A101, " or "101A, "
    /^Flat\s*\d+[,\s]+/i, // "Flat 202, " or "flat 202 "
    /^House\s*\d+[,\s]+/i, // "House 101, " or "house 101 "
    /^Office\s*\d+[,\s]+/i, // "Office 301, " or "office 301 "
  ];

  try {
    let cleanedName = propertyName;
    for (const pattern of patterns) {
      cleanedName = cleanedName.replace(pattern, '');
    }

    return cleanedName.trim();
  } catch (error) {
    console.error('Error in extractPropertyName:', error);
    return propertyName.trim(); // Return original name if pattern matching fails
  }
};

// Image picker configuration
export const IMAGE_PICKER_CONFIG = {
  width: 300,
  height: 400,
  cropping: true,
  compressImageQuality: 0.7,
  compressImageMaxHeight: 1000,
  compressImageMaxWidth: 1000,
};

// Create image form data
export const createImageFormData = (image: any) => ({
  uri: image.path,
  type: image.mime,
  name: getImageNameFromUri(image.path),
});

// Form validation utilities
export const validatePropertyFields = (propertyDetails: any) => {
  const requiredFields = {
    selectedProperty: propertyDetails.selectedProperty,
    landmark: propertyDetails.landmark,
    pinCode: propertyDetails.pinCode,
    area: propertyDetails.area,
    city: propertyDetails.city,
    state: propertyDetails.state,
    country: propertyDetails.country,
    lat: propertyDetails.lat,
    long: propertyDetails.long
  };

  const validation = validateRequiredFields(requiredFields, [
    'selectedProperty', 'landmark', 'pinCode', 'area', 'city', 'state', 'country', 'lat', 'long'
  ]);

  if (!validation.isValid) {
    return {
      isValid: false,
      message: 'Please fill all required property fields:\n' + validation.errors.join('\n')
    };
  }

  if (!propertyDetails.lat || !propertyDetails.long) {
    return {
      isValid: false,
      message: 'Please select a property location from the search results'
    };
  }

  return { isValid: true, message: '' };
};

export const validatePersonalFields = (personalDetails: any) => {
  const requiredFields = {
    firstName: personalDetails.firstName,
    lastName: personalDetails.lastName,
    phone: personalDetails.phone,
    email: personalDetails.email
  };

  const validation = validateRequiredFields(requiredFields, ['firstName', 'lastName', 'phone', 'email']);

  if (!validation.isValid) {
    return {
      isValid: false,
      message: validation.errors.join('\n')
    };
  }

  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!phoneRegex.test(personalDetails.phone.trim())) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number'
    };
  }

  return { isValid: true, message: '' };
};

export const FormatTime = (date: Date) => {
  return moment(date).format('h:mm A');
};

// Location permission and geolocation helpers
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to show your current position on the map.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Location permission error:', err);
      return false;
    }
  } else {
    // For iOS, permissions are handled automatically by react-native-maps
    return true;
  }
};

export const getCurrentPosition = (): Promise<any> => {
  return new Promise((resolve) => {
    try {
      // Use React Native's Geolocation API
      if ((global as any).navigator && (global as any).navigator.geolocation) {
        (global as any).navigator.geolocation.getCurrentPosition(
          (position: any) => resolve(position),
          (error: any) => {
            console.warn('Geolocation error:', error);
            resolve(null);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          }
        );
      } else {
        resolve(null);
      }
    } catch (error) {
      console.warn('getCurrentPosition error:', error);
      resolve(null);
    }
  });
};

// Image orientation correction using ImageResizer for proper EXIF handling
export const correctImageOrientation = async (imagePath: string, options: {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  isSamsung?: boolean;
  isIQOO?: boolean;
  isMotorola?: boolean;
} = {}): Promise<string> => {
  try {
    console.log('Correcting image orientation for path:', imagePath);
    console.log('Is Samsung device:', options.isSamsung);
    console.log('Is iQOO device:', options.isIQOO);

    // Different handling for Samsung, iQOO vs other devices
    let rotation = 0; // Default auto-rotate based on EXIF
    const quality = Math.round((options.quality || 0.85) * 100);
    let keepMeta = false; // Don't keep metadata to avoid orientation confusion

    // iQOO-specific handling
    if (options.isIQOO) {
      rotation = -90; // Force -90° rotation for iQOO devices to fix API image orientation
      keepMeta = false;
      console.log('Applying iQOO-specific -90° rotation fix for API');
    } else if (options.isSamsung) {
      rotation = 270; // Force 270° rotation for Samsung devices (wrong rotation for API)
      keepMeta = false;
      console.log('Applying Samsung-specific 270° rotation (wrong rotation for API)');
    } else if (options.isMotorola) {
      rotation = 270; // Force 270° rotation for Motorola devices (wrong rotation for API)
      keepMeta = false;
      console.log('Applying Motorola-specific 270° rotation (wrong rotation for API)');
    }

    console.log('Processing parameters:', { rotation, quality, keepMeta, isIQOO: options.isIQOO });

    // Use ImageResizer which properly handles EXIF orientation
    const resizedImage = await ImageResizer.createResizedImage(
      imagePath,
      options.maxWidth || 800,
      options.maxHeight || 800,
      'JPEG',
      quality,
      rotation, // rotation (0 means auto-rotate based on EXIF)
      undefined, // outputPath (let it generate)
      keepMeta, // keepMeta - false for Samsung, true for others
      {
        mode: 'contain',
        onlyScaleDown: true,
      }
    );

    console.log('Image orientation corrected successfully with ImageResizer');
    return resizedImage.uri;
  } catch (error) {
    console.error('Error correcting image orientation with ImageResizer:', error);

    // Fallback to CompressorImage if ImageResizer fails
    try {
      console.log('Trying CompressorImage fallback...');
      const correctedPath = await CompressorImage.compress(imagePath, {
        maxWidth: options.maxWidth || 800,
        maxHeight: options.maxHeight || 800,
        quality: options.quality || 0.85,
        output: 'jpg',
      });
      console.log('Fallback to CompressorImage successful');
      return correctedPath;
    } catch (fallbackError) {
      console.error('Fallback compression also failed:', fallbackError);

      // Last resort: try basic compression without resizing
      try {
        console.log('Trying basic compression as last resort...');
        const basicCompressed = await CompressorImage.compress(imagePath, {
          quality: 0.9,
          output: 'jpg',
        });
        console.log('Basic compression successful');
        return basicCompressed;
      } catch (basicError) {
        console.error('Basic compression failed:', basicError);
        return imagePath; // Return original if all fails
      }
    }
  }
};

 // Helper function to convert yyyy-mm-dd to dd-mm-yyyy
 export const formatDateToDisplay = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

// Helper function to convert dd-mm-yyyy to yyyy-mm-dd
export const formatDateToServer = (dateString: string) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

// Helper function to strip HTML tags and get plain text
export const stripHtmlTags = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};