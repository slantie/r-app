import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import { ImagePickerBottomSheetStyles } from "./styles";
import { COLORS, IMAGES } from "../../constants";
// import { ImagePickerBottomSheetStyles } from "./Styles";
// import { COLORS, IMAGES } from "../constants";

type ImagePickerBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChoosePhoto: () => void;
};

const ImagePickerBottomSheet: React.FC<ImagePickerBottomSheetProps> = ({
  isVisible,
  onClose,
  onTakePhoto,
  onChoosePhoto,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      useNativeDriver={false}
      useNativeDriverForBackdrop={false}
      hideModalContentWhileAnimating={false}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={200}
      backdropTransitionOutTiming={0}
      style={ImagePickerBottomSheetStyles.modal}
    >
      <View style={ImagePickerBottomSheetStyles.container}>
        {/* Header */}
        <View style={ImagePickerBottomSheetStyles.header}>
          <Text style={ImagePickerBottomSheetStyles.headerText}>
            Select Document
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={ImagePickerBottomSheetStyles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
<View style={ImagePickerBottomSheetStyles.subContainer}>

        <TouchableOpacity
          style={ImagePickerBottomSheetStyles.option}
          onPress={onTakePhoto}
        >
          <Text style={ImagePickerBottomSheetStyles.optionText}>
            Take photo
          </Text>
          <Image
            source={IMAGES.CAMERAS}
            style={ImagePickerBottomSheetStyles.optionIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[ImagePickerBottomSheetStyles.option,{borderBottomWidth:0}]}
          onPress={onChoosePhoto}
        >
          <Text style={ImagePickerBottomSheetStyles.optionText}>
            Choose photo
          </Text>
          <Image
            source={IMAGES.GALLARY}
            style={ImagePickerBottomSheetStyles.optionIcon}
            tintColor={COLORS.BORDER_GREY}
          />
        </TouchableOpacity>
</View>
        {/* Options */}
      </View>
    </Modal>
  );
};

export default ImagePickerBottomSheet;
