import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';

import { COLORS } from '../../constants';
import { CountryInputStyles } from './styles';

interface CountryInputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onCountryCodeChange?: (countryCode: string) => void;
  maxLength?: number;
}

interface CountryData {
  dial_code: string;
  name: { [key: string]: string };
  code: string;
}

const CountryInputField = ({
  placeholder,
  value,
  onChangeText,
  onCountryCodeChange,
  maxLength,
}: CountryInputFieldProps) => {
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

  const handleCountrySelect = (country: CountryData) => {
    setSelectedCountryCode(country.dial_code);
    setShowCountryPicker(false);
    if (onCountryCodeChange) {
      onCountryCodeChange(country.dial_code);
    }
  };

  const handleTextChange = (text: string) => {
    // Only allow numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    onChangeText(numericText);

    // Dismiss keyboard when maxLength is reached
    if (maxLength && numericText.length >= maxLength) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={CountryInputStyles.container}>
      <TouchableOpacity
        style={CountryInputStyles.countryCodeButton}
        onPress={() => setShowCountryPicker(true)}
      >
        <Text style={CountryInputStyles.countryCodeText}>
          {selectedCountryCode}
        </Text>
        <Text style={CountryInputStyles.arrowText}>▼</Text>
      </TouchableOpacity>

      <TextInput
        placeholder={placeholder}
        style={CountryInputStyles.input}
        value={value}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        placeholderTextColor={COLORS.GREY_TEXT}
        maxLength={maxLength}
      />

      <CountryPicker
        show={showCountryPicker}
        pickerButtonOnPress={item => handleCountrySelect(item)}
        onBackdropPress={() => setShowCountryPicker(false)}
        searchMessage="Search country..."
        lang="en"
        style={{
          modal: {
            height: 500,
          },
          textInput: {
            height: 50,
            borderWidth: 1,
            borderColor: COLORS.BORDER_GREY,
            borderRadius: 8,
            paddingHorizontal: 15,
            fontSize: 16,
            color:COLORS.BLACK
          },
          line: {
            height: 1,
            backgroundColor: COLORS.BORDER_GREY,
          },
          itemsList: {
            backgroundColor: COLORS.WHITE,
          },
          countryName:{
            color:"#000000"
          },
          dialCode:{
              color:"#000000"
          }
        }}
      />
    </View>
  );
};

export default CountryInputField;
