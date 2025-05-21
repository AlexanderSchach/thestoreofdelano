import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const imageSize = width / 3 - 20;

type FeaturedProductsProps = {
  images?: any[]; // can be static require() imports
};

const FeaturedProducts = ({ images }: FeaturedProductsProps) => {
  const router = useRouter();

  const defaultImages = Array(6).fill(
    require('../../assets/images/landingImage.jpg')
  );

  const displayedImages = images?.length ? images : defaultImages;

  const handlePress = () => {
    router.push('/allproducts');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured</Text>

      <View style={styles.grid}>
        {displayedImages.map((img, index) => (
          <Pressable key={index} onPress={handlePress} style={styles.imageWrapper}>
            <Image source={img} style={styles.image} resizeMode="cover" />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default FeaturedProducts;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Canela',
    textAlign: 'center',
    marginBottom: 35,
    letterSpacing: 2,
    color: 'rgb(139,139,139)',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    rowGap: 10,
    columnGap: 10,
  },
  imageWrapper: {
    width: imageSize,
    height: imageSize,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
