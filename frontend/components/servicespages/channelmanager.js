import React from 'react';
import { View, Text } from 'react-native';
import ServiceProductList from './Service';

const Channel = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
                Channel Manager
            </Text>
            <ServiceProductList serviceType="channel" />
        </View>
    );
};

export default Channel;