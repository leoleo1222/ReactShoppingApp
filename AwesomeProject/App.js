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