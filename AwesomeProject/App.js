import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Icon } from "@rneui/base";
import MainStackNavigator from './navigation/MainNavigator.js';

export default function App() {
  return (
    <MainStackNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 100,
    marginRight: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

