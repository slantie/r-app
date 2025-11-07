import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS, FF, FS } from '../../constants';
import { ImagePickerModalStyles } from './styles';

interface ImagePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCameraPress: () => void;
  onGalleryPress: () => void;
  title?: string;
}

const ImagePickerModal = ({
  isVisible,
  onClose,
  onCameraPress,
  onGalleryPress,
  title = 'Choose Photo',
}: ImagePickerModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropColor={COLORS.BLACK}
      style={ImagePickerModalStyles.modal}
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
    >
      <View style={ImagePickerModalStyles.container}>
        <View style={ImagePickerModalStyles.handle} />

        <View style={ImagePickerModalStyles.content}>
          <Text style={ImagePickerModalStyles.title}>{title}</Text>

          <TouchableOpacity
            style={ImagePickerModalStyles.option}
            onPress={onCameraPress}
            activeOpacity={0.7}
          >
            <Text style={ImagePickerModalStyles.optionText}>📷 Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ImagePickerModalStyles.option}
            onPress={onGalleryPress}
            activeOpacity={0.7}
          >
            <Text style={ImagePickerModalStyles.optionText}>
              🖼️ Choose from Gallery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ImagePickerModalStyles.cancelButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={ImagePickerModalStyles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;
