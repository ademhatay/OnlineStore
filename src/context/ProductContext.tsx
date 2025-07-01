import React, { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@/types/Product';
import { fetchProducts } from '@/services/api';

interface ProductContextType {
    products: Product[];
    selectedProduct: Product | null;
    favorites: Product[];
    isLoading: boolean;
    isError: boolean;
    selectProduct: (product: Product) => void;
    clearSelectedProduct: () => void;
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = '@favorites';

export const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [favorites, setFavorites] = useState<Product[]>([]);

    const { data: products = [], isLoading, isError } = useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    // Favorileri AsyncStorage'dan yükle
    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error('Favoriler yüklenirken hata oluştu:', error);
        }
    };

    const saveFavorites = async (favoritesToSave: Product[]) => {
        try {
            await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesToSave));
        } catch (error) {
            console.error('Favoriler kaydedilirken hata oluştu:', error);
        }
    };

    const selectProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    const clearSelectedProduct = () => {
        setSelectedProduct(null);
    };

    const addToFavorites = async (product: Product) => {
        const newFavorites = [...favorites, product];
        setFavorites(newFavorites);
        await saveFavorites(newFavorites);
    };

    const removeFromFavorites = async (productId: number) => {
        const newFavorites = favorites.filter(fav => fav.id !== productId);
        setFavorites(newFavorites);
        await saveFavorites(newFavorites);
    };

    const isFavorite = (productId: number): boolean => {
        return favorites.some(fav => fav.id === productId);
    };

    const value = {
        products,
        selectedProduct,
        favorites,
        isLoading,
        isError,
        selectProduct,
        clearSelectedProduct,
        addToFavorites,
        removeFromFavorites,
        isFavorite
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
