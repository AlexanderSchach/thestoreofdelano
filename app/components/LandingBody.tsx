import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const LandingBody = () => {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // The images in the landing body Carousel can be changed here
  const images = [
    require('../../assets/images/landingImage.jpg'),
    require('../../assets/images/picture.jpg'),
    require('../../assets/images/picture2.jpg'),
  ];

  const handlePress = () => {
    router.push('/allproducts');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      flatListRef.current?.scrollToOffset({
        offset: width * ((currentIndex + 1) % images.length),
        animated: true,
      });

      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={handlePress}
            style={({ hovered }) => [
              styles.imageWrapper,
              hovered && styles.imageHovered,
            ]}
          >
            <Image source={item} style={styles.image} resizeMode="cover" />
          </Pressable>
        )}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      />
    </View>
  );
};

export default LandingBody;

const styles = StyleSheet.create({
  container: {
  },
  imageWrapper: {
    width: width,
    height: width * 0.6,
  },
  imageHovered: {
    opacity: 0.85, // 👈 Lighten effect on hover
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
