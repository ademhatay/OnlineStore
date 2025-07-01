import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '@/types/Product';

const fetchProducts = async (): Promise<Product[]> => {
    try {
        const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products');
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error('Failed to fetch products');
    }
};

export const useProducts = () => {
    return useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
};
