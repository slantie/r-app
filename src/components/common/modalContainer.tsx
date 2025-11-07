import React, { JSX } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { COLORS } from '../../constants';
import { ContainerStyles } from './styles';

interface ContainerProps {
  style?: any;
  children: React.ReactNode;
}

export default function ModalContainer({
  style,
  children,
}: ContainerProps): JSX.Element {
  return (
    <SafeAreaView
      edges={['right', 'left', 'top', 'bottom']}
      style={
        style
          ? style
          : [ContainerStyles.flex1White, { backgroundColor: '#272727' }]
      }
    >
      <StatusBar
        hidden={false}
        barStyle={'light-content'}
        backgroundColor={'#272727'}
      />
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
}
