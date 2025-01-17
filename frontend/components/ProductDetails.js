



import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BookingHistoryContext } from '../context/BookingHistoryContext'; // Import BookingHistoryContext

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params; // Get the product data from route params

  // Access bookingHistory and setBookingHistory from the BookingHistoryContext
  const { bookingHistory, setBookingHistory } = useContext(BookingHistoryContext);

  // Handle Buy Now action
  const handleBuyNow = () => {
    // Add product to booking history
    const newBookingHistory = [...bookingHistory, product]; // Add the product to the booking history
    setBookingHistory(newBookingHistory); // Update booking history

    // Redirect to Booking History directly
    navigation.navigate('Homes');  // Navigate to the Booking History screen
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>Price: ₹{product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      
      {/* Buy Now button */}
      <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
        <Text style={styles.buyNowButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8', // Slightly light background for better contrast
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productPrice: {
    fontSize: 20,
    color: 'green',
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  buyNowButton: {
    backgroundColor: '#1976D2', // Blue color for the "Buy Now" button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProductDetails;
