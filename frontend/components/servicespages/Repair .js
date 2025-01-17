import React from 'react';
import { View, Text } from 'react-native';
import ServiceProductList from './Service';

const RepairPage = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
                Repair Products
            </Text>
            <ServiceProductList serviceType="repair" />
        </View>
    );
};

export default RepairPage;
