import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductProvider } from '@/context/ProductContext';
import { HomeScreen, ProductDetailScreen } from '@/screens';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient();

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ title: 'Ürünler' }}
              />
              <Stack.Screen 
                name="Detail" 
                component={ProductDetailScreen} 
                options={{ title: 'Ürün Detayı' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ProductProvider>
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
