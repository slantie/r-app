import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, G } from 'react-native-svg';

interface QRCodeProps {
  value: string;
  size?: number;
  backgroundColor?: string;
  color?: string;
}

// Simple QR Code generator (simplified version for demo)
// In production, use a library like react-native-qrcode-svg
const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  backgroundColor = '#FFFFFF',
  color = '#000000',
}) => {
  // Generate a simple pattern based on the value
  // This creates a deterministic pattern from the input string
  const generatePattern = (input: string): boolean[][] => {
    const gridSize = 25; // 25x25 grid
    const pattern: boolean[][] = [];
    
    // Create hash from input using a simple algorithm
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash * 31 + char) % 1000000;
    }
    
    // Generate deterministic random pattern
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < gridSize; i++) {
      pattern[i] = [];
      for (let j = 0; j < gridSize; j++) {
        const seed = hash + i * gridSize + j;
        pattern[i][j] = random(seed) > 0.5;
      }
    }
    
    // Add corner markers (position detection patterns)
    const addCornerMarker = (startX: number, startY: number) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (
            (i === 0 || i === 6 || j === 0 || j === 6) ||
            (i >= 2 && i <= 4 && j >= 2 && j <= 4)
          ) {
            pattern[startY + i][startX + j] = true;
          } else {
            pattern[startY + i][startX + j] = false;
          }
        }
      }
    };
    
    // Top-left
    addCornerMarker(0, 0);
    // Top-right
    addCornerMarker(gridSize - 7, 0);
    // Bottom-left
    addCornerMarker(0, gridSize - 7);
    
    return pattern;
  };
  
  const pattern = generatePattern(value);
  const gridSize = pattern.length;
  const cellSize = size / gridSize;
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Rect x={0} y={0} width={size} height={size} fill={backgroundColor} />
        <G>
          {pattern.map((row, i) =>
            row.map((cell, j) =>
              cell ? (
                <Rect
                  key={`${i}-${j}`}
                  x={j * cellSize}
                  y={i * cellSize}
                  width={cellSize}
                  height={cellSize}
                  fill={color}
                />
              ) : null
            )
          )}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QRCode;
