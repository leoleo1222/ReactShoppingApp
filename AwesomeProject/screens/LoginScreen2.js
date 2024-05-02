import React, { Fragment, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

// LoginScreen2.propTypes = {
//   register: PropTypes.bool,
// };

// LoginScreen2.defaultProps = {
//   register: false,
// };

// Placeholder functions for handling login and register navigation  
const handleLogin = () => {
  console.log('login');
};

const handleForgotPassword = () => {
  console.log('Forgot Password');
};

const handleRegisterNavigation = () => {
  console.log('navigate to register');
  // navigation.navigate('Login');
};

const handleOAuthLogin = (service) => {
  console.log(`Login with ${service}`);
};

const googleLogo = require('../assets/images/google-logo.png');
const facebookLogo = require('../assets/images/facebook-logo.png');
const AppleLogo = require('../assets/images/apple-logo.png');
const Logo = require('../assets/images/logo.png');

export default function LoginScreen2(register = false, { navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>

          <Text style={styles.title}>Let's Sign You In</Text>
          <Text style={styles.subtitle}>Welcome back, you've been missed!</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHint}>Email</Text>
            
            <View style={styles.inputIcon}>
            <MaterialCommunityIcons name="account" size={20} color="#8F92A1" />
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHint}>Password</Text>
            <View style={styles.inputIcon}>
              <MaterialCommunityIcons name="lock" size={20} color="#8F92A1" />
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                placeholder="Password"
              />
            </View>
          </View>
          {/* Add eye icon for password visibility */}
          {register? null: (
            <View style={styles.inputContainer}>
              <Text style={styles.inputHint}>Retype Password</Text>
              <View style={styles.inputIcon}>
                <MaterialCommunityIcons name="lock" size={20} color="#8F92A1" />
                <TextInput
                  style={styles.input}
                  onChangeText={setPassword2}
                  value={password2}
                  secureTextEntry
                  placeholder="Enter Password Again"
                />
              </View>
            </View>
          )}
        {!register? null: (<Fragment>
          <TouchableOpacity style={styles.signInButton}  onPress={handleLogin}>
            <Text style={styles.buttonText}>SIGN IN</Text>
            {/* Add arrow icon */}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          </Fragment>  
        )}

        {register?           
          (<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
              <View style={styles.line} />
              <Text style={styles.orSignInWithText}>Or sign in with</Text>
              <View style={styles.line} />
            </View>)
          : (        
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View style={styles.line} />
            <Text style={styles.orSignInWithText}>Or sign up with</Text>
            <View style={styles.line} />
          </View>
        )}

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
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    width: '100%',
    height: 100,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48, // This would be for status bar height
  },
  container: {
    paddingHorizontal: 35,
    paddingTop: 148,
    height: 812, // Fixed height could be problematic, consider using flex
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.8,
    color: '#171717',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: -0.4,
    color: 'rgba(23, 23, 23, 0.6)',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
  inputIcon: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(143, 146, 161, 0.2)',
    paddingTop: 20, // Provide space above the input and icon
    paddingBottom: 8, // And space below
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    paddingHorizontal: 10, // Spacing from the icon to the text
    color: '#171717',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: -0.2,
    color: '#171717',
  },
  inputHint: {
    position: 'absolute',
    height: 16,
    left: 0,
    right: 0,
    top: 0,
    marginBottom: 20,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.17,
    color: '#8F92A1',
  },
  // input: {
  //   height: 44,
  //   marginTop: 16,
  //   marginLeft: 30,
    // fontSize: 16,
    // fontWeight: '500',
    // lineHeight: 20,
    // letterSpacing: -0.2,
    // color: '#171717',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(143, 146, 161, 0.2)',
  // },
  signInButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#C6AB59',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  accountText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 17,
    letterSpacing: -0.2,
    color: 'rgba(23, 23, 23, 0.6)',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialConnectContainer: {
    width: 305,
    height: 48,
    backgroundColor: '#3C79E6',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 82, // Adjusted for visual layout in React Native
  },
  connectText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: -0.8,
    color: '#FFFFFF',
  },
  homeIndicator: {
    position: 'absolute',
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
    bottom: 8,
    alignSelf: 'center',
    opacity: 0.05,
  },
  registerTextContainer: {
    alignSelf: 'center', // Center the text components
    flexDirection: 'row', // Align text components in a row
    marginTop: 20, // More spacing above the registration prompt
    alignItems: 'center', // Align items vertically
  },
  registerText: {
    fontSize: 12,
    color: '#333', // Dark text for readability
  },
  registerButtonText: {
    color: '#007AFF', // Use the primary color for the 'Sign up here' text
    fontWeight: 'bold',
    fontSize: 12,
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
    fontSize: 14,
    marginTop: 15, // Adjust the margin as needed
    
  }
});
