import React from 'react';
import { View, Text } from 'react-native';
import ServiceProductList from './Service';

const InstallationPage = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
                Installation Products
            </Text>
            <ServiceProductList serviceType="installation" />
        </View>
    );
};

export default InstallationPage;
