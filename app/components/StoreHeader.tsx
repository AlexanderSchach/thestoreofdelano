import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import NavLink from './NavLink'; // make sure this path matches your folder
import { Link } from 'expo-router';
import { useCart } from '../context/CartContext';

const StoreHeader = () => {

  const { getItemCount } = useCart();

  return (
    <View style={styles.headerContainer}>
      {/* Logo + Cart Row */}
      <View style={styles.logoRow}>
        <View /> {/* Empty spacer */}
        <Link href="/">
  <Image
    source={require('../../assets/images/image.png')}
    style={styles.logo}
    resizeMode="contain"
  />
</Link>

        <TouchableOpacity style={styles.cartContainer}>
          <Link href="/cart">
            <Text style={styles.cartText}>CART ({getItemCount()})</Text>
          </Link>
        </TouchableOpacity>
      </View>

      {/* Navigation */}
      <View style={styles.navContainer}>
        <View style={styles.navMainButtons}>
          <NavLink href="/allproducts" label="ALL PRODUCT" />
          <NavLink href="/jewelry" label="JEWELRY" />
          <NavLink href="/apparel" label="APPAREL" />
          <NavLink href="/objects" label="OBJECTS" />
          <NavLink href="/fragrance" label="FRAGRANCE" />
        </View>
        <NavLink href="/" label="HOME" isHome />
      </View>
    </View>
  );
};

export default StoreHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 280,
    marginBottom: 40,
  },
  cartContainer: {
    position: 'absolute',
    left: '90%',
  },
  cartText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 28,
    paddingBottom: 10,
  },
  navMainButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '4.5%',
  },
});
