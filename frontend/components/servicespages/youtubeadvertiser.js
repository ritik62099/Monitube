import React from 'react';
import { View, Text } from 'react-native';
import ServiceProductList from './Service';

const Advertiser = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
                Youtube Advertiser
            </Text>
            <ServiceProductList serviceType="advertiser" />
        </View>
    );
};

export default Advertiser;