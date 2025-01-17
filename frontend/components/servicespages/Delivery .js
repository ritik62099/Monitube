import React from 'react';
import { View, Text } from 'react-native';
import ServiceProductList from './Service';

const DeliveryPage = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
                Delivery Products
            </Text>
            <ServiceProductList serviceType="delivery" />
        </View>
    );
};

export default DeliveryPage;


// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

// const DeliveryPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('http://10.0.2.2:5000/api/products/service/delivery');
//       if (response.ok) {
//         const data = await response.json();
//         setProducts(data);
//       } else {
//         const errorData = await response.json();
//         console.error('Error fetching products:', errorData);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderProduct = ({ item }) => (
//     <View style={styles.productCard}>
//       <Image source={{ uri: item.image }} style={styles.productImage} />
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productDescription}>{item.description}</Text>
//       <Text style={styles.productPrice}>Price: ${item.price}</Text>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item._id}
//         renderItem={renderProduct}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   productCard: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   productImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   productDescription: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   productPrice: {
//     fontSize: 16,
//     color: '#000',
//     marginTop: 10,
//   },
// });

// export default DeliveryPage;
