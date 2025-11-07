import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

export const  { width, height } = Dimensions.get('window');

// Calculate responsive width based on percentage
export const RWidth = (percentage: number) => { 
  const calculatedWidth =(percentage * width) / 100;
  return Math.round(calculatedWidth);
};

// Calculate responsive height based on percentage
export const RHeight = (percentage:number) => {
  const calculatedHeight = (percentage * height) / 100;
  return Math.round(calculatedHeight);
};

// Calculate responsive font size
export const RFont = (size:number) => {
  const ratio = PixelRatio.getFontScale();
  return Math.round(size * ratio);
};

export const OTPWidth = () => {
  const calculatedWidth = (( width) / 5)-20;
  return Math.round(calculatedWidth);
}