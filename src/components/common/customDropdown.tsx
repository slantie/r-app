import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  UIManager,
  findNodeHandle,
  Keyboard,
  Pressable,
} from 'react-native';
import Dropdown from './Dropdown1';

const screenHeight = Dimensions.get('window').height;

interface Props {
  placeholder?: string;
  data: string[];
  value: string;
  onChangeText: (text: string) => void;
  isActive: boolean; // comes from parent
  onFocus: () => void;
  onClose: () => void;
  position?: 'top' | 'bottom' | 'auto'; // new prop
}

const CustomDropdownInput: React.FC<Props> = ({
  placeholder,
  data,
  value,
  onChangeText,
  isActive,
  onFocus,
  onClose,
  position = 'auto',
}) => {
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
  const [searchValue, setSearchValue] = useState(value || '');
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    if (!isActive) {
      setSearchValue('');
    }
  }, [isActive]);

  const openDropdown = () => {
    setSearchValue(value);

    if (position === 'auto') {
      const handle = findNodeHandle(inputRef.current);
      if (handle) {
        UIManager.measure(handle, (_x, _y, _w, h, _px, py) => {
          const inputCenterY = py + h / 2;
          const isInBottom60Percent = inputCenterY > screenHeight * 0.4;
          setDropdownPosition(isInBottom60Percent ? 'top' : 'bottom');
        });
      }
    } else {
      setDropdownPosition(position);
    }

    onFocus();
  };

  const closeDropdown = () => {
    Keyboard.dismiss();
    onClose();
  };

  const handleSelect = (item: string) => {
    onChangeText(item);
    closeDropdown();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onFocus={openDropdown}
          onChangeText={(text) => {
            onChangeText(text);
            setSearchValue(text);
            if (!isActive) openDropdown();
          }}
        />
        {/* <TouchableOpacity
          onPress={isActive ? closeDropdown : openDropdown}
          style={styles.redButton}
        /> */}
      </View>

      {isActive && (
        <>
          {/* FULL-SCREEN OVERLAY for outside click */}
          <Pressable
            style={styles.fullScreenOverlay}
            onPress={closeDropdown}
          />

          {/* Dropdown itself */}
          <Dropdown
            position={dropdownPosition}
            searchValue={searchValue}
            onSelect={handleSelect}
            data={data}
          />
        </>
      )}
    </View>
  );
};

export default CustomDropdownInput;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 25,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    // padding: 30,
    borderRadius: 6,
    marginRight: 10,
    paddingVertical:14,
    paddingHorizontal:10
  },
  redButton: {
    height: 20,
    width: 20,
    backgroundColor: 'red',
  },
  fullScreenOverlay: {
    position: 'absolute',
    top: -1000, // big enough to cover top
    bottom: -1000, // big enough to cover bottom
    left: -1000,
    right: -1000,
    zIndex: 999,
  },
});