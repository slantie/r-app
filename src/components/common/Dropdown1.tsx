import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

interface Props {
  position: 'top' | 'bottom';
  searchValue: string;
  onSelect: (item: string) => void;
  data: string[];
}

const screenHeight = Dimensions.get('window').height;

const Dropdown: React.FC<Props> = ({
  position,
  searchValue,
  onSelect,
  data,
}) => {
  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <View
      style={[
        styles.dropdown,
        position === 'top' ? { bottom: '100%' } : { top: '100%' },
      ]}
      pointerEvents="box-none" // allows touches outside without blocking
    >
      {filteredData.length > 0 ? (
        <ScrollView
          nestedScrollEnabled={true}
          style={{ maxHeight: screenHeight / 2.8 }}
          keyboardShouldPersistTaps="handled"
        >
          {filteredData.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => onSelect(item)}>
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noData}>No results found</Text>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 1000, // ensures it's above overlay
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  noData: {
    padding: 10,
    color: '#888',
  },
});