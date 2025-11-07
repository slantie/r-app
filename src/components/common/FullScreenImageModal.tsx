import React from 'react';
import { Modal, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  imageUri: string;
  onClose: () => void;
}

const FullScreenImageModal = ({ visible, imageUri, onClose }: Props) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={styles.backdrop}
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={styles.centered}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
});

export default FullScreenImageModal;
