
import React, { createContext, useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/api/auth/login', { email, password });
      // const response = await axios.post('http://192.168.176.91:5000/api/auth/login', { email, password });
      const { token, name, profileImage } = response.data;

      const baseUrl = 'http://10.0.2.2:5000/'; // Local development (Android Emulator)
      // const baseUrl = 'http://192.168.176.91:5000/'; // Local development (Android Emulator)
      const fullProfileImageUrl = `${baseUrl}${profileImage}`;

      if (!token || !name || !profileImage) {
        throw new Error('Missing token, name, or profileImage in API response');
      }

      await Keychain.setGenericPassword('userToken', token, { service: 'userToken' });
      await Keychain.setGenericPassword('userName', name, { service: 'userName' });
      await Keychain.setGenericPassword('profileImage', fullProfileImageUrl, { service: 'profileImage' });

      setUserToken(token);
      setUserName(name);
      setProfileImage(profileImage);
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };



  const logout = async () => {
    try {
      await Keychain.resetGenericPassword({ service: 'userToken' });
      await Keychain.resetGenericPassword({ service: 'userName' });
      await Keychain.resetGenericPassword({ service: 'profileImage' });

      setUserToken(null);
      setUserName(null);
      setProfileImage(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // const isLoggedIn = async () => {
  //   try {
  //     const tokenCredentials = await Keychain.getGenericPassword({ service: 'userToken' });
  //     const nameCredentials = await Keychain.getGenericPassword({ service: 'userName' });
  //     const imageCredentials = await Keychain.getGenericPassword({ service: 'profileImage' });

  //     if (tokenCredentials && nameCredentials && imageCredentials) {
  //       setUserToken(tokenCredentials.password);
  //       setUserName(nameCredentials.password);
  //       setProfileImage(imageCredentials.password);
  //     }
  //   } catch (error) {
  //     console.error('Failed to retrieve token', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const isLoggedIn = async () => {
    try {
      const tokenCredentials = await Keychain.getGenericPassword({ service: 'userToken' });
      const nameCredentials = await Keychain.getGenericPassword({ service: 'userName' });
      const imageCredentials = await Keychain.getGenericPassword({ service: 'profileImage' });
  
      if (tokenCredentials && nameCredentials && imageCredentials) {
        setUserToken(tokenCredentials.password);
        setUserName(nameCredentials.password);
        setProfileImage(imageCredentials.password); // Ensure profileImage is set here
        console.log('Retrieved Profile Image:', imageCredentials.password); // Debugging
      }
    } catch (error) {
      console.error('Failed to retrieve token', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn(); // Check if user is logged in on app start
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, userName, profileImage, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
