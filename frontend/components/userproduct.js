
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import * as Keychain from 'react-native-keychain';

const UserProductsScreen = () => {
  const [products, setProducts] = useState([]); // State to store the fetched products
  const [error, setError] = useState(null); // New state for error handling

  const fetchUserProducts = async () => {
    try {
      console.log('Fetching user products...');
      
      const credentials = await Keychain.getGenericPassword();
      console.log('Credentials fetched:', credentials);

      const token = credentials ? credentials.password : null;
      console.log('Token:', token);

      if (!token) {
        console.log('No token found. User not authenticated.');
        setError('You are not authenticated. Please log in.');
        return;
      }

      console.log('Sending request to fetch user products...');
      const response = await fetch('http://10.0.2.2:5000/api/products/userproducts', {
        // const response = await fetch('http://192.168.176.91:5000/api/products/userproducts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Response received:', response);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setProducts(data);
      } else {
        const data = await response.json();
        console.log('Error response:', data);
        setError(data.message || 'Failed to fetch products.');
      }
    } catch (err) {
      console.log('Error occurred during fetch:', err);
      setError('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching user products...');
    fetchUserProducts(); // Component mount hote hi products fetch karo
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Products</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>Name: {item.name}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Description: {item.description}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  product: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default UserProductsScreen;
