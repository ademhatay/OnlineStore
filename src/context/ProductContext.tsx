
import React, { createContext, useContext, useState, FC, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/Product';
import { fetchProducts } from '@/services/api';

interface ProductContextType {
    products: Product[];
    selectedProduct: Product | null;
    isLoading: boolean;
    isError: boolean;
    selectProduct: (product: Product) => void;
    clearSelectedProduct: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { data: products = [], isLoading, isError } = useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    const selectProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    const clearSelectedProduct = () => {
        setSelectedProduct(null);
    }

    const value = {
        products,
        selectedProduct,
        isLoading,
        isError,
        selectProduct,
        clearSelectedProduct
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
