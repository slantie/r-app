import React, { JSX } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { COLORS } from '../../constants';
import { ContainerStyles } from './styles';

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export default function Container({
  style,
  children,
}: ContainerProps): JSX.Element {
  return (
    <SafeAreaView
      edges={['right', 'left', 'top', 'bottom']}
      style={style ? style : ContainerStyles.flex1White}
    >
      <StatusBar
        hidden={false}
        barStyle={'dark-content'}
        backgroundColor={COLORS.WHITE}
      />
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
}
