import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function FloatingButton() {
    const navigation = useNavigation();
    const navState = useNavigationState(state => state);
    const list = ['ChatBot', "Login"];
    // Function to determine if the current tab screen is 'ChatBot'
    const isCurrentScreenChatBot = () => {
        // This assumes you are navigating within a Tab Navigator
        const rootState = navState; // This gets the root navigator state
        if (!rootState) return false;

        // Find the active tab navigator's index
        const tabNavState = rootState.routes[rootState.index].state;
        if (!tabNavState) return false;

        // Check the current tab screen
        const currentTab = tabNavState.routes[tabNavState.index];
        return list.includes(currentTab.name); // Make sure the tab name matches what you have in your Tab.Navigator
    };

    // Do not render this component if the current screen is 'ChatBot'
    if (isCurrentScreenChatBot()) {
        return null;
    }

    return (
        <View style={styles.fabContainer}>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('ChatBot')}  // Navigate to ChatBot screen
            >
                <FontAwesome name="comments" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        right: 16,
        bottom: 90, // Adjust based on your tab bar's height
    },
    fab: {
        backgroundColor: '#007AFF',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: { height: 3, width: 0 },
        shadowColor: '#000',
    }
});
