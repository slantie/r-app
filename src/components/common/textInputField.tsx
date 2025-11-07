import React from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, Image } from 'react-native';
import { InputFieldStyles } from './styles';
import { COLORS, IMAGES } from '../../constants';

interface InputFieldProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
}

const TextInputField = ({
  placeholder,
  value,
  onChangeText,
  onPress,
  ...rest
}: InputFieldProps) => {
  return (
    <View style={InputFieldStyles.container}>
      <TextInput
        placeholderTextColor={COLORS.GREY_TEXT}
        cursorColor={COLORS.BLACK}
        placeholder={placeholder}
        style={InputFieldStyles.input}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {onPress ? <TouchableOpacity style={InputFieldStyles.scanButton} onPress={onPress}>
          {/* <Image source={IMAGES.SCANNER} style={InputFieldStyles.scanButtonIcon} resizeMode='contain' /> */}
        <Text style={InputFieldStyles.scanButtonText}>Verify</Text>
      </TouchableOpacity> : null}
    </View>
  );
};

export default TextInputField;
