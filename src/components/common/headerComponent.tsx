import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { IMAGES } from '../../constants';
import { HeaderComponentProps } from '../../types/component';
import { HeaderComponentStyles } from './styles';

const HeaderComponent = ({ Title, onPress }: HeaderComponentProps) => {
  return (
    <View style={[HeaderComponentStyles.container, {}]}>
      <View style={{}}>
        <TouchableOpacity
          style={HeaderComponentStyles.backBtn}
          onPress={onPress}
        >
          <Image source={IMAGES.BACK} style={HeaderComponentStyles.backImg} />
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <Text style={HeaderComponentStyles.title}>{Title}</Text>
      </View>
    </View>
  );
};

export default HeaderComponent;
