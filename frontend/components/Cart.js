// src/components/Cart.js
import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';

const Cart = ({ navigation }) => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const handleCheckout = () => {
        navigation.navigate('BookingCheckout');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Shopping Cart</Text>
            {cartItems.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Text>{item.name}</Text>
                            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
            <Button title="Checkout" onPress={handleCheckout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default Cart;

