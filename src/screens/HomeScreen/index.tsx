import React, { FC } from 'react';
import { SafeAreaView, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useProducts } from '@/context/ProductContext';
import { ProductList } from '@/components/Product';
import { Product } from '@/types/Product';
import globalStyles from '@/styles';

interface HomeScreenProps {
    navigation: any;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
    const { products, isLoading, isError, selectProduct } = useProducts();

    const handleProductPress = (product: Product) => {
        selectProduct(product);
        navigation.navigate('Detail');
    };

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Ürünler yükleniyor...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Ürünler yüklenirken bir hata oluştu.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <ProductList 
                products={products}
                onProductPress={handleProductPress} 
            />
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
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    }
});

export default HomeScreen;
