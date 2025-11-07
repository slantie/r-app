import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Switch,
  Platform
} from 'react-native';



export interface switchProps {
  value: boolean;
  onValueChange: any;
  disabled?: boolean
}




const CustomSwitch = ({ value, onValueChange, disabled }: switchProps) => {
  const [switchAnim] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.timing(switchAnim, {
      toValue: value ? 1 : 0,
      duration: 40,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [value]);

  const handleSwitch = () => {
    Animated.timing(switchAnim, {
      toValue: value ? 1 : 0,
      duration: 40,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      onValueChange(value);
    });
  };

  const switchInterpolated = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18]
  });

  const backgroundColor = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#4cd137']
  });



  return (

    <>
      {Platform.OS === 'ios'
        ?
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        />
        :
        <TouchableOpacity onPress={handleSwitch} style={[styles.switchContainer,]} disabled={disabled} activeOpacity={1}>
          <Animated.View style={[styles.switchBackground, { backgroundColor }]} >
            <Animated.View
              style={[
                styles.switchKnob,
                {
                  transform: [{ translateX: switchInterpolated }]
                }
              ]}
            />
          </Animated.View>
        </TouchableOpacity>}
    </>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 53,
    height: 35,
    justifyContent: 'center',
    padding: 2,
    marginHorizontal: 0,
  },
  switchBackground: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    padding: 2,
  },
  switchKnob: {
    width: 26,
    height: 26,
    borderRadius: 14,
    backgroundColor: '#fff',
  },
});

export default CustomSwitch;
