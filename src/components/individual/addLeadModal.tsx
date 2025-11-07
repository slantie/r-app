import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AddLeadModalStyles } from './styles';
import Modal from 'react-native-modal';
import { COLORS, IMAGES } from '../../constants';

interface AddLeadModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLandPress?: () => void;
  onProjectPress?: () => void;
  onAttendancePress?: () => void;
  onCpPress?: () => void;
  onFundPress?: () => void;
  showFundOption?: boolean;
  showLandOption?: boolean;
  showCpOption?: boolean;
}

const AddLeadModal = ({
  isVisible,
  onClose,
  onLandPress,
  onProjectPress,
  onAttendancePress,
  onCpPress,
  onFundPress,
  showFundOption = true,
  showLandOption = true,
  showCpOption = true

}: AddLeadModalProps) => {

  const handleLandPress = () => {
    onClose();
    onLandPress?.();
  };

  const handleProjectPress = () => {
    onClose();
    onProjectPress?.();
  };

  const handleAttendancePress = () => {
    onClose();
    onAttendancePress?.();
  };

  const handleCpPress = () => {
    onClose();
    onCpPress?.();
  };

  const handleFundPress = () => {
    onClose();
    onFundPress?.();
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={COLORS.BLACK}
      style={AddLeadModalStyles.modal}
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
    >
      <View style={AddLeadModalStyles.container}>
        <View style={AddLeadModalStyles.handle} />
        <View style={AddLeadModalStyles.content}>
          <Text style={AddLeadModalStyles.title}>Add</Text>
          <View style={AddLeadModalStyles.optionContainer}>

          {showLandOption && (
            <>
              <TouchableOpacity
                style={AddLeadModalStyles.optionRow}
                onPress={handleLandPress}
              >
                <Image source={IMAGES.LANDS} style={AddLeadModalStyles.optionIcon} />
                <Text style={AddLeadModalStyles.optionText}>Land</Text>
              </TouchableOpacity>
              <View style={AddLeadModalStyles.divider} />
            </>
          )}
          <TouchableOpacity
            style={AddLeadModalStyles.optionRow}
            onPress={handleProjectPress}
          >
            <Image source={IMAGES.PROJECTS} style={AddLeadModalStyles.optionIcon} />
            <Text style={AddLeadModalStyles.optionText}>Project</Text>
          </TouchableOpacity>
          {showFundOption && (
            <>
              <View style={AddLeadModalStyles.divider} />
              <TouchableOpacity
                style={AddLeadModalStyles.optionRow}
                onPress={handleFundPress}
              >
                <Image source={IMAGES.FACE_VERIFY} style={AddLeadModalStyles.optionIcon} />
                <Text style={AddLeadModalStyles.optionText}>Fund</Text>
              </TouchableOpacity>
            </>
          )}
          {/* <TouchableOpacity
            style={AddLeadModalStyles.optionRow}
            onPress={handleAttendancePress}
          >
            <Image source={IMAGES.ATTENDANCE} style={AddLeadModalStyles.optionIcon} />
            <Text style={AddLeadModalStyles.optionText}>Attendance</Text>
          </TouchableOpacity> */}
          {/* <View style={AddLeadModalStyles.divider} /> */}
          {showCpOption && (
            <>
              <View style={AddLeadModalStyles.divider} />
              <TouchableOpacity
                style={AddLeadModalStyles.optionRow}
                onPress={handleCpPress}
              >
                <Image source={IMAGES.CP} style={AddLeadModalStyles.optionIcon} />
                <Text style={AddLeadModalStyles.optionText}>CP</Text>
              </TouchableOpacity>
            </>
          )}

          </View>


        </View>
      </View>
    </Modal>
  );
};

export default AddLeadModal;
