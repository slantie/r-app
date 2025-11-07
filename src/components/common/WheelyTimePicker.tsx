import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import WheelPicker from 'react-native-wheely';
import { timePickerModalStyles } from './styles';

type WheelyTimePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

const WheelyTimePicker: React.FC<WheelyTimePickerProps> = ({ value, onChange }) => {
  const hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const periods = ['AM', 'PM'];

  const [selectedHourIndex, setSelectedHourIndex] = useState(() => {
    const hour = value.getHours() % 12;
    return hour === 0 ? 11 : hour - 1;
  });

  const [selectedMinuteIndex, setSelectedMinuteIndex] = useState(value.getMinutes());
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(value.getHours() >= 12 ? 1 : 0);

  useEffect(() => {
    const selectedHour = selectedHourIndex + 1;
    const selectedMinute = selectedMinuteIndex;
    const selectedPeriod = periods[selectedPeriodIndex];

    let hour24 = selectedHour;
    if (selectedPeriod === 'PM' && selectedHour !== 12) {
      hour24 = selectedHour + 12;
    } else if (selectedPeriod === 'AM' && selectedHour === 12) {
      hour24 = 0;
    }

    const newDate = new Date(value);
    newDate.setHours(hour24, selectedMinute, 0, 0);
    onChange(newDate);
  }, [selectedHourIndex, selectedMinuteIndex, selectedPeriodIndex]);

  return (
    <View style={timePickerModalStyles.wheelPickerContainer}>
      {/* Hour Picker */}
      <View style={timePickerModalStyles.wheelColumn}>
        <WheelPicker
          selectedIndex={selectedHourIndex}
          options={hours}
          onChange={setSelectedHourIndex}
          itemTextStyle={timePickerModalStyles.wheelItemText}
          selectedIndicatorStyle={timePickerModalStyles.wheelSelectedIndicator}
          itemHeight={44}
        />
      </View>

      {/* Separator */}
      <View style={timePickerModalStyles.wheelSeparator}>
        <Text style={timePickerModalStyles.wheelSeparatorText}>:</Text>
      </View>

      {/* Minute Picker */}
      <View style={timePickerModalStyles.wheelColumn}>
        <WheelPicker
          selectedIndex={selectedMinuteIndex}
          options={minutes}
          onChange={setSelectedMinuteIndex}
          itemTextStyle={timePickerModalStyles.wheelItemText}
          selectedIndicatorStyle={timePickerModalStyles.wheelSelectedIndicator}
          itemHeight={44}
        />
      </View>

      {/* Period Picker (AM/PM) */}
      <View style={timePickerModalStyles.wheelColumn}>
        <WheelPicker
          selectedIndex={selectedPeriodIndex}
          options={periods}
          onChange={setSelectedPeriodIndex}
          itemTextStyle={timePickerModalStyles.wheelItemText}
          selectedIndicatorStyle={timePickerModalStyles.wheelSelectedIndicator}
          itemHeight={44}
        />
      </View>
    </View>
  );
};

export default WheelyTimePicker;

