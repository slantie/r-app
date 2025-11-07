import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { SearchInputStyles } from './styles';
import { COLORS, IMAGES } from '../../constants';

const SearchInput = ({
  value,
  onChangeText,
  placeholder
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) => {
  return (
    <View style={SearchInputStyles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={SearchInputStyles.searchInput}
        placeholderTextColor={COLORS.GREY_TEXT}
      />
      <Image source={IMAGES.SEARCH} style={SearchInputStyles.searchIcon} />
      {/* <Text>SearchInput</Text> */}
    </View>
  );
};

export default SearchInput;
