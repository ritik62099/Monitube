

import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import * as Keychain from 'react-native-keychain';

const AddProduct = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productService, setProductService] = useState('');
  const [productImage, setProductImage] = useState(null);

  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([
    
    { label: 'Channel', value: 'channel' },
    { label: 'Content', value: 'content' },
    { label: 'Script', value: 'script' },
    { label: 'Seo', value: 'seo' },
    { label: 'Thumbnail', value: 'thumbnail' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Advertiser', value: 'advertiser' },
  ]);

  // Image Picker Function
  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: false },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.error('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setProductImage(selectedImage);
        }
      }
    );
  };



const handleSubmit = async () => {
  if (!productName || !productPrice || !productDescription || !productService || !productImage) {
    Alert.alert('Error', 'Please fill all fields and select an image');
    return;
  }

  let token;

  try {
    const credentials = await Keychain.getGenericPassword({ service: 'userToken' });
    if (credentials) {
      token = credentials.password;
      console.log('Token being sent:', token); // Log token for debugging
    } else {
      Alert.alert('Error', 'User not logged in. Please login again.');
      navigation.navigate('Login');
      return;
    }
  } catch (error) {
    console.error('Keychain error:', error);
    Alert.alert('Error', 'Failed to retrieve token.');
    return;
  }

  const formData = new FormData();
  formData.append('name', productName);
  formData.append('price', productPrice);
  formData.append('description', productDescription);
  formData.append('service', productService);
  formData.append('image', {
    uri: productImage.uri,
    type: productImage.type,
    name: productImage.fileName || 'product.jpg',
  });

  try {
    const response = await fetch('http://10.0.2.2:5000/api/products/addProduct', {
      // const response = await fetch('http://192.168.176.91:5000/api/products/addProduct', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Ensure proper format
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      // Alert.alert('Success', data.message);
      navigation.navigate('Homes');
    } else {
      const errorData = await response.json();
      console.error('Server Error:', errorData);
      Alert.alert('Error', errorData.message || 'Error adding product!');
    }
  } catch (error) {
    console.error('Network Error:', error);
    Alert.alert('Error', 'Failed to add product. Please check your network connection.');
  }
};

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.input}
      />
      <TextInput
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Product Description"
        value={productDescription}
        onChangeText={setProductDescription}
        style={styles.input}
      />

      <DropDownPicker
        open={open}
        value={productService}
        items={services}
        setOpen={setOpen}
        setValue={setProductService}
        setItems={setServices}
        placeholder="Select a Service"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <Button title="Pick an Image" onPress={pickImage} />
      {productImage && <Image source={{ uri: productImage.uri }} style={styles.imagePreview} />}

      <Button title="Add Product" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default AddProduct;
