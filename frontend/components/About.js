import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.text}>
        Welcome to our app! We are a team of passionate developers working to create seamless and user-friendly experiences.
        This app is designed to help users manage their tasks and stay organized efficiently.
      </Text>
      <Text style={styles.text}>
        Our mission is to make productivity apps that are simple, yet powerful, and provide users with the tools they need to get things done.
      </Text>
      <Text style={styles.subHeader}>Features:</Text>
      <Text style={styles.text}>- Task Management</Text>
      <Text style={styles.text}>- Real-Time Collaboration</Text>
      <Text style={styles.text}>- User-Friendly Interface</Text>
      <Text style={styles.text}>- Customizable Themes</Text>
      <Text style={styles.subHeader}>Contact Us: 6209968385</Text>
      <Text style={styles.text}>Email: ritik841207@gmail.com</Text>
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
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 10,
  },
});

export default About;
