import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const HelpCenter = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    { id: 1, question: 'How do I use this app?', answer: 'You can start using the app by logging in and navigating through the main features in the dashboard.' },
    { id: 2, question: 'How do I reset my password?', answer: 'Go to the login screen, click on "Forgot Password", and follow the instructions.' },
    { id: 3, question: 'How do I contact support?', answer: 'You can contact support by email at support@example.com or through the Contact Us page.' },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Help Center</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search FAQs..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Text style={styles.subHeader}>Frequently Asked Questions</Text>

      {/* FAQ Items */}
      {filteredFaqs.map((faq, index) => (
        <View key={faq.id}>
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <Text style={[styles.text, activeIndex === index && styles.activeText]}>
              {faq.question}
            </Text>
          </TouchableOpacity>
          {activeIndex === index && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>{faq.answer}</Text>
            </View>
          )}
        </View>
      ))}

      <Text style={styles.subHeader}>Need More Help?</Text>
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('ContactUs')}
      >
        <Text style={styles.text}>Contact Support</Text>
      </TouchableOpacity>

      {/* Feedback Button */}
      <TouchableOpacity 
        style={styles.feedbackButton} 
        onPress={() => alert('Feedback Submitted')}
      >
        <Text style={styles.feedbackText}>Provide Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fafc',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  item: {
    paddingVertical: 12,
    paddingLeft: 10,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  activeText: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  answerContainer: {
    paddingVertical: 8,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  feedbackButton: {
    marginTop: 30,
    paddingVertical: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  feedbackText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HelpCenter;
