import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { timePickerModalStyles } from './styles';
import CustomSwitch from './switch';
import WheelyTimePicker from './WheelyTimePicker';


type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (time: Date) => void;
  selectedTime: Date;
  onTimeChange: (time: Date) => void;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  switchLabel?: string;
};

const TimePickerModal = ({
  visible,
  onClose,
  onConfirm,
  selectedTime,
  onTimeChange,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  switchLabel = 'Enable',
}: Props) => {
  const [tempTime, setTempTime] = useState(selectedTime);
  const [tempSwitchValue, setTempSwitchValue] = useState(switchValue);

  // Update tempTime when selectedTime prop changes
  useEffect(() => {
    setTempTime(selectedTime);
  }, [selectedTime]);

  // Update tempSwitchValue when switchValue prop changes
  useEffect(() => {
    setTempSwitchValue(switchValue);
  }, [switchValue]);

  const handleConfirm = () => {
    onTimeChange(tempTime);
    onConfirm(tempTime);
    if (showSwitch && onSwitchChange) {
      onSwitchChange(tempSwitchValue);
    }
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={timePickerModalStyles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
    >
      {/* Bottom Sheet */}
      <View style={timePickerModalStyles.bottomSheet}>
        {/* Handle Bar */}
        <View style={timePickerModalStyles.handleBar} />

        {/* Header */}
        <View style={timePickerModalStyles.header}>
          <TouchableOpacity
            onPress={onClose}
            style={timePickerModalStyles.headerButton}
          >
            <Text style={timePickerModalStyles.cancelText}>
              Cancel
            </Text>
          </TouchableOpacity>

          <Text style={timePickerModalStyles.titleText}>
            Select Time
          </Text>

          <TouchableOpacity
            onPress={handleConfirm}
            style={timePickerModalStyles.headerButton}
          >
            <Text style={timePickerModalStyles.doneText}>
              Done
            </Text>
          </TouchableOpacity>
        </View>

        {/* Time Picker */}
        <View style={timePickerModalStyles.timePickerContainer}>
          {Platform.OS === 'ios' ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={tempTime}
              mode="time"
              display="spinner"
              onChange={(event, time) => {
                if (time) {
                  setTempTime(time);
                }
              }}
              is24Hour={false}
              style={timePickerModalStyles.timePicker}
            />
          ) : (
            <WheelyTimePicker
              value={tempTime}
              onChange={(newTime) => {
                setTempTime(newTime);
              }}
            />
          )}
        </View>

        {/* Switch Section */}
        {showSwitch && (
          <View style={timePickerModalStyles.switchContainer}>
            <Text style={timePickerModalStyles.switchLabel}>{switchLabel}</Text>
            <CustomSwitch
              value={tempSwitchValue}
              onValueChange={setTempSwitchValue}
            />
          </View>
        )}

      </View>
    </Modal>
  );
};

export default TimePickerModal;
