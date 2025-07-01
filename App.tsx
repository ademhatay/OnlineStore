import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductProvider } from '@/context/ProductContext';
import { HomeScreen, ProductDetailScreen, FavoritesScreen } from '@/screens';
import { RootStackParamList, TabParamList } from '@/types/Navigation';
import { ErrorBoundary } from '@/components/global';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e9ecef',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{ 
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🏠</Text>,
          headerTitle: 'Ürünler'
        }}
      />
      <Tab.Screen 
        name="FavoritesTab" 
        component={FavoritesScreen}
        options={({ }) => ({
          title: 'Favoriler',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>❤️</Text>,
          headerTitle: 'Favorilerim',
          tabBarBadge: undefined, // Burayı context'ten alacağız
        })}
      />
    </Tab.Navigator>
  );
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
                name="Main" 
                component={TabNavigator} 
                options={{ headerShown: false }}
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
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
