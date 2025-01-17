


import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';


const Servicetab = ({ navigation }) => {

  const servicesData = [
    {
      id: '1',
      title: 'Content Creator',
      image: require('../image/contentmarkting.jpg'),
      navigateTo: 'Content',
    },
    {
      id: '2',
      title: 'Channel Manager',
      image: require('../image/channelmanager.jpg'),
      navigateTo: 'Channel',
    },
    {
      id: '3',
      title: 'Scriptwriter',
      image: require('../image/scriptwriting.jpg'),
      navigateTo: 'Script',
    },
    {
      id: '4',
      title: 'SEO Specialist',
      image: require('../image/seospecilist.jpg'),
      navigateTo: 'Seo',
    },
    {
      id: '5',
      title: 'Thumbnail Designer',
      image: require('../image/thumbnail.jpg'),
      navigateTo: 'Thumbnail',
    },
    {
      id: '6',
      title: 'Analytics Specialist',
      image: require('../image/AnalyticsSpecialist.jpg'),
      navigateTo: 'Analytics',
    },
    {
      id: '7',
      title: 'YouTube Advertiser',
      image: require('../image/YouTubeAdvertiser.jpg'),
      navigateTo: 'Advertiser',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.servicebox}>
      {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
      <Image source={ item.image } style={styles.image} />
      <Text
        style={styles.textbox}
        onPress={() => navigation.navigate(item.navigateTo)}
      >
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Services</Text>

      <FlatList
        data={servicesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default Servicetab;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Light gray for modern and clean background
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A3A3A', // Dark gray for a neutral header
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  servicebox: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#FFFFFF', // White background for service box
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000', // Subtle black shadow for depth
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EAEAEA', // Light gray border for image
  },
  textbox: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#3A3A3A', // Dark gray for text
    marginBottom: 5,
  },
});
