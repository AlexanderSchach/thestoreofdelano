import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavLink from './NavLink';
import { Link, useRouter } from 'expo-router';
import { useCart } from '../context/CartContext'; // ✅ import cart context

const StoreHeader = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter(); // ✅ for navigation
  const { getItemCount } = useCart(); // ✅ get item count
  const itemCount = getItemCount();

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = Dimensions.get('window').width;
      setIsMobile(screenWidth < 768);
    };

    updateLayout();
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

  return (
    <View style={styles.headerContainer}>
      {/* Logo + Hamburger + Cart Row */}
      <View style={styles.logoRow}>
        {isMobile && (
          <Pressable onPress={() => setMenuOpen(!menuOpen)} style={styles.hamburger}>
            <Ionicons name="menu" size={28} color="black" />
          </Pressable>
        )}
        <Link href="/">
          <Image
            source={require('../../assets/images/image.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Link>

        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() => router.push('/cart')} // ✅ navigate to cart
        >
          <Text style={styles.cartText}>CART ({itemCount})</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation */}
      {isMobile ? (
        menuOpen && (
          <View style={styles.mobileMenu}>
            <NavLink href="/allproducts" label="ALL PRODUCT" />
            <NavLink href="/jewelry" label="JEWELRY" />
            <NavLink href="/apparel" label="APPAREL" />
            <NavLink href="/objects" label="OBJECTS" />
            <NavLink href="/fragrance" label="FRAGRANCE" />
            <NavLink href="/" label="HOME" isHome />
          </View>
        )
      ) : (
        <View style={styles.navContainer}>
            <View style={styles.navMainButtons}>
              <NavLink href="/allproducts" label="ALL PRODUCT" />
              <NavLink href="/jewelry" label="JEWELRY" />
              <NavLink href="/apparel" label="APPAREL" />
              <NavLink href="/objects" label="OBJECTS" />
              <NavLink href="/fragrance" label="FRAGRANCE" />
            </View>
          <View style={styles.homeAndSearch}>
            <NavLink href="/" label="HOME" isHome />
            <Pressable onPress={() => router.push('/search')}>
              <Ionicons name="search" size={24} color="#D8B74F" style={styles.searchIcon} />
            </Pressable>
          </View>
        </View>
      )}
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
    position: 'relative',
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
  hamburger: {
    position: 'absolute',
    left: '5%',
    padding: 10,
    zIndex: 10,
  },
  mobileMenu: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 12,
  },
  searchIcon: {
    marginEnd: 70,
  },
  homeAndSearch: {
    flexDirection: 'row',
  }
});
