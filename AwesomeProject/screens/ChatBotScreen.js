import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  Keyboard,
} from 'react-native';

const ChatBotScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(0));
  const scrollViewRef = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
      Animated.timing(keyboardHeight, {
        duration: e.duration,
        toValue: e.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(keyboardHeight, {
        duration: 250,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const submitMessage = async (message) => {
    // Log the input message
    console.log("Input Message:", message);
  
    const apiUrl = "http://127.0.0.1:8000/chatbot_proxy/"; // Update the URL to your Django server
  
    const headers = {
      'Content-Type': 'application/json',
    };
    const payload = {
      message: message // Change the structure of the payload as per your Django view
    };
  
    console.log("Payload:", payload);
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Extract bot's response from data
        const botResponse = data.bot_response;
        return botResponse;
      } else {
        // Handle error response
        console.error("Error:", response.statusText);
        return 'Error';
      }
    } catch (error) {
      console.error("Error:", error);
      return 'Error';
    }
  };  

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    // Add user message to chat history
    setChatHistory(prevHistory => [...prevHistory, { text: message, sender: 'user' }]);
    // Clear input field
    setMessage('');

    // Call API to get bot's response
    const botResponse = await submitMessage(message);
    // Add bot's response to chat history
    setChatHistory(prevHistory => [...prevHistory, { text: botResponse, sender: 'bot' }]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Chat History Display */}
        <Animated.ScrollView
          ref={scrollViewRef}
          style={[styles.chatContainer, { marginBottom: keyboardHeight }]}
          contentContainerStyle={{ paddingVertical: 20 }}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {chatHistory.map((chat, index) => (
            <View key={index} style={chat.sender === 'user' ? styles.userMessage : styles.botMessage}>
              <Text style={styles.messageText}>{chat.text}</Text>
            </View>
          ))}
        </Animated.ScrollView>
        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            onChangeText={setMessage}
            value={message}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '70%',
    elevation: 3,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '70%',
    elevation: 3,
  },
  messageText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DADADA',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatBotScreen;
