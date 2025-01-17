

// screens/HomeScreen.js
import React from 'react';
import { View } from 'react-native';
import Main from './tabpage/main';
import Profilepage from './tabpage/profilepage';
import Services from './tabpage/services';
import ProductList from './ProductList';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the icons

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        {/* Home Tab */}
        <Tab.Screen
          name="Homes"
          component={Main}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={30}
                color="black" // Set the color to black
              />
            ),
            tabBarLabel: () => null, // Hide the label
          }}
        />

        {/* Services Tab */}
        <Tab.Screen
          name="Services"
          component={Services}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon
                name={focused ? 'briefcase' : 'briefcase-outline'}
                size={30}
                color="black" // Set the color to black
              />
            ),
            tabBarLabel: () => null, // Hide the label
          }}
        />

        {/* Explore Tab */}
        <Tab.Screen
          name="Explor"
          component={ProductList}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon
                name={focused ? 'search' : 'search-outline'}
                size={30}
                color="black" // Set the color to black
              />
            ),
            tabBarLabel: () => null, // Hide the label
          }}
        />

        {/* Profile Tab */}
        <Tab.Screen
          name="Profilepage"
          component={Profilepage}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                size={30}
                color="black" // Set the color to black
              />
            ),
            tabBarLabel: () => null, // Hide the label
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default HomeScreen;
