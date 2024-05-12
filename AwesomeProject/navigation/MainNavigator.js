import React, { useReducer, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Platform } from "react-native";

import SplashScreen from "../screens/SplashScreen";
import BottomTabNavigator from "./HomeNavigator";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  const initialLoadingState = {
    isLoading: false,
    userToken: null,
    username: null,
  };
  return (
    <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'android' ? 25 : 0 }}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* {initialLoadingState.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : initialLoadingState.userToken == null ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
          )} */}
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />         */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
