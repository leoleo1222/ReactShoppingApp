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
  ScrollView,
} from 'react-native';

const ChatBotScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(0));
  const scrollViewRef = useRef();

  const questions = {
    questions: [
      {
        id: 1,
        text: 'What item do you want information about?',
      },
      {
        id: 2,
        text: 'Tell me my order details?',
      },
      {
        id: 3,
        text: 'What promotions are available?',
      }

    ],
  };

  const responses = {
    responses: {
      'What item do you want information about?': 'We have a wide range of products available. Please let us know the category you are interested in.',
      'What are your order details?': 'Please provide your order number so we can assist you better.',
      'What promotions are available?': 'We have various promotions available. Please let us know the type of promotion you are interested in.',
    },
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
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

  const handleOptionSelect = (option) => {
    setChatHistory((prevHistory) => [...prevHistory, { text: option, sender: 'user' }]);
    const response = responses.responses[option];
    if (response) {
      setChatHistory((prevHistory) => [...prevHistory, { text: response, sender: 'bot' }]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>ChatBot</Text>
        </View>
        <View style={styles.chatContainer}>
          <Animated.ScrollView
            ref={scrollViewRef}
            style={[styles.chatScrollView, { marginBottom: keyboardHeight }]}
            contentContainerStyle={{ paddingVertical: 20 }}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {chatHistory.map((chat, index) => (
              <View key={index} style={chat.sender === 'user' ? styles.userMessage : styles.botMessage}>
                <Text style={styles.messageText}>{chat.text}</Text>
              </View>
            ))}
          </Animated.ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              onChangeText={setMessage}
              value={message}
              onSubmitEditing={() => {
                handleOptionSelect(message);
                setMessage('');
              }}
            />
            <TouchableOpacity style={styles.sendButton} onPress={() => {
              handleOptionSelect(message);
              setMessage('');
            }}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {questions.questions.map((question, index) => (
              <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleOptionSelect(question.text)}>
                <Text style={styles.optionText}>{question.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4267B2',
  },
  chatContainer: {
    flex: 1,
    width: '100%',
  },
  chatScrollView: {
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
  messageText: { // black
    color: '#000000',
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DADADA',
    backgroundColor: '#FFFFFF',
  },
  optionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    marginRight: 10,
  },
  optionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatBotScreen;
