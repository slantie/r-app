import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface InfoFieldProps {
    label: string;
    value: string | number | undefined | null | object | boolean | any;
    containerStyle?: object;
}

 const InfoField = ({ label, value, containerStyle }: InfoFieldProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value || '-'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        flex:1,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
});

export default InfoField;