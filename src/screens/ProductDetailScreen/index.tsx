import React, { FC } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useProducts } from '@/context/ProductContext';
import globalStyles from '@/styles';

interface ProductDetailScreenProps {
    navigation: any;
}

const ProductDetailScreen: FC<ProductDetailScreenProps> = ({ navigation }) => {
    const { selectedProduct, clearSelectedProduct } = useProducts();

    const handleGoBack = () => {
        clearSelectedProduct();
        navigation.goBack();
    };

    if (!selectedProduct) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Ürün yükleniyor...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: selectedProduct.image }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{selectedProduct.title}</Text>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>{selectedProduct.category}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>
                            ⭐ {selectedProduct.rating.rate} ({selectedProduct.rating.count} değerlendirme)
                        </Text>
                    </View>
                    <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                    <Text style={styles.description}>{selectedProduct.description}</Text>
                </View>
            </ScrollView>
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
    scrollContainer: {
        paddingBottom: 20,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        backgroundColor: 'white',
    },
    infoContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    categoryContainer: {
        marginBottom: 10,
    },
    category: {
        fontSize: 14,
        color: '#007bff',
        backgroundColor: '#e7f3ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        textTransform: 'capitalize',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: 15,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    rating: {
        fontSize: 16,
        color: '#666',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
    }
});

export default ProductDetailScreen;
