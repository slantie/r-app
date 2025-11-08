import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import RootNavigation from './src/navigation';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { MenuProvider } from "react-native-popup-menu";
import 'react-native-get-random-values';
import Database from './src/services/database';

// create a component
const App = () => {
  useEffect(() => {
    // Initialize unified database on app start
    Database.initialize();
  }, []);

  return (
    <View style={styles.container}>
       <MenuProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
        </PersistGate>
      </Provider>
       </MenuProvider>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;
