import React from 'react';
import { View, Text } from 'react-native';
import ServiceProductList from './Service';

const Script = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
                Script Writer
            </Text>
            <ServiceProductList serviceType="script" />
        </View>
    );
};

export default Script;