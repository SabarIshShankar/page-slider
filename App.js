import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
//import Player from './components/Player';

export default function App() {
  return (
    <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#ffffff"/>
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#040404',
      justifyContent: 'center',
    }
  });
