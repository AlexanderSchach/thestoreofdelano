import React from 'react';
import { ScrollView } from 'react-native';
import StoreHeader from './components/StoreHeader';
import AllProducts from './components/AllProducts';
import Footer from './components/Footer';

export default function ObjectsPage() {
  return (
    <ScrollView>
      <StoreHeader />
      <AllProducts category="objects" />
      <Footer />
    </ScrollView>
  );
}
