// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

// const ServicesPage = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

    

//     const fetchProducts = async (serviceType) => {
//         try {
//             const response = await fetch(`http://10.0.2.2:5000/api/products?service=${serviceType}`); // Fetch specific service
//             if (response.ok) {
//                 const data = await response.json();
//                 setProducts(data);
//             } else {
//                 console.error('Failed to fetch products');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     // Call fetchProducts with the specific service type
//     useEffect(() => {
//         fetchProducts('repair'); // Fetch only "repair" products
//     }, []);
    

//     const renderProduct = ({ item }) => (
//         <View style={styles.productCard}>
//             <Image source={{ uri: `http://10.0.2.2:5000/${item.image}` }} style={styles.image} />
//             <View style={styles.details}>
//                 <Text style={styles.name}>{item.name}</Text>
//                 <Text style={styles.price}>${item.price}</Text>
//                 <Text style={styles.description}>{item.description}</Text>
//                 <Text style={styles.service}>Service: {item.service}</Text>
//             </View>
//         </View>
//     );

//     if (loading) {
//         return (
//             <View style={styles.loader}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     return (
//         <FlatList
//             data={products}
//             renderItem={renderProduct}
//             keyExtractor={(item) => item._id.toString()}
//             contentContainerStyle={styles.list}
//         />
//     );
// };

// const styles = StyleSheet.create({
//     loader: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     list: {
//         padding: 10,
//     },
//     productCard: {
//         flexDirection: 'row',
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         marginBottom: 10,
//         backgroundColor: '#fff',
//     },
//     image: {
//         width: 100,
//         height: 100,
//         borderRadius: 5,
//     },
//     details: {
//         flex: 1,
//         marginLeft: 10,
//         justifyContent: 'center',
//     },
//     name: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     price: {
//         fontSize: 14,
//         color: '#666',
//         marginVertical: 5,
//     },
//     description: {
//         fontSize: 12,
//         color: '#888',
//     },
//     service: {
//         fontSize: 12,
//         fontStyle: 'italic',
//         color: '#444',
//     },
// });

// export default ServicesPage;
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ServiceProductList = ({ serviceType }) => {
    const navigation = useNavigation(); // Used for navigation
    const [products, setProducts] = useState([]); // State to store fetched products
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state for handling API errors

    // Fetch products when serviceType changes
    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:5000/api/products/${serviceType}`); // API request
            // const response = await fetch(`http://192.168.176.91:5000/api/products/${serviceType}`); // API request
            if (response.ok) {
                const data = await response.json();
                setProducts(data); // Set products if request is successful
            } else {
                setError('Failed to fetch products');
            }
        } catch (error) {
            setError('Error fetching products');
        } finally {
            setLoading(false); // Set loading to false once the request is complete
        }
    };

    // Effect hook that runs whenever serviceType changes
    useEffect(() => {
        fetchProducts();
    }, [serviceType]);

    // If still loading, show a spinner
    if (loading) {
        return <ActivityIndicator size="large" color="#D32F2F" style={styles.loader} />;
    }

    // If error occurs, show error message
    if (error) {
        return <Text style={styles.errorMessage}>{error}</Text>;
    }

    // If no products found, display a message
    if (!products.length) {
        return <Text style={styles.noData}>No products found for {serviceType}</Text>;
    }

    // Render the list of products
    return (
        <FlatList
            data={products} // Data to be displayed in the list
            keyExtractor={(item) => item._id} // Unique key for each item
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Productdetails', { product: item })} // Navigate on press
                >
                    <View style={styles.productCard}>
                        <Image
                            source={{ uri: item.image || 'https://via.placeholder.com/150' }} // Default image if no image URL
                            style={styles.productImage}
                        />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>Price: ${item.price}</Text>
                        <Text style={styles.productDescription}>{item.description}</Text>
                        <Text style={styles.productService}>Service: {item.service}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

// Styles for the component
const styles = StyleSheet.create({
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' }, // Centered loader
    errorMessage: { textAlign: 'center', color: 'red', marginTop: 20, fontSize: 16 }, // Error message styling
    noData: { textAlign: 'center', marginTop: 20, fontSize: 18, color: '#555' }, // No data message styling
    productCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        color: '#D32F2F',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    productService: {
        fontSize: 14,
        color: '#777',
    },
});

export default ServiceProductList;
