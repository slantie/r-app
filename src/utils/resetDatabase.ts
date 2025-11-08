import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Reset the entire app database to initial state
 * Use this if you encounter stale data issues
 */
export const resetDatabase = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    console.log('✅ Database cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    throw error;
  }
};

/**
 * Get the current database state (for debugging)
 */
export const getDatabaseState = async (): Promise<any> => {
  try {
    const data = await AsyncStorage.getItem('@shivalik_app_database');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting database state:', error);
    return null;
  }
};

export default { resetDatabase, getDatabaseState };
