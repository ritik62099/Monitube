import React from 'react';
import { View, Text } from 'react-native';
import ServiceProductList from './Service';

const Seo = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
                Seo Specialist
            </Text>
            <ServiceProductList serviceType="seo" />
        </View>
    );
};

export default Seo;