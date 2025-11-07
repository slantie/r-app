import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const KeyboardAvoidingView = (props: any) => {
  const defaultProps = {
    contentContainerStyle: props.contentContainerStyle ? props.contentContainerStyle : { flexGrow: 1 },
    bounces: false,
    bouncesZoom: false,
    alwaysBounceVertical: false,
    alwaysBounceHorizontal: false,

  };

  return React.createElement(KeyboardAwareScrollView, {
    keyboardShouldPersistTaps: 'handled',
    showsVerticalScrollIndicator: false,
    enableAutomaticScroll: true,
    extraHeight: Platform.OS === 'android' ? 100 : 0,
    extraScrollHeight: Platform.OS === 'android' ? 100 : 0,
    style: props.style ? props.style : { flex: 1 },
    enableOnAndroid: props.enableOnAndroid ? props.enableOnAndroid : true,
    ...defaultProps,
    stickyHeaderIndices: props.stickyHeaderIndices,
    ...props,

  });
};

export default KeyboardAvoidingView;