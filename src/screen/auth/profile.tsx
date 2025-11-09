import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ProfileStyles } from './styles';
import {
  Container,
  CustomButton,
  InputField,
  ImagePickerModal,
  FullScreenImageModal,
} from '../../components/common';
import { IMAGES } from '../../constants';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { profileAction } from '../../store/actions/auth/profileAction';
import { commonImageAction } from '../../store/actions/commonImage/imageAction';
import {
  getImageNameFromUri,
} from '../../utils/helper';
import PrefManager from '../../utils/prefManager';
import { STRING } from '../../constants';

const Profile = ({ route, navigation }: any) => {
  const dispatch = useDispatch() as any;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isImagePickerModalVisible, setIsImagePickerModalVisible] =
    useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);

  // Error states for each field (validation errors only)
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // API functions
  const profileApiCall = (req: any) => dispatch(profileAction(req));
  const imageUploadApi = (req: any) => dispatch(commonImageAction(req));

  // Function to clear all validation errors
  const clearAllErrors = () => {
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
  };

  // Function to validate individual fields
  const validateField = (fieldName: string, value: string) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    if (fieldName === 'Email' && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  };

  // Functions to handle field changes and clear errors
  const handleFirstNameChange = (text: string) => {
    setFirstName(text);
    if (firstNameError) setFirstNameError('');
  };

  const handleLastNameChange = (text: string) => {
    setLastName(text);
    if (lastNameError) setLastNameError('');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handleImagePicker = () => {
    setIsImagePickerModalVisible(true);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
      compressImageMaxHeight: 1000,
      compressImageMaxWidth: 1000,
    })
      .then(image => {
        setSelectedImage(image);
        setIsImagePickerModalVisible(false);

        // Prepare form data for image upload
        let imageData: any = {
          uri: image.path,
          type: image.mime,
          name: getImageNameFromUri(image.path),
        };
        setFormData(imageData);
        console.log('Camera image selected:', imageData);
      })
      .catch(error => {
        console.log('Camera error:', error);
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
      compressImageMaxHeight: 1000,
      compressImageMaxWidth: 1000,
    })
      .then(image => {
        setSelectedImage(image);
        setIsImagePickerModalVisible(false);

        // Prepare form data for image upload
        let imageData: any = {
          uri: image.path,
          type: image.mime,
          name: getImageNameFromUri(image.path),
        };
        setFormData(imageData);
        console.log('Gallery image selected:', imageData);
      })
      .catch(error => {
        console.log('Gallery error:', error);
      });
  };

  const handleProfile = async () => {
    console.log('Profile submission started');

    // Clear all previous errors
    clearAllErrors();

    // Validate individual fields
    const firstNameValidation = validateField('First Name', firstName);
    const lastNameValidation = validateField('Last Name', lastName);
    const emailValidation = validateField('Email', email);

    // Set field-specific errors
    setFirstNameError(firstNameValidation);
    setLastNameError(lastNameValidation);
    setEmailError(emailValidation);

    // Check if there are any validation errors
    if (firstNameValidation || lastNameValidation || emailValidation) {
      return;
    }

    setIsProfileSubmitting(true);

    try {
      // If user has selected an image, upload it first
      if (selectedImage && formData) {
        console.log('Uploading image first...');
        const imageFormData = new FormData();
        imageFormData.append('upload_file', formData);
        imageFormData.append('root', 'users');
        imageFormData.append('type', 'profile');

        console.log('formData', formData);

        const imageUploadResponse = await imageUploadApi(imageFormData);
        console.log('imageUploadResponse', imageUploadResponse);

        if (imageUploadResponse.status === 200) {
          console.log(
            'Image upload successful:',
            imageUploadResponse?.data?.result?.fileName,
          );
          await submitProfileWithImage(
            imageUploadResponse?.data?.result?.fileName,
          );
        } else {
          console.log('Image upload failed');
          Alert.alert('Error', 'Failed to upload image. Please try again.');
        }
      } else {
        // No image selected, submit profile without image
        console.log('No image selected, submitting profile without image');
        await submitProfileWithImage('');
      }
    } catch (error: any) {
      console.log('Profile submission error:', error.response);
      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Failed to submit profile. Please try again.',
      );
    } finally {
      setIsProfileSubmitting(false);
    }
  };

  const submitProfileWithImage = async (imageFileName: string) => {
    try {
      // Get userData from storage to get userId
      const userDataStr = await PrefManager.getValue('userData');
      const userData = userDataStr ? JSON.parse(userDataStr) : route.params?.userData;
      
      if (!userData || !userData._id) {
        Alert.alert('Error', 'User data not found. Please login again.');
        return;
      }

      const profilePayload = {
        userId: userData._id,  // Required by new API
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        gender: 'Male', // TODO: Add gender selection in UI
        // profileImage: imageFileName || undefined,  // TODO: Re-enable after testing
      };

      console.log('Submitting profile with payload:', profilePayload);

      const profileResponse = await profileApiCall(profilePayload);
      console.log('profileResponse', profileResponse);

      if (profileResponse.status === 200) {
        console.log('Profile submission successful');
        // New API structure: response.data = { success, message, data: {...} }
        const apiData = profileResponse.data?.data || profileResponse.data?.result;

        // Update stored token and userData
        await PrefManager.setValue(STRING.TOKEN, apiData.accessToken);
        await PrefManager.setValue('userData', JSON.stringify({
          ...apiData.user,
          accessToken: apiData.accessToken,
          isProfileComplete: apiData.isProfileComplete,
          isMemberRegistered: apiData.isMemberRegistered,
          memberStatus: apiData.memberStatus,
        }));

        console.log('✅ Profile updated successfully');
        console.log('  - Profile Complete:', apiData.isProfileComplete);
        console.log('  - Member Registered:', apiData.isMemberRegistered);

        // Navigate to building selection (WhoAmI screen)
        Alert.alert('Success', 'Profile updated successfully!', [
          {
            text: 'Next',
            onPress: () => navigation.navigate('WhoAmI', {
              userData: {
                ...apiData.user,
                accessToken: apiData.accessToken,
                isProfileComplete: apiData.isProfileComplete,
                isMemberRegistered: apiData.isMemberRegistered,
              }
            })
          },
        ]);
      } else {
        console.log('Profile submission failed');
        Alert.alert('Error', 'Failed to submit profile. Please try again.');
      }
    } catch (error: any) {
      console.log('Profile update error:', error.response?.data);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to update profile. Please try again.'
      );
    }
  };

  return (
    <Container>
      <View style={ProfileStyles.container}>
        <View style={{ alignSelf: 'center' }}>
          {!selectedImage ? (
            <TouchableOpacity
              style={ProfileStyles.profileContainer}
              activeOpacity={0.8}
              onPress={handleImagePicker}
            >
              <Image
                source={IMAGES.PROFILE}
                style={ProfileStyles.profileImage}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: -10,
                  right: -10,
                  borderRadius: 50,
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              >
                <Image source={IMAGES.CAMERA} style={ProfileStyles.cemera} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                padding: 16,
                borderRadius: 100,
                alignSelf: 'center',
                marginTop: '10%',
              }}
              activeOpacity={0.8}
              onPress={() => setIsImageModalVisible(true)}
            >
              <Image
                source={{ uri: selectedImage.path }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                }}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  borderRadius: 30,
                  padding: 5,
                }}
                activeOpacity={0.8}
                onPress={handleImagePicker}
              >
                <Image
                  source={IMAGES.CAMERA}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ alignSelf: 'center', marginTop: '10%' }}>
          <Text style={ProfileStyles.setupProfile}>Setup Profile</Text>
        </View>

        <View style={{ marginTop: '10%' }}>
          <View style={{ marginTop: 16 }}>
            <InputField
              placeholder="First Name*"
              value={firstName}
              onChangeText={handleFirstNameChange}
              error={firstNameError}
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <InputField
              placeholder="Last Name*"
              value={lastName}
              onChangeText={handleLastNameChange}
              error={lastNameError}
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <InputField
              placeholder="Email*"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
            />
          </View>
        </View>

        <View style={{ marginTop: '20%', alignSelf: 'center' }}>
          <CustomButton
            title={isProfileSubmitting ? 'Submitting...' : 'Continue'}
            onPress={handleProfile}
            // disabled={isProfileSubmitting || !firstName.trim() || !lastName.trim() || !email.trim()}
            loading={isProfileSubmitting}
          />
        </View>

        {/* Image Picker Modal */}
        <ImagePickerModal
          isVisible={isImagePickerModalVisible}
          onClose={() => setIsImagePickerModalVisible(false)}
          onCameraPress={openCamera}
          onGalleryPress={openGallery}
          title="Choose Profile Photo"
        />

        <FullScreenImageModal
          visible={isImageModalVisible}
          imageUri={selectedImage?.path}
          onClose={() => setIsImageModalVisible(false)}
        />
      </View>
    </Container>
  );
};

export default Profile;
