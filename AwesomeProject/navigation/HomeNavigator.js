import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FloatingButton from '../components/FloatingButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductsScreen from '../screens/ProductsScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import LoginScreen from "../screens/LoginScreen";
import ChatBotScreen from "../screens/ChatBotScreen";
import UserListScreen from '../screens/UserlistScreen';
import { FontAwesome } from '@expo/vector-icons';
import OrderAdminScreen from '../screens/OrderAdminScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function EmptyComponent() {
    return null;  // Returns nothing, effectively hiding the tab button
}
      
// Function to handle logout to clear the token in await AsyncStorage.setItem("token", token);
const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    console.log("Removed token from async storage");
    navigation.navigate("Home");
};

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
                component={LoginScreen}
                initialParams={{ register: false }}  // Pass initialParams for navigators
                options={{ tabBarLabel: 'Login', headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={LoginScreen}
                initialParams={{ register: true }}  // Pass initialParams for navigators
                options={{ tabBarLabel: 'Login', headerShown: false }}
            />
        </Stack.Navigator>
    );
}


export default function BottomTabNavigator({ navigation, route }) {
    const [token, setToken] = useState(route.params?.token || null);
    const [role, setRole] = useState(null);
    useEffect(() => {
        if (route.params?.token) {
          setToken(route.params.token);
        }
      }, [route.params?.token]);
    useEffect(() => {
        const getToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            console.log('Stored token:', storedToken);
            setToken(storedToken);
        };
        getToken();
        const getRole = async () => {
            const storedRole = await AsyncStorage.getItem('role');
            console.log('Role:', storedRole);
            setRole(storedRole);
        };
        getRole();
    }, []);


    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("role");
        console.log("Logged out, removed token and role from async storage");
        setToken(null);
        setRole(null);
    };

    const handleLogin = async (token, role) => {
        try {
            // Store token and role in AsyncStorage
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("role", role);
    
            // Log for debugging
            console.log("Logged in, set token and role in async storage");
    
            // Update state
            setToken(token);
            setRole(role);

            // navigation.navigate("Products", { token: responseData.token, role: responseData.role});

        } catch (error) {
            // Handle potential errors in AsyncStorage or navigation
            console.error("Failed to log in and set token/role:", error);
        }
    };

    console.log(
        'Token in BottomTabNavigator:', token,
        'Role in BottomTabNavigator:', role
    );

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'ProductsTab') {
                            iconName = 'shopping-cart';
                        } else if (route.name === 'TransactionsTab') {
                            iconName = 'credit-card';
                        } else if (route.name === 'ProfileTab') {
                            iconName = 'user-circle';
                        } else if (route.name === 'ChatBot') {
                            iconName = 'android'; // FontAwesome does not have a direct 'robot' icon
                        } else if (route.name === 'UserList') {
                            iconName = 'group';
                        }

                        // Conditionally show the login or logout icon based on token
                        else if (route.name === 'Login' && !token) {
                            iconName = 'sign-in';
                        } else if (route.name === 'Logout' && token !== null) {
                            iconName = 'sign-out';
                        }

                        else if (route.name === 'OrderList' && token !== null) {
                            iconName = 'th-list';
                        }

                        // Return the FontAwesome icon component with the determined iconName
                        return <FontAwesome name={iconName} size={size} color='black' />;
                    },

                })}
                
            >
                <Tab.Screen name="ProductsTab" component={ProductNavigator} options={{ tabBarLabel: 'Products' , headerShown: false }} />
                {/* <Tab.Screen name="TransactionsTab" component={TransactionsScreen} options={{ tabBarLabel: 'Transactions' , headerShown: false }} /> */}
                {role === "admin" ? (
                    <Tab.Screen name="UserList" component={UserListScreen} options={{ tabBarLabel: 'User List' , headerShown: false }} />
                ) : null}
                {role === "admin" ? (
                    <Tab.Screen name="OrderList" component={OrderAdminScreen} options={{ tabBarLabel: 'Order List' , headerShown: false }} />
                ) : null}
                {token ? (
                    <Tab.Screen name="ProfileTab"  children={() => <ProfileScreen onLogout={handleLogout} />} options={{ tabBarLabel: 'Profile' , headerShown: false }} />
                ) : null}
                
                {/* Conditionally render the Login and Logout screens */}
                {token === null ? (
                    <Tab.Screen name="Login" children={() => <LoginScreen onLogin={handleLogin} />} options={{ tabBarLabel: 'Login', headerShown: false }} />
                ) : (
                    // <Tab.Screen name="Logout" component={EmptyComponent} listeners={({ navigation }) => ({
                    //     tabPress: (e) => {
                    //         e.preventDefault(); // Prevent default action
                    //         handleLogout(); // Call handleLogout function
                    //     },
                    // })} />
                    null
                )}


                <Tab.Screen
                    name="ChatBot"
                    component={ChatBotScreen}
                    options={{
                        tabBarLabel: 'ChatBot',
                        tabBarButton: EmptyComponent,  // Hides the tab bar button
                        headerShown: false
                    }}
                />

            </Tab.Navigator>
            <FloatingButton />
        </View>
    );
}

