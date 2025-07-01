import { Product } from '@/types/Product';
import React, { FC } from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity, View, Image } from 'react-native';
import { useProducts } from '@/context/ProductContext';

interface ProductItemProps {
    item: Product;
    index: number;
    onPress: (product: Product) => void;
}

const screenWidth = Dimensions.get('window').width;
const gap = 12;
const horizontalPadding = 20;
const itemWidth = (screenWidth - horizontalPadding - gap) / 2;

const ProductItem: FC<ProductItemProps> = ({ item, index, onPress }) => {
    const { addToFavorites, removeFromFavorites, isFavorite } = useProducts();
    const isLeftColumn = index % 2 === 0;
    const isItemFavorite = isFavorite(item.id);

    const handlePressItem = () => {
        onPress(item);
    };

    const handleFavoritePress = () => {
        if (isItemFavorite) {
            removeFromFavorites(item.id);
        } else {
            addToFavorites(item);
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePressItem}
            style={[
                styles.container,
                isLeftColumn ? styles.leftColumn : styles.rightColumn
            ]}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={handleFavoritePress}
                >
                    <Text style={styles.favoriteIcon}>
                        {isItemFavorite ? '❤️' : '🤍'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.price}>
                    ${item?.price?.toFixed(2)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: itemWidth,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: gap,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    leftColumn: {
        marginRight: gap / 2,
    },
    rightColumn: {
        marginLeft: gap / 2,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 140,
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    favoriteIcon: {
        fontSize: 16,
    },
    infoContainer: {
        padding: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        height: 34,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
        marginTop: 8,
    }
});

export default ProductItem;
