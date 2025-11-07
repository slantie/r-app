import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { InputFieldStyles } from './styles';
import { COLORS } from '../../constants';

interface InputFieldProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const InputField = ({
  placeholder,
  value,
  onChangeText,
  error,
  ...rest
}: InputFieldProps) => {
  return (
    <View style={InputFieldStyles.container}>
      <TextInput
        placeholderTextColor={COLORS.GREY_TEXT}
        cursorColor={COLORS.BLACK}
        placeholder={placeholder}
        style={[InputFieldStyles.input, error && InputFieldStyles.inputError]}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {error && <Text style={InputFieldStyles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;
