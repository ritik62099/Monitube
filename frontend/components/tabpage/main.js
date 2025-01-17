


import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';



const Main = ({ navigation }) => {
    const servicesData = [
        { id: '1', title: 'Content Creator', image: require('../image/contentmarkting.jpg'), navigateTo: 'Content' },
        { id: '2', title: 'Channel Manager', image: require('../image/channelmanager.jpg'), navigateTo: 'Channel' },
        { id: '3', title: 'Scriptwriter', image: require('../image/scriptwriting.jpg'), navigateTo: 'Script' },
        { id: '4', title: 'SEO Specialist', image: require('../image/seospecilist.jpg'), navigateTo: 'Seo' },
    ];

    const images = [
        require('../image/banner2.jpg'),
        require('../image/banner3.jpg'),
        require('../image/banner4.jpg'),
      ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.serviceBox} onPress={() => navigation.navigate(item.navigateTo)}>
            <Image source={item.image } style={styles.serviceImage} />
            <Text style={styles.serviceText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Monitube</Text>
               
            </View>

            {/* Swiper Section */}
            <View style={styles.swiperContainer}>
                <Swiper autoplay={true} autoplayTimeout={3} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
                    
                     {images.map((image, index) => (
          <Image key={index} source={image} style={styles.swiperImage} />
        ))}
                </Swiper>
            </View>

            {/* Services Section */}
            <View style={styles.servicesContainer}>
                <Text style={styles.servicesHeader}>Our Services</Text>
                <FlatList
                    data={servicesData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.servicesRow}
                    ListFooterComponent={() => (
                        <Text style={styles.seeMoreText} onPress={() => navigation.navigate('Services')}>
                            See More
                        </Text>
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default Main;


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7', // Off-white for a clean and modern look
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#6A5ACD', // Slate Blue for header background
        borderBottomWidth: 1,
        borderBottomColor: '#9370DB', // Medium Purple for subtle bottom border
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text for contrast and readability
    },
    
    
    
    cartText: {
        fontSize: 16,
        color: '#A9A9A9', // Soft gray for cart link
    },
    swiperContainer: {
        height: 220,
        marginVertical: 10,
    },
    swiperImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    dot: {
        backgroundColor: '#C4C4C4', // Soft gray for inactive dots
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    activeDot: {
        backgroundColor: '#3A3A3A', // Dark gray for active dots
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    servicesContainer: {
        paddingHorizontal: 15,
        marginTop: 15,
    },
    servicesHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3A3A3A', // Dark gray for header text
        marginBottom: 15,
    },
    servicesRow: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    serviceBox: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // White for service cards
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    serviceImage: {
        width: 140,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EAEAEA', // Subtle border for images
    },
    serviceText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3A3A3A', // Dark gray for service text
    },
    seeMoreText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#3A3A3A', // Dark gray for "See More"
        marginTop: 20,
        textDecorationLine: 'underline',
    },
});
