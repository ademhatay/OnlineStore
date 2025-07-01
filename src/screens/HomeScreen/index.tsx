import { ProductList } from '@/components/Product';
import { useProducts } from '@/services/api';
import globalStyles from '@/styles';
import React, { FC } from 'react';
import { SafeAreaView, View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const HomeScreen: FC = () => {
    const { data: products, isLoading, isError, error } = useProducts();

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }
    if (isError) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <ProductList products={products || []} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    }
});

export default HomeScreen;
