



import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BookingHistoryContext } from '../../context/BookingHistoryContext'; // Import context

const BookingHistory = ({ navigation }) => {
  const { bookingHistory } = useContext(BookingHistoryContext); // Access past bookings

  const handleRebooking = (item) => {
    // Navigate to booking details or re-book the items
    navigation.navigate('Rebooking', { bookingId: item._id });
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.info}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <Text style={styles.bookingDate}>
          {new Date(item.bookingDate).toLocaleDateString()} {/* Format the booking date */}
        </Text>
        
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => handleRebooking(item)}  // View booking details or re-book
        >
          <Text style={styles.viewButtonText}>Re-book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Booking History</Text> */}
      {bookingHistory.length === 0 ? (
        <View style={styles.emptyHistory}>
          <Text style={styles.emptyMessage}>You have no past bookings!</Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('Shop')}  // Navigate to shop or home screen
          >
            <Text style={styles.continueButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookingHistory}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderBookingItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  bookingItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#1976D2',
    marginVertical: 5,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyHistory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default BookingHistory;
