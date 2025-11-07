import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FF, FS } from '../../constants';

interface ProgressBarProps {
  progress: number; // Value between 0 and 100
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  showPercentage?: boolean;
  showIcon?: boolean;
  iconSource?: any;
  label?: string;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  backgroundColor = COLORS.BORDER_GREY,
  progressColor = COLORS.BLUE_TEXT,
  showPercentage = true,
  showIcon = false,
  iconSource,
  label,
  animated = true,
}) => {
  // Ensure progress is within valid range
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: clampedProgress,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(clampedProgress);
    }
  }, [clampedProgress, animated, animatedValue]);

  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          {showIcon && iconSource && (
            <View style={styles.iconContainer}>
              {iconSource}
            </View>
          )}
          <Text style={styles.labelText}>{label}</Text>
          {/* {showPercentage && (
            <Text style={styles.percentageText}>{Math.round(progress)}%</Text>
          )} */}
        </View>
      )}

      <View style={[styles.progressContainer, { height, backgroundColor }]}>
        {animated ? (
          <Animated.View
            style={[
              styles.progressBar,
              {
                height,
                backgroundColor: progressColor,
                width: progressWidth,
              },
            ]}
          />
        ) : (
          <View
            style={[
              styles.progressBar,
              {
                height,
                backgroundColor: progressColor,
                width: `${clampedProgress}%`,
              },
            ]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
  labelText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    flex: 1,
  },
  percentageText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLUE_TEXT,
  },
  progressContainer: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop:16
  },
  progressBar: {
    borderRadius: 4,
  },
});

export default ProgressBar;
