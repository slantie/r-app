import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CustomButtonStyles } from './styles';
import { COLORS, FF, FS } from '../../constants';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  showError?: boolean;
  errorMessage?: string;
  validationErrors?: string[];
}

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  showError = false,
  errorMessage = '',
  validationErrors = [],
}: CustomButtonProps) => {
  const isDisabled = disabled || loading;
  const hasErrors = showError && (errorMessage || validationErrors.length > 0);

  const handlePress = () => {
    if (isDisabled) return;

    // If there are validation errors, show them
    if (hasErrors) {
      const errorsToShow = errorMessage || validationErrors.join('\n');
      // You can replace this with a custom alert component if needed
      console.warn('Validation Errors:', errorsToShow);
      return;
    }

    onPress();
  };

  return (
    <View style={CustomButtonStyles.wrapper}>
      <TouchableOpacity
        style={[
          CustomButtonStyles.container,
          isDisabled && CustomButtonStyles.disabled,
          hasErrors && CustomButtonStyles.errorState,
        ]}
        onPress={handlePress}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator size="small" color={isDisabled ? COLORS.BLACK : COLORS.WHITE} />
        ) : (
          <Text
            style={[
              CustomButtonStyles.title,
              isDisabled && CustomButtonStyles.disabledText,
              hasErrors && CustomButtonStyles.errorText,
            ]}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>

      {/* Error message display */}
      {hasErrors && (
        <View style={CustomButtonStyles.errorContainer}>
          {errorMessage ? (
            <Text style={CustomButtonStyles.errorText}>{errorMessage}</Text>
          ) : (
            validationErrors.map((error, index) => (
              <Text key={index} style={CustomButtonStyles.errorText}>
                {error}
              </Text>
            ))
          )}
        </View>
      )}
    </View>
  );
};

export default CustomButton;
