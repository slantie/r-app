import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, HeaderComponent, CustomButton } from '../../components/common';
import feedbackStyle from './styles/feedbackStyle';
import { feedbackAction, feedbackClear } from '../../store/actions/feedback/feedbackAction';
import { getFeedbackModuleListAction } from '../../store/actions/feedback/getFeedbackModuleAction';
import { commonImageAction } from '../../store/actions/commonImage/imageAction';
import Dropdowns from '../../components/common/dropDown';
import ImagePicker from 'react-native-image-crop-picker';
import { getImageNameFromUri } from '../../utils/helper';
import { height, width } from '../../utils/responsiveStyle';

const Feedback = (props: any) => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Feedback module lists state
  const [feedbackModuleList, setFeedbackModuleList] = useState<any[]>([]);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  // Image picker states
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const dispatch = useDispatch() as any;
  const { loading } = useSelector((state: any) => state.feedback);
  const lastLoadMoreTimeRef = useRef<number>(0);
  const isRequestingRef = useRef<boolean>(false);

  // API dispatch functions
  const getFeedbackModuleListAPI = (req: any) => dispatch(getFeedbackModuleListAction(req));

  // API call with pagination support
  const getFeedbackModuleListAPICall = useCallback((page: number = 1, isLoadMore: boolean = false) => {
    // Prevent multiple simultaneous requests
    if (isRequestingRef.current) {
      return;
    }

    if (!isLoadMore) {
      setIsInitialLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    isRequestingRef.current = true;

    getFeedbackModuleListAPI({ page }).then((res: any) => {
      console.log('getFeedbackModuleListAPICall res', res);
      const modules = res?.data?.result?.modules || [];
      const total = res?.data?.result?.total || 0;
      const pageSize = res?.data?.result?.pageSize || 10;

      // Transform data to match dropdown component format
      const transformedModules = modules.map((module: any) => ({
        label: module.title,
        value: module._id
      }));

      if (isLoadMore) {
        // Append new data when loading more and calculate hasMore using functional update
        setFeedbackModuleList(prev => {
          const updatedList = [...prev, ...transformedModules];
          // Check if there's more data to load
          const hasMoreData = updatedList.length < total || transformedModules.length === pageSize;
          setHasMore(hasMoreData);
          return updatedList;
        });
      } else {
        // Replace data when loading first page
        setFeedbackModuleList(transformedModules);
        // Check if there's more data to load
        const hasMoreData = transformedModules.length < total || transformedModules.length === pageSize;
        setHasMore(hasMoreData);
      }

      if (!isLoadMore) {
        setIsInitialLoading(false);
      } else {
        setIsLoadingMore(false);
      }
      isRequestingRef.current = false;
    }).catch((error: any) => {
      console.error('Error fetching feedback module list:', error);
      if (!isLoadMore) {
        setIsInitialLoading(false);
      } else {
        setIsLoadingMore(false);
      }
      isRequestingRef.current = false;
    });
  }, []);

  // Load more function for pagination
  const loadMoreModules = useCallback(() => {
    const now = Date.now();
    const timeSinceLastCall = now - lastLoadMoreTimeRef.current;

    // Throttle: prevent calls within 500ms of each other
    if (timeSinceLastCall < 500) {
      return;
    }

    // Prevent loading if already loading, no more data, or requesting
    if (isLoadingMore || !hasMore || isRequestingRef.current) {
      return;
    }

    lastLoadMoreTimeRef.current = now;
    const nextPage = currentPage + 1;
    console.log('Loading more feedback modules, page:', nextPage);
    setCurrentPage(nextPage);
    getFeedbackModuleListAPICall(nextPage, true);
  }, [currentPage, hasMore, isLoadingMore, getFeedbackModuleListAPICall]);


  // Load feedback module data when component mounts
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    setFeedbackModuleList([]);
    getFeedbackModuleListAPICall(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Image picker function - directly opens gallery
  const openGallery = () => {
    ImagePicker.openPicker({
      width:width,
      height: height,
      cropping: true,
      compressImageQuality: 0.7,
      compressImageMaxHeight: 1000,
      compressImageMaxWidth: 1000,
    })
      .then(image => {
        setSelectedImage(image);
        console.log('Gallery image selected:', image);
      })
      .catch(error => {
        console.log('Gallery error:', error);
      });
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    if (!title) {
      Alert.alert('Error', 'Please select a feedback title');
      return;
    }
    else if (!message.trim()) {
      Alert.alert('Error', 'Please fill in the feedback message');
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedFileName = null;

      // Upload image first if selected
      if (selectedImage) {
        console.log('Uploading image...');

        const imageData = {
          uri: selectedImage.path,
          type: selectedImage.mime || 'image/jpeg',
          name: getImageNameFromUri(selectedImage.path),
        };

        const imageFormData = new FormData();
        imageFormData.append('upload_file', imageData);
        imageFormData.append('root', 'feedback');
        imageFormData.append('type', 'documents');

        try {
          const imageUploadResponse = await dispatch(commonImageAction(imageFormData));
          console.log('Image upload response:', imageUploadResponse);

          if (imageUploadResponse?.status === 200) {
            uploadedFileName = imageUploadResponse?.data?.result?.fileName;
            console.log('Image upload successful:', uploadedFileName);
          } else {
            setIsSubmitting(false);
            Alert.alert('Error', 'Failed to upload image. Please try again.');
            return;
          }
        } catch (uploadError: any) {
          console.log('Image upload error:', uploadError);
          setIsSubmitting(false);
          Alert.alert('Error', 'Failed to upload image. Please try again.');
          return;
        }
      }

      // Find the selected module title for the payload
      const selectedModule = feedbackModuleList.find(module => module.value === title);
      const moduleTitle = selectedModule ? selectedModule.label : '';

      const payload: any = {
        title: moduleTitle,
        description: message.trim(),
        source:"App"
      };

      // Add image fileName to payload if uploaded
      if (uploadedFileName) {
        payload.fileNames = [uploadedFileName];
      }

      const res = await dispatch(feedbackAction(payload));
      console.log('Feedback API Response', res);
      setIsSubmitting(false);
      if (res.status === 200) {
        Alert.alert(
          'Success!',
          'Thank you for your feedback. We will get back to you soon.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form
                setTitle('');
                setMessage('');
                setSelectedImage(null);
                dispatch(feedbackClear());
                props.navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', (res as any).data?.message || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      console.log('Feedback API Error', err);
      setIsSubmitting(false);
      Alert.alert('Error', err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <Container>
      <HeaderComponent
        Title="Feedback"
        onPress={() => props.navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={feedbackStyle.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={feedbackStyle.scrollContent}
        >
          {/* Contact Form */}
          <View style={feedbackStyle.section}>
            <View style={feedbackStyle.inputContainer}>
              <Text style={feedbackStyle.inputLabel}>Add your Valuable Feedback </Text>
              {/* <TextInput
                style={[feedbackStyle.textInput ]}
                value={title}
                onChangeText={setTitle}
                placeholder="Title *"
                placeholderTextColor="#999"
                textAlignVertical="top"
              /> */}
              <View style={{marginTop:16}}>
                <Dropdowns
                  data={feedbackModuleList}
                  value={title}
                  placeholder="Title *"
                  onChange={(value: string) => setTitle(value)}
                  dropdownStyle={{borderWidth:1}}
                  flatListProps={{
                    onEndReached: loadMoreModules,
                    onEndReachedThreshold: 0.5,
                    ListFooterComponent: isLoadingMore ? (
                      <View style={{ padding: 10, alignItems: 'center' }}>
                        <ActivityIndicator size="small" color="#999" />
                      </View>
                    ) : null,
                  }}
                />
              </View>
              <TextInput
                style={[feedbackStyle.textInput, feedbackStyle.messageInput]}
                value={message}
                onChangeText={setMessage}
                placeholder="Description *"
                placeholderTextColor="#999"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />

              {/* Upload Image Section */}
              <View style={{ marginTop: 16 }}>
                <Text style={feedbackStyle.inputLabel}>Upload Image (Optional)</Text>

                {!selectedImage ? (
                  <TouchableOpacity
                    style={feedbackStyle.uploadButton}
                    onPress={openGallery}
                  >
                    <Text style={feedbackStyle.uploadButtonText}>+ Select Image</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={feedbackStyle.imageNameContainer}>
                    <Text style={feedbackStyle.imageName} numberOfLines={1}>
                      {getImageNameFromUri(selectedImage.path)}
                    </Text>
                    <TouchableOpacity
                      style={feedbackStyle.removeImageButton}
                      onPress={removeImage}
                    >
                      <Text style={feedbackStyle.removeImageText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <View style={feedbackStyle.submitSection}>
            <CustomButton
              title={loading || isSubmitting ? "Submitting..." : "Submit"}
              onPress={handleSubmit}
              disabled={loading || isSubmitting}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};



export default Feedback;