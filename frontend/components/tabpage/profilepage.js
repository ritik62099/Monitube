


import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icons
import { AuthContext } from '../../context/AuthContext';

const Profilepage = ({ navigation }) => {
  const { logout, userName, profileImage } = useContext(AuthContext);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false); // New state for Information section

  const baseUrl = 'http://10.0.2.2:5000/';
  // const baseUrl = 'http://192.168.176.91:5000/';
  const formattedProfileImage = profileImage ? profileImage.replace(/\\/g, '/') : '';
  const fullImageUrl = profileImage?.startsWith('http')
    ? profileImage
    : `${baseUrl}${formattedProfileImage}`;

  useEffect(() => {
    console.log("User Name from Context:", userName);
    console.log("Full Image URL:", fullImageUrl);
  }, [userName, profileImage]);

  const handleLogout = () => {
    logout();
    navigation.navigate('login');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: fullImageUrl || 'https://via.placeholder.com/150' }}
            style={styles.image}
          />
          <Text style={styles.welcome}>Welcome, {userName || 'Guest'}!</Text>
        </View>

        {/* Logout Accordion */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setIsLogoutOpen(!isLogoutOpen)}
        >
          <View style={styles.accordionHeaderContent}>
            <Icon name="logout" size={24} color="#333" style={styles.icon} />
            <Text style={styles.accordionTitle}>Logout Options</Text>
          </View>
        </TouchableOpacity>
        {isLogoutOpen && (
          <View style={styles.accordionContent}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Forgotpassword')}
            >
              <Text style={styles.buttonText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Product Accordion */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setIsProductOpen(!isProductOpen)}
        >
          <View style={styles.accordionHeaderContent}>
            <Icon name="shopping-cart" size={24} color="#333" style={styles.icon} />
            <Text style={styles.accordionTitle}>Product Options</Text>
          </View>
        </TouchableOpacity>
        {isProductOpen && (
          <View style={styles.accordionContent}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Addproduct')}
            >
              <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Userproduct')}
            >
              <Text style={styles.buttonText}>User Products</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('bookinghistory')}>

              <Text style={styles.buttonText}>History</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Information Accordion (New Section) */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setIsInfoOpen(!isInfoOpen)}
        >
          <View style={styles.accordionHeaderContent}>
            <Icon name="info" size={24} color="#333" style={styles.icon} />
            <Text style={styles.accordionTitle}>Information</Text>
          </View>
        </TouchableOpacity>
        {isInfoOpen && (
          <View style={styles.accordionContent}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('About')}
            >
              <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Helpcenter')}
            >
              <Text style={styles.buttonText}>Help Center</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Links to Terms, Privacy Policy, and FAQ */}
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
            <Text style={styles.linkText}>FAQ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profilepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafc',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#4CAF50',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginBottom: 10,
  },
  accordionHeader: {
    backgroundColor: '#e6e6e6',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  accordionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  accordionContent: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50', // Green background
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#388E3C', // Darker green border for depth
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#4CAF50',
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
});


