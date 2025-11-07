import AsyncStorage from '@react-native-async-storage/async-storage';

const PrefManager = {
  setValue: async (key: string, value: any) => {
    try {
      const serialized = JSON.stringify(value);
      await AsyncStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Error setting value:', error);
    }
  },

  getValue: async (key: string): Promise<any> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting value:', error);
      return null;
    }
  },

  removeValue: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing value:', error);
    }
  },

  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};

export default PrefManager;
