import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import StoreHeader from './components/StoreHeader';
import Footer from './components/Footer';
import { useCart } from './context/CartContext';
import { productImages } from '../data/imageMap';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <StoreHeader />

      <View style={styles.container}>
        <Text style={styles.heading}>Shopping Cart</Text>

        {cart.length === 0 ? (
          <Text style={styles.emptyText}>
            You have nothing in your shopping cart.
          </Text>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              {/* Left: image and title */}
              <View style={styles.leftSection}>
                <Image
                  source={productImages[item.images?.[0] || '']}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
                <Text style={styles.title}>{item.title}</Text>
              </View>

              {/* Center: quantity controls */}
              <View style={styles.centerSection}>
                <Pressable onPress={() => decreaseQuantity(item.id)}>
                  <Text style={styles.adjustBtn}>-</Text>
                </Pressable>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Pressable onPress={() => addToCart(item)}>
                  <Text style={styles.adjustBtn}>+</Text>
                </Pressable>
              </View>

              {/* Right: total + remove */}
              <View style={styles.rightSection}>
                <Text style={styles.total}>
                  ${item.price * item.quantity}
                </Text>
                <Pressable onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.remove}>×</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
        {cart.length > 0 && (
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>
                ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                </Text>
            </View>
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    paddingTop: 40,
  },
  heading: {
    fontSize: 26,
    fontFamily: 'Canela',
    marginBottom: 30,
    letterSpacing: 2,
    color: 'rgb(139,139,139)',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 10,
    gap: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    gap: 10,
  },
  thumbnail: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
    color: 'rgb(139,139,139)',
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 8,
  },
  adjustBtn: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
    color: 'rgb(139,139,139)',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgb(139,139,139)',
  },
  rightSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgb(139,139,139)',
  },
  remove: {
    fontSize: 20,
    color: '#999',
    marginTop: 2,
    paddingLeft: 50,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: '23%',
    color: 'rgb(139,139,139)',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgb(139,139,139)',
  },
  
});
