import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, PermissionsAndroid, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { selectEditProfileLoading, selectEditProfileError } from '../../store/selectors/profile';
import { ProfileScreenStyles } from './styles';
import { Container, HeaderComponent, TextInputField, ImagePickerModal, CalendarPicker } from '../../components/common';
import { COLORS, IMAGES } from '../../constants';
import { BLOOD_GROUPS } from '../../constants/arrays';
import Dropdowns from '../../components/common/dropDown';
import { validateRequiredFields, getImageNameFromUri } from '../../utils/helper';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { commonImageAction } from '../../store/actions/commonImage/imageAction';
import { editProfileAction } from '../../store/actions/profile/editProfileAction';
import { CountryPicker } from 'react-native-country-codes-picker';

const PersonalDetailsScreen = (props: any) => {
  // Helper function to convert yyyy-mm-dd to dd-mm-yyyy
  const formatDateToDisplay = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Helper function to convert dd-mm-yyyy to yyyy-mm-dd
  const formatDateToServer = (dateString: string) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const { userData } = useSelector((state: any) => state.otp);
  const editProfileLoading = useSelector(selectEditProfileLoading);
  const editProfileError = useSelector(selectEditProfileError);
  const dispatch = useDispatch() as any;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageFormData, setImageFormData] = useState<any>(null);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [opencountryPicker, setOpenCountryPicker] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [reflectedDate, setReflectedDate] = useState('');

  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    gender: '',
    nationality: '',
    bloodGroup: ''
  });

  // Set initial data from userData
  useEffect(() => {
    if (userData) {
      console.log("userData==========", userData);

      setPersonalDetails(prevState => ({
        ...prevState,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.countryCode + " " + userData.phoneNumber,
        email: userData.email || '',
        dob: userData.dob || '',
        gender: userData.gender || '',
        nationality: userData.nationality || '',
        bloodGroup: userData.bloodGroup || ''
      }));
      setProfileImageUri(userData.profileImage != "" ? userData.profilePath + userData.profileImage : '');

      // Format and set DOB for display if available
      if (userData.dob) {
        const formattedDate = formatDateToDisplay(userData.dob);
        setReflectedDate(formattedDate);
      }
    }
  }, [userData]);

  // API functions
  const imageUploadApi = (req: any) => dispatch(commonImageAction(req));

  // Handle field changes
  const handleChange = (field: any, value: any) => {
    setPersonalDetails((prevState: any) => ({
      ...prevState,
      [field]: value
    }));
  };

  // Handle Image Upload and Profile Update
  const handleImageUploadAndProfileUpdate = async (imageData: any) => {
    try {
      console.log('Starting automatic image upload and profile update...');

      // Upload image first
      const uploadFormData = new FormData();
      uploadFormData.append('upload_file', imageData);
      uploadFormData.append('root', 'users');
      uploadFormData.append('type', 'profile');

      console.log('Uploading image...');
      const imageUploadResponse = await imageUploadApi(uploadFormData);
      console.log('Image upload response:', imageUploadResponse);

      if (imageUploadResponse.status === 200) {
        const profileImageFileName = imageUploadResponse?.data?.result?.fileName;
        console.log('Image upload successful:', profileImageFileName);

        // Prepare profile data with the new image
        const profileData = {
          firstName: personalDetails.firstName.trim(),
          lastName: personalDetails.lastName.trim(),
          email: personalDetails.email.trim(),
          profileImage: profileImageFileName,
          gender: personalDetails.gender,
          nationality: personalDetails.nationality.trim(),
          bloodGroup: personalDetails.bloodGroup,
          dob: personalDetails.dob,
        };

        // Get user ID from userData
        const userId = userData?._id;

        // Call editProfileAction with the updated profile data
        console.log('Calling editProfileAction with new image...');
        const editProfileResponse = await dispatch(editProfileAction(userId, profileData, userData));

        if (editProfileResponse.status === 200) {
          console.log('Profile updated successfully with new image');
          Alert.alert('Success', 'Profile image updated successfully!');
        } else {
          console.log('Profile update failed');
          Alert.alert('Error', 'Failed to update profile with new image');
        }
      } else {
        console.log('Image upload failed');
        Alert.alert('Error', 'Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleImageUploadAndProfileUpdate:', error);
      Alert.alert('Error', 'Something went wrong while updating your profile image');
    }
  };

  // Safe camera permission handling
  const takePermissions = async (): Promise<boolean> => {
    try {
      console.log('🔒 Starting camera permission check...');

      if (Platform.OS === 'android') {
        // Check if permission is already granted
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        console.log('🔒 Current permission status:', hasPermission);

        if (hasPermission) {
          console.log('✅ Camera permission already granted');
          return true;
        }

        // Request permission if not granted
        console.log('🔒 Permission not granted, requesting permission...');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos for your profile.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );

        console.log('🔒 Permission request result:', granted);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('✅ Camera permission granted after request');
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('❌ Camera permission blocked by user');
          Alert.alert(
            'Permission Required',
            'This app requires access to your Camera to capture photos for your profile.\n\nPlease grant camera permission in Settings to continue.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: () => {
                  try {
                    Linking.openSettings();
                  } catch (error) {
                    console.warn('Failed to open settings:', error);
                    Alert.alert('Error', 'Unable to open settings. Please manually enable camera permission.');
                  }
                },
              },
            ]
          );
          return false;
        } else {
          console.log('❌ Camera permission denied by user');
          Alert.alert(
            'Permission Denied',
            'Camera permission is required to take photos. Please grant permission to continue.',
            [{ text: 'OK' }]
          );
          return false;
        }
      } else {
        // For iOS, we need to handle permissions differently
        console.log('🍎 iOS - checking camera permission...');
        try {
          // On iOS, we'll let the system handle the permission request
          // The permission will be requested when we try to open the camera
          console.log('✅ iOS - camera permission will be handled by system');
          return true;
        } catch (error) {
          console.error('❌ iOS permission check failed:', error);
          return false;
        }
      }
    } catch (error) {
      console.error('❌ Error in takePermissions:', error);
      Alert.alert(
        'Error',
        'Something went wrong while checking camera permissions. Please try again.',
        [{ text: 'OK' }]
      );
      return false;
    }
  };

  // Safe UploadImage function that can be called after permissions are granted
  const UploadImage = async () => {
    try {
      console.log('📷 Opening camera for image capture...');

      // iOS-specific camera configuration to prevent crashes
      const cameraOptions = {
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.7,
      }

      ImagePicker.openCamera(cameraOptions).then(async image => {
        console.log('📷 Camera image captured successfully!');
        setIsImagePickerVisible(false);
        setSelectedImage(image);
        setProfileImageUri(image.path);

        // Prepare form data for image upload
        let imageData: any = {
          uri: image.path,
          type: image.mime,
          name: getImageNameFromUri(image.path),
        };
        setImageFormData(imageData);
        console.log('📷 Camera image data:', imageData);

        // Automatically upload image and call editProfileAction
        await handleImageUploadAndProfileUpdate(imageData);
      }).catch(error => {
        setIsImagePickerVisible(false);
        console.log('❌ Camera error occurred:', {
          code: error.code,
          message: error.message,
          fullError: error
        });

        // Don't show alert if user just cancelled
        if (error.code === 'E_PICKER_CANCELLED') {
          console.log('ℹ️ User cancelled camera');
          return;
        }

        // Provide user-friendly error messages
        if (error.code === 'camera_unavailable') {
          console.log('❌ Camera unavailable on device');
          Alert.alert('Camera Unavailable', 'Camera is not available on this device.');
        } else if (error.code === 'E_NO_CAMERA_PERMISSION' || error.code === 'permission') {
          console.log('❌ Camera permission denied');
          Alert.alert('Permission Denied', 'Camera permission was denied. Please enable it in settings.');
        } else if (error.code === 'E_PICKER_NO_CAMERA_PERMISSION') {
          console.log('❌ Camera permission denied during capture');
          Alert.alert('Permission Denied', 'Camera permission was denied while taking the photo. Please try again.');
        } else if (error.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
          console.log('❌ Camera not available on simulator');
          Alert.alert('Camera Unavailable', 'Camera is not available on simulator. Please test on a real device.');
        } else if (Platform.OS === 'ios' && error.code === 'E_PICKER_CANCELLED') {
          console.log('ℹ️ User cancelled camera on iOS');
          // Don't show alert for user cancellation on iOS
          return;
        } else if (Platform.OS === 'ios' && error.message?.includes('permission')) {
          console.log('❌ iOS camera permission issue');
          Alert.alert(
            'Camera Permission Required',
            'This app needs access to your camera to take photos. Please grant permission in Settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => {
                  try {
                    Linking.openSettings();
                  } catch (settingsError) {
                    console.warn('Failed to open settings:', settingsError);
                  }
                }
              }
            ]
          );
        } else {
          console.log('❌ Unknown camera error:', error);
          Alert.alert('Error', `Failed to open camera: ${error.message || 'Unknown error'}`);
        }
      });
    } catch (error) {
      console.error('❌ Exception in UploadImage:', error);
      setIsImagePickerVisible(false);
      Alert.alert('Error', 'Something went wrong while opening the camera.');
    }
  };

  // Handle Camera Selection - Updated to use safe permission handling
  const handleCameraPress = async () => {
    console.log('📸 Camera button pressed - starting camera flow...');
    try {
      // For iOS, add a small delay to ensure UI is ready
      if (Platform.OS === 'ios') {
        console.log('🍎 iOS detected - adding delay for stability...');
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Check camera permission first using the safe takePermissions function
      console.log('🔒 Checking camera permission...');
      const hasPermission = await takePermissions();
      console.log('🔒 Camera permission result:', hasPermission);

      if (!hasPermission) {
        console.log('❌ Camera permission denied by user');
        setIsImagePickerVisible(false);
        return;
      }

      // If permission is granted, proceed with camera
      console.log('✅ Camera permission granted, proceeding with camera...');

      // Additional delay for iOS to prevent crashes
      if (Platform.OS === 'ios') {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      await UploadImage();
    } catch (error) {
      console.error('❌ Exception in handleCameraPress:', error);
      setIsImagePickerVisible(false);

      // iOS-specific error handling
      if (Platform.OS === 'ios') {
        Alert.alert(
          'Camera Error',
          'Unable to open camera. Please make sure the app has camera permission and try again.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Error', 'Something went wrong while opening the camera.');
      }
    }
  };

  // Check storage permission for gallery access
  const checkStoragePermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        // For Android 13+ (API 33+), we don't need storage permissions for media access
        if (Platform.Version >= 33) {
          return true;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your photo library to select images for your profile.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Storage permission error:', err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  // Handle Gallery Selection
  const handleGalleryPress = async () => {
    try {
      // Check storage permission first
      const hasPermission = await checkStoragePermission();

      if (!hasPermission) {
        Alert.alert(
          'Storage Permission Required',
          'Please grant storage permission to access your photo library.',
          [{ text: 'OK' }]
        );
        setIsImagePickerVisible(false);
        return;
      }

      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.7,
        compressImageMaxHeight: 1000,
        compressImageMaxWidth: 1000,
      }).then(async image => {
        setIsImagePickerVisible(false); // Close modal after successful selection
        setSelectedImage(image);
        setProfileImageUri(image.path);

        // Prepare form data for image upload
        let imageData: any = {
          uri: image.path,
          type: image.mime,
          name: getImageNameFromUri(image.path),
        };
        setImageFormData(imageData);

        // Automatically upload image and call editProfileAction
        await handleImageUploadAndProfileUpdate(imageData);
        console.log('Gallery image selected:', imageData);
      }).catch(error => {
        setIsImagePickerVisible(false); // Close modal even if error occurs
        console.log('Gallery error:', error);

        // Don't show alert if user just cancelled
        if (error.code === 'E_PICKER_CANCELLED' || error.code === 'picker_canceled') {
          console.log('User cancelled gallery selection');
          return;
        }

        // Provide user-friendly error messages
        if (error.code === 'E_NO_LIBRARY_PERMISSION' || error.code === 'permission') {
          Alert.alert('Permission Denied', 'Storage permission was denied. Please enable it in settings.');
        } else {
          Alert.alert('Error', 'Failed to open photo library. Please try again.');
        }
      });
    } catch (error) {
      console.error('Error in handleGalleryPress:', error);
      setIsImagePickerVisible(false);
      Alert.alert('Error', 'Something went wrong while opening the photo library.');
    }
  };

  // Profile Image Component
  const ProfileImageSection = () => {
    return (
      <View style={ProfileScreenStyles.profileImageSection}>
        <View style={ProfileScreenStyles.profileImageContainer}>
          <View style={ProfileScreenStyles.profileImageWrapper}>
            {profileImageUri ? (
              <Image
                source={{ uri: profileImageUri }}
                style={ProfileScreenStyles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={IMAGES.PROFILE}
                style={ProfileScreenStyles.profileImageDefault}
                resizeMode="cover"
              />
            )}
          </View>
          <TouchableOpacity
            style={ProfileScreenStyles.cameraButton}
            onPress={() => setIsImagePickerVisible(true)}
            activeOpacity={0.7}
          >
            <Image
              source={IMAGES.CAMERA}
              style={ProfileScreenStyles.cameraIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Handle Submit Function - Profile Details
  const handleSubmit = async () => {
    if (isSubmitting || editProfileLoading) return;

    // Validate required fields using helper function
    const requiredFields = {
      firstName: personalDetails.firstName,
      lastName: personalDetails.lastName,
      phone: personalDetails.phone,
      email: personalDetails.email
    };

    const validation = validateRequiredFields(requiredFields, ['firstName', 'lastName', 'phone', 'email']);

    if (!validation.isValid) {
      Alert.alert('Validation Error', validation.errors.join('\n'));
      return;
    }

    // Additional phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(personalDetails.phone.trim())) {
      Alert.alert('Validation Error', 'Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      // If user has selected an image, upload it first
      let profileImageFileName = '';
      if (selectedImage && imageFormData) {
        console.log('Uploading image first...');
        const uploadFormData = new FormData();
        uploadFormData.append('upload_file', imageFormData);
        uploadFormData.append('root', 'users');
        uploadFormData.append('type', 'profile');

        console.log('imageFormData', imageFormData);

        const imageUploadResponse = await imageUploadApi(uploadFormData);
        console.log('imageUploadResponse', imageUploadResponse);

        if (imageUploadResponse.status === 200) {
          console.log(
            'Image upload successful:',
            imageUploadResponse?.data?.result?.fileName,
          );
          profileImageFileName = imageUploadResponse?.data?.result?.fileName;
        } else {
          console.log('Image upload failed');
          Alert.alert('Error', 'Failed to upload image. Please try again.');
          return;
        }
      }

      // Prepare profile data for API call
      const profileData = {
        firstName: personalDetails.firstName.trim(),
        lastName: personalDetails.lastName.trim(),
        email: personalDetails.email.trim(),
        profileImage: profileImageFileName || undefined,
        gender: personalDetails.gender,
        nationality: personalDetails.nationality.trim(),
        bloodGroup: personalDetails.bloodGroup,
        dob: personalDetails.dob,
      };

      // Get user ID from userData
      const userId = userData?._id;

      // Call the edit profile API with original user data for comparison
      const editProfileResponse = await dispatch(editProfileAction(userId, profileData, userData));

      console.log('Edit profile response:', editProfileResponse);

      if (editProfileResponse.status === 200) {
        // Show success message
        Alert.alert(
          'Success!',
          'Profile has been updated successfully. Your data has been updated.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form or navigate back
                props.navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }

    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Personal Details Component
  const PersonalDetails = () => (
    <View style={ProfileScreenStyles.personalDetailsContainer}>
      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField placeholder='First Name*' value={personalDetails.firstName} onChangeText={(text) => handleChange('firstName', text)} />
      </View>
      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField placeholder='Last Name*' value={personalDetails.lastName} onChangeText={(text) => handleChange('lastName', text)} />
      </View>
      <View style={ProfileScreenStyles.inputWrapper} pointerEvents='none'>
        <TextInputField placeholder='Phone Number*' value={personalDetails.phone} onChangeText={(text) => handleChange('phone', text)} />
      </View>
      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField placeholder='Email*' value={personalDetails.email} onChangeText={(text) => handleChange('email', text)} keyboardType="email-address" autoCapitalize="none" />
      </View>
      {/* gender */}
      <View style={ProfileScreenStyles.inputWrapper}>
        <Text style={ProfileScreenStyles.genderLabel}>Gender</Text>
        <View style={ProfileScreenStyles.genderOptionsContainer}>
          <TouchableOpacity
            style={ProfileScreenStyles.genderOption}
            onPress={() => handleChange('gender', 'Male')}
            activeOpacity={0.7}
          >
            <View>
              <View style={ProfileScreenStyles.radioButton}>
                {personalDetails.gender === 'Male' && (
                  <View style={ProfileScreenStyles.radioButtonSelected} />
                )}
              </View>
            </View>
            <Text style={ProfileScreenStyles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ProfileScreenStyles.genderOptionFemale}
            onPress={() => handleChange('gender', 'Female')}
            activeOpacity={0.7}
          >
            <View>
              <View style={ProfileScreenStyles.radioButton}>
                {personalDetails.gender === 'Female' && (
                  <View style={ProfileScreenStyles.radioButtonSelected} />
                )}
              </View>
            </View>
            <Text style={ProfileScreenStyles.genderText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* dob */}
      <View style={ProfileScreenStyles.dobContainer}>
        <TouchableOpacity style={ProfileScreenStyles.dobButton} activeOpacity={0.8} onPress={() => setOpenPicker(true)}>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={ProfileScreenStyles.dobText}>{reflectedDate || 'Date of Birth'}</Text>
          </View>
          <View>
            <Image source={IMAGES.CALENDAR} style={ProfileScreenStyles.calendarIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={ProfileScreenStyles.nationalityContainer}>
        <TouchableOpacity
          style={ProfileScreenStyles.nationalityButton}
          onPress={() => setOpenCountryPicker(true)}
          activeOpacity={0.7}
        >
          <Text style={[
            ProfileScreenStyles.nationalityText,
            personalDetails.nationality ? ProfileScreenStyles.nationalityTextSelected : ProfileScreenStyles.nationalityTextPlaceholder
          ]}>
            {personalDetails.nationality || 'Nationality'}
          </Text>
          <Text style={ProfileScreenStyles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
      </View>
      <View style={ProfileScreenStyles.inputWrapper}>
        <Dropdowns
          data={BLOOD_GROUPS}
          value={personalDetails.bloodGroup}
          placeholder="Blood Group"
          onChange={(value: string) => handleChange('bloodGroup', value)}
        />
      </View>
      <TouchableOpacity
        style={[ProfileScreenStyles.submitButton, (isSubmitting || editProfileLoading) && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={isSubmitting || editProfileLoading}
      >
        <Text style={ProfileScreenStyles.submitButtonText}>
          {(isSubmitting || editProfileLoading) ? 'Updating...' : 'Update Profile'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={ProfileScreenStyles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-35}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container style={ProfileScreenStyles.mainContainer}>
          <HeaderComponent Title='Personal Details' onPress={() => props.navigation.goBack()} />
          <ScrollView
            style={ProfileScreenStyles.container}
            nestedScrollEnabled={true}
          >
            {/* Profile Image Section */}
            {ProfileImageSection()}

            {/* Personal Details Section */}
            <View style={ProfileScreenStyles.personalDetailsSection}>
              {PersonalDetails()}
            </View>
          </ScrollView>

          {/* Image Picker Modal */}
          <ImagePickerModal
            isVisible={isImagePickerVisible}
            onClose={() => setIsImagePickerVisible(false)}
            onCameraPress={handleCameraPress}
            onGalleryPress={handleGalleryPress}
            title="Select Profile Photo"
          />

          {/* Country Picker Modal */}
          <CountryPicker
            onBackdropPress={() => setOpenCountryPicker(false)}
            onRequestClose={() => setOpenCountryPicker(false)}
            style={{
              modal: ProfileScreenStyles.countryPickerModal,
              countryName:{
                color:"#000000"
              },
              dialCode:{
                  color:"#000000"
              }
            }}
            show={opencountryPicker}
            lang="en"
            pickerButtonOnPress={(item) => {
              handleChange("nationality", item?.name?.en);
              setOpenCountryPicker(false);
            }}
          />

          {/* Calendar Modal */}
          <CalendarPicker
            visible={openPicker}
            onClose={() => setOpenPicker(false)}
            onSelect={date => {
              const formattedDate = formatDateToDisplay(date);
              setReflectedDate(formattedDate);
              setPersonalDetails(prevState => ({
                ...prevState,
                dob: date // Store in yyyy-mm-dd format for server
              }));
              setOpenPicker(false);
            }}
            initialDate={formatDateToServer(reflectedDate)}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PersonalDetailsScreen;
