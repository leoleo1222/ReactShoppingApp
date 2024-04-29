import React, { useState }  from 'react'

import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
  } from 'react-native';



  // Placeholder functions for handling login and register navigation  
const handleLogin = () => {
    console.log('login');
};

const handleForgotPassword = () => {
    console.log('Forgot Password');
 };

const handleRegisterNavigation = () => {
   console.log('navigate to register');
};

const handleOAuthLogin = (service) => {
    console.log(`Login with ${service}`);
};

const googleLogo = require('../assets/images/google-logo.png');
const facebookLogo = require('../assets/images/facebook-logo.png');
const AppleLogo = require('../assets/images/apple-logo.png');
const Logo = require('../assets/images/logo.png');
    
export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
          <View style={styles.container}>
            {/* <Image
              source={Logo} 
              style={styles.logo}
            /> */}
            <Text style={styles.welcomeBackText}>Welcome back!</Text>
            <Text style={styles.loginToAccountText}>Login to your account</Text>
            
            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
              />
            </View>
            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                placeholder="Password"
              />
            </View>
    
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View style={styles.line} />
            <Text style={styles.orSignInWithText}>Or sign in with</Text>
            <View style={styles.line} />
            </View>

            <View style={styles.oauthContainer}>

            <TouchableOpacity
                style={styles.oauthButton}
                onPress={() => handleOAuthLogin('Google')}>
                <Image source={googleLogo} style={styles.oauthLogo} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.oauthButton}
                onPress={() => handleOAuthLogin('Apple')}>
                <Image source={AppleLogo} style={styles.oauthLogo} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.oauthButton}
                onPress={() => handleOAuthLogin('Facebook')}>
                <Image source={facebookLogo} style={styles.oauthLogo} />
            </TouchableOpacity>

            </View>
    
            <View style={styles.registerTextContainer}>
                <Text style={styles.registerText}>
                    Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={handleRegisterNavigation}>
                    <Text style={styles.registerButtonText}>
                    Sign up here
                    </Text>
                </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#F0F4F7', // Light grey background
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginRight: 30,
      marginLeft: 30,
    },
    logo: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      marginBottom: 32, // Spacing adjusted to give more room below logo
    },
    welcomeBackText: {
      fontSize: 28, // Slightly larger text for the title
      fontWeight: 'bold',
      color: '#333', // Dark text for contrast
      marginBottom: 8, // Reduced spacing
      alignSelf: 'flex-start', // Align to the left
    },
    loginToAccountText: {
      fontSize: 16, // Smaller subtitle text
      color: '#333', // Dark text for contrast
      marginBottom: 40, // More spacing before the input fields
      alignSelf: 'flex-start'
    },
    inputField: {
      backgroundColor: '#FFFFFF', // White input field background
      width: '100%',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 }, // Slight shadow for depth
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 1, // Lower elevation for subtle shadow
      marginBottom: 20, // Increased spacing between input fields
    },
    input: {
      fontSize: 16,
      color: '#333', // Input text color
    },
    loginButton: {
      backgroundColor: '#007AFF', // Primary color for the button
      borderRadius: 25,
      paddingVertical: 15,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      shadowColor: '#007AFF', // Matching shadow color to the button
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3, // Stronger shadow for the button
      shadowRadius: 6,
      elevation: 3,
    },
    loginButtonText: {
      color: '#FFFFFF', // White text for the button
      fontSize: 18,
      fontWeight: 'bold',
    },
    registerTextContainer: {
        flexDirection: 'row', // Align text components in a row
        marginTop: 20, // More spacing above the registration prompt
        alignItems: 'center', // Align items vertically
      },
      registerText: {
        fontSize: 16,
        color: '#333', // Dark text for readability
      },
      registerButtonText: {
        color: '#007AFF', // Use the primary color for the 'Sign up here' text
        fontWeight: 'bold',
      },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#D0D0D0',
      },
    orSignInWithText: {
        color: '#A0A0A0',
        paddingHorizontal: 10,
        fontSize: 14,
      },
    oauthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 0,
      },
    oauthButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
    },
    oauthLogo: {
        width: 24,
        height: 24,
    },
    forgotPasswordText: {
        color: '#007AFF', // Use your theme color
        fontSize: 16,
        marginTop: 15, // Adjust the margin as needed
    }
     
  });
