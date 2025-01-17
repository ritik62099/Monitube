


import React, { createContext, useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(null);

  // Fetch the token when the component is mounted
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenCredentials = await Keychain.getGenericPassword({ service: 'userToken' });
        if (tokenCredentials) {
          setToken(tokenCredentials.password);
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.log('Failed to retrieve token from Keychain:', error);
      }
    };
    fetchToken();
  }, []);

  // Add product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    saveCartToDatabase([...cart, product]);
  };

  // Save cart to MongoDB
  const saveCartToDatabase = async (cartItems) => {
    if (!token) {
      console.log('No token found, cannot save cart');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:5000/cart', {
        // const response = await fetch('http://192.168.176.91:5000/cart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: cartItems }),
      });

      if (!response.ok) {
        throw new Error('Failed to save cart');
      }

      const data = await response.json();
      console.log('Cart saved to MongoDB:', data);
    } catch (error) {
      console.error('Error saving cart to MongoDB:', error);
    }
  };

  // Remove product from the cart
  const removeFromCart = async (productId) => {
    try {
      // Remove product from local cart state
      const updatedCart = cart.filter((item) => item._id !== productId);
      setCart(updatedCart);

      // Remove product from the backend (MongoDB)
      const response = await fetch(`http://10.0.2.2:5000/cart/${productId}`, {
        // const response = await fetch(`http://192.168.176.91:5000/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove product from cart');
      }

      const data = await response.json();
      console.log('Product removed from MongoDB:', data);
    } catch (error) {
      console.error('Error removing product from MongoDB:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
