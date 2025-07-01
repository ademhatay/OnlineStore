import { Product } from '@/types/Product';
import React, { FC } from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity, View, Image } from 'react-native';

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
    const isLeftColumn = index % 2 === 0;

    const handlePressItem = () => {
        onPress(item);
    };

    return (
        <TouchableOpacity
            onPress={handlePressItem}
            style={[
                styles.container,
                isLeftColumn ? styles.leftColumn : styles.rightColumn
            ]}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="contain"
            />
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
    image: {
        width: '100%',
        height: 140,
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
