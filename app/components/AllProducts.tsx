import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import products from '../../data/products.json';
import { productImages } from '../../data/imageMap';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const imageSize = width / 3 - 20;

type AllProductsProps = {
  category?: string;
};

const AllProducts = ({ category }: AllProductsProps) => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filtered = category
    ? products.filter((item) => item.category === category)
    : products;

  // Create one fadeAnim per product (prevents flickering)
  const fadeAnims = useRef(filtered.map(() => new Animated.Value(0))).current;

  const handlePress = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {category ? category.toUpperCase() : 'ALL PRODUCTS'}
      </Text>

      <View style={styles.grid}>
        {filtered.map((item, index) => {
          const imageSource = productImages[item.images[0]];
          const fadeAnim = fadeAnims[index];

          const handleHoverIn = () => {
            setHoveredIndex(index);
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }).start();
          };

          const handleHoverOut = () => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start(() => setHoveredIndex(null));
          };

          return (
            <Pressable
              key={item.id}
              onPress={() => handlePress(item.id)}
              onHoverIn={handleHoverIn}
              onHoverOut={handleHoverOut}
              style={styles.imageWrapper}
            >
              <Image source={imageSource} style={styles.image} resizeMode="cover" />

              <Animated.View style={[styles.fadeOverlay, { opacity: fadeAnim }]}>
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.name}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default AllProducts;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingBottom: 60,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Canela',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 2,
    color: 'rgb(139,139,139)',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    rowGap: 20,
    columnGap: 10,
  },
  imageWrapper: {
    width: imageSize,
    height: imageSize,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fadeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'flex-end',
  },
  overlayTextContainer: {
    padding: 8,
  },
  name: {
    fontSize: 13,
    fontWeight: '300',
    color: 'black',
    letterSpacing: 2,
  },
  price: {
    fontSize: 12,
    marginTop: 9,
    color: 'rgb(139,139,139)',
  },
});
