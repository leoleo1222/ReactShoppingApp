import React, { Fragment } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductsScreen from '../screens/ProductsScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import LoginScreen from "../screens/LoginScreen";
import LoginScreen2 from "../screens/LoginScreen2";
import ChatBotScreen from "../screens/ChatBotScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const headerOptions = {
    headerShown: false
}

function ProductNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Products" component={ProductsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Order" component={OrderScreen} initialParams={{ product: undefined }} />
        </Stack.Navigator>
    )
}

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="ProductsTab"
                component={ProductNavigator}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="TransactionsTab"
                component={TransactionsScreen}
                options={{
                    tabBarLabel: 'Transactions',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="credit-card-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            /> */}
            <Tab.Screen
                name="Login"
                component={LoginScreen2}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="ChatBot"
                component={ChatBotScreen}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
}


