import React from 'react';
import { ScrollView } from 'react-native';
import StoreHeader from './components/StoreHeader';
import LandingBody from './components/LandingBody';
import Footer from './components/Footer';
import FeaturedProducts from './components/FeaturedProducts';

export default function HomePage() {

  //The images in featured images can be changed here
  const featuredImages = [
    require('../assets/images/picture6.jpg'),
    require('../assets/images/picture.jpg'),
    require('../assets/images/picture2.jpg'),
    require('../assets/images/picture3.jpg'),
    require('../assets/images/picture4.jpg'),
    require('../assets/images/picture5.jpg'),
  ];

  return (
    <ScrollView>
      <StoreHeader />
      <LandingBody />
      <FeaturedProducts images={featuredImages} />
      <Footer />
    </ScrollView>
  );
}
