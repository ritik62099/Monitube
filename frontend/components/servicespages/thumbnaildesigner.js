import React from 'react';
import { View, Text } from 'react-native';
import ServiceProductList from './Service';

const Thumbnail = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
                Thumbnail Designer
            </Text>
            <ServiceProductList serviceType="thumbnail" />
        </View>
    );
};

export default Thumbnail;