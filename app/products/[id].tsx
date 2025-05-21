import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Animated,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import products from '../../data/products.json';
import { productImages } from '../../data/imageMap';
import StoreHeader from '../components/StoreHeader';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isHovered, setIsHovered] = useState(false);
  const textColorAnim = useRef(new Animated.Value(0)).current; // 0 for black, 1 for white
  const [buttonText, setButtonText] = useState('ADD TO CART');

  const { addToCart } = useCart();

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const handleThumbnailPress = (index: number) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedImageIndex(index);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleHoverIn = () => {
    setIsHovered(true);
    Animated.timing(textColorAnim, {
      toValue: 1, // White
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    Animated.timing(textColorAnim, {
      toValue: 0, // Black
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ScrollView>
      <StoreHeader />

      <View style={styles.content}>
        {/* Image section */}
        <View style={styles.imageColumn}>
          <Animated.Image
            source={productImages[product.images[selectedImageIndex]]}
            style={[styles.mainImage, { opacity: fadeAnim }]}
            resizeMode="cover"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailRow}
          >
            {product.images.map((img, index) => (
              <Pressable key={index} onPress={() => handleThumbnailPress(index)}>
                <Animated.Image
                  source={productImages[img]}
                  style={[
                    styles.thumbnail,
                    selectedImageIndex === index && styles.activeThumbnail,
                  ]}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Info section */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>

          <Pressable
            style={[
              styles.cartButton,
              isHovered && styles.cartButtonHovered, // Apply hover style
            ]}
            onHoverIn={handleHoverIn}
            onHoverOut={handleHoverOut}
            onPress={() => {
              setButtonText('ADDING...');
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                images: product.images,
              });
            
              setTimeout(() => {
                setButtonText('ADDED!');
                setTimeout(() => {
                  setButtonText('ADD TO CART');
                }, 1500); // Show "ADDED!" for 1 second
              }, 600); // Simulate adding time
            }}
          >
          <Animated.Text
            style={[
              styles.cartButtonText,
              {
              color: textColorAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['black', 'white'],
              }),
            },
            ]}
          >
    {buttonText}
        </Animated.Text>

          </Pressable>
            <Text style={styles.description}>{product.description}</Text>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 40,
    gap: 20,
    backgroundColor: 'white',
    flexWrap: 'wrap',
  },
  imageColumn: {
    width: width / 2 - 30,
    gap: 10,
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 12,
  },
  thumbnailRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
    opacity: 0.6,
  },
  activeThumbnail: {
    opacity: 1,
    borderColor: 'black',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    maxWidth: width / 2,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Canela',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    color: 'rgb(139,139,139)',
  },
  description: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgb(139,139,139)',
  },
  cartButton: {
    width: '30%',
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderWidth: 2,
  },
  cartButtonHovered: {
    backgroundColor: 'black', // Black background on hover
  },
  cartButtonText: {
    fontWeight: '400',
    textAlign: 'center',
  },
});
