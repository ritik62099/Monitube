



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';

const ProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // For filtered data
  const [searchQuery, setSearchQuery] = useState(''); // For search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5000/api/products');
        // const response = await fetch('http://192.168.176.91:5000/api/products');
        const data = await response.json();
        setProducts(data); // Assuming the API returns an array of products
        setFilteredProducts(data); // Initialize filteredProducts with all products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

 
  const handleSearch = (text) => {
    setSearchQuery(text); // Update search query state
    if (text) {
      const filtered = products.filter((item) =>
        // Ensure 'service' exists and is a string before calling 'toLowerCase()'
        item.service && typeof item.service === 'string' && item.service.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered); // Update filtered products
    } else {
      setFilteredProducts(products); // Show all products if search query is empty
    }
  };

  
 

  const renderProduct = ({ item }) => {
    console.log('Image URL:', item.image); // Console me image URL check karne ke liye
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Productdetails', { product: item })}
        style={styles.productContainer}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImage} 
        />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
        <Text style={styles.service}>Service: {item.service}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };
  

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E53935" />
        <Text style={styles.loadingText}>Loading Products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Text style={styles.header}>Explore</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by service name"
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor="#999"
      />

      {/* Product List */}
      <FlatList
        data={filteredProducts} // Use filteredProducts instead of products
        renderItem={renderProduct}
        keyExtractor={(item) => item._id} // Assuming each product has a unique _id
        />
    </View>
  );
};

export default ProductList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafc', // Modern light grayish-blue background
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A3A3A', // Dark gray for a neutral header
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  productContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333', // Darker text for title
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Green for price
    marginBottom: 5,
  },
  service: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555', // Muted dark gray for service
  },
  productDescription: {
    fontSize: 14,
    color: '#888', // Light gray for description
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#666',
  },
  errorText: {
    marginTop: 10,
    fontSize: 18,
    color: '#E53935',
  },
  retryButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#E53935',
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
