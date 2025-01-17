// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/HomePage';
import ProductDetails from '../components/ProductDetails';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Cart from '../components/Cart';
import BookingCheckout from '../components/BookingCheckout';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage">
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="BookingCheckout" component={BookingCheckout} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
