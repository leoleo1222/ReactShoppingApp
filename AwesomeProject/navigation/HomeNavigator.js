import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FloatingButton from '../components/FloatingButton';

import ProductsScreen from '../screens/ProductsScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import LoginScreen2 from "../screens/LoginScreen2";
import ChatBotScreen from "../screens/ChatBotScreen";
import UserListScreen from '../screens/UserlistScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function EmptyComponent() {
    return null;  // Returns nothing, effectively hiding the tab button
}

function ProductNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Products" component={ProductsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Order" component={OrderScreen} />
        </Stack.Navigator>
    );
}

function LoginNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen2}
                initialParams={{ register: false }}  // Pass initialParams for navigators
                options={{ tabBarLabel: 'Login', headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={LoginScreen2}
                initialParams={{ register: true }}  // Pass initialParams for navigators
                options={{ tabBarLabel: 'Login', headerShown: false }}
            />
        </Stack.Navigator>
    );
}


export default function BottomTabNavigator() {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'ProductsTab') {
                            iconName = 'cart';
                        } else if (route.name === 'TransactionsTab') {
                            iconName = 'credit-card-outline';
                        } else if (route.name === 'ProfileTab') {
                            iconName = 'account';
                        } else if (route.name === 'Login') {
                            iconName = 'login';
                        } else if (route.name === 'ChatBot') {
                            iconName = 'robot';
                        }
                        else if (route.name === 'UserList') {
                            iconName = 'account-group';
                        }
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="ProductsTab" component={ProductNavigator} options={{ tabBarLabel: 'Products' , headerShown: false }} />
                <Tab.Screen name="TransactionsTab" component={TransactionsScreen} options={{ tabBarLabel: 'Transactions' , headerShown: false }} />
                <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profile' , headerShown: false }} />
                <Tab.Screen name="Login" component={LoginScreen2} options={{ tabBarLabel: 'Login', headerShown: false }} />
                <Tab.Screen
                    name="ChatBot"
                    component={ChatBotScreen}
                    options={{
                        tabBarLabel: 'ChatBot',
                        tabBarButton: EmptyComponent,  // Hides the tab bar button
                        headerShown: false
                    }}
                />
                <Tab.Screen name="UserList" component={UserListScreen} options={{ tabBarLabel: 'UserList' , headerShown: false }} />
            </Tab.Navigator>
            <FloatingButton />
        </View>
    );
}

