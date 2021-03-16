import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import MainNavigator from './screens/components/navigation/navigation';

const App = () => {
  return (
    <MainNavigator />
  );
};



export default App;