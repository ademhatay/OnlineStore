import React, { FC } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useProducts } from '@/context/ProductContext';
import { RootStackScreenProps } from '@/types/Navigation';
import globalStyles from '@/styles';

type ProductDetailScreenProps = RootStackScreenProps<'Detail'>;

const ProductDetailScreen: FC<ProductDetailScreenProps> = ({ navigation }) => {
    const { selectedProduct, clearSelectedProduct, addToFavorites, removeFromFavorites, isFavorite } = useProducts();

    const handleGoBack = () => {
        clearSelectedProduct();
        navigation.goBack();
    };

    const handleFavoritePress = () => {
        if (!selectedProduct) return;
        
        if (isFavorite(selectedProduct.id)) {
            removeFromFavorites(selectedProduct.id);
        } else {
            addToFavorites(selectedProduct);
        }
    };

    if (!selectedProduct) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Ürün yükleniyor...</Text>
            </View>
        );
    }

    const isProductFavorite = isFavorite(selectedProduct.id);

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedProduct.image }} style={styles.image} />
                    <TouchableOpacity 
                        style={styles.favoriteButton}
                        onPress={handleFavoritePress}
                    >
                        <Text style={styles.favoriteIcon}>
                            {isProductFavorite ? '❤️' : '🤍'}
                        </Text>
                    </TouchableOpacity>
                </View>
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
                    
                    <TouchableOpacity 
                        style={[styles.actionButton, isProductFavorite ? styles.removeButton : styles.addButton]}
                        onPress={handleFavoritePress}
                    >
                        <Text style={styles.actionButtonText}>
                            {isProductFavorite ? '❤️ Favorilerden Çıkar' : '🤍 Favorilere Ekle'}
                        </Text>
                    </TouchableOpacity>
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
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        backgroundColor: 'white',
    },
    favoriteButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    favoriteIcon: {
        fontSize: 24,
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
        marginBottom: 20,
    },
    actionButton: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    addButton: {
        backgroundColor: '#007bff',
    },
    removeButton: {
        backgroundColor: '#dc3545',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ProductDetailScreen;
