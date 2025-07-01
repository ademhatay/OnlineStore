import React, { FC } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useProducts } from '@/context/ProductContext';
import { ProductList } from '@/components/Product';
import { Product } from '@/types/Product';
import { TabScreenProps } from '@/types/Navigation';
import globalStyles from '@/styles';

type FavoritesScreenProps = TabScreenProps<'FavoritesTab'>;

const FavoritesScreen: FC<FavoritesScreenProps> = ({ navigation }) => {
    const { favorites, selectProduct } = useProducts();

    const handleProductPress = (product: Product) => {
        selectProduct(product);
        navigation.navigate('Detail');
    };

    if (favorites.length === 0) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>💔</Text>
                    <Text style={styles.emptyTitle}>Henüz favori ürün yok</Text>
                    <Text style={styles.emptyDescription}>
                        Beğendiğiniz ürünleri favorilere ekleyerek buradan kolayca erişebilirsiniz.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Favorilerim ({favorites.length})</Text>
            </View>
            <ProductList 
                products={favorites}
                onProductPress={handleProductPress} 
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    emptyDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    }
});

export default FavoritesScreen; 