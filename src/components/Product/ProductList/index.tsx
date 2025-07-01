import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { Product } from '@/types/Product';
import ProductItem from '../ProductItem';

interface ProductListProps {
    products: Product[];
    onProductPress: (product: Product) => void;
}

const ProductList: FC<ProductListProps> = ({ products, onProductPress }) => {
    return (
        <FlashList
            data={products}
            renderItem={({ item, index }) => (
                <ProductItem 
                    item={item} 
                    index={index}
                    onPress={onProductPress}
                />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            estimatedItemSize={220}
            contentContainerStyle={styles.listContent}
        />
    );
};

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 10,
        paddingTop: 10,
    }
});

export default ProductList;
