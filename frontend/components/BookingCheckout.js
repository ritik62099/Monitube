// src/components/BookingCheckout.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const BookingCheckout = () => {
    const [address, setAddress] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('');

    const handleBooking = () => {
        // Process the booking
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Shipping Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Payment Information"
                value={paymentInfo}
                onChangeText={setPaymentInfo}
            />
            <Button title="Confirm Booking" onPress={handleBooking} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default BookingCheckout;
