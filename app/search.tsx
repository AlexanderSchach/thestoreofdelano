import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import StoreHeader from './components/StoreHeader';
import Footer from './components/Footer';
import products from '../data/products.json';
import { useRouter } from 'expo-router';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StoreHeader />

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search for products..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => router.push(`/products/${item.id}`)}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.noResults}>No results found.</Text>}
      />

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  searchBox: {
    marginVertical: 20,
  },
  input: {
    padding: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 16,
  },
  itemContainer: {
    paddingVertical: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 30,
    color: 'gray',
  },
});