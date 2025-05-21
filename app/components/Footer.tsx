import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const Footer = () => {
  return (
    <View style={styles.container}>
      {/* Newsletter Signup */}
      <Text style={styles.heading}>JOIN THE HUNT</Text>
      <Text style={styles.subheading}>
        SIGN UP TO RECEIVE EXCLUSIVE OFFERS AND{'\n'}HEAR ABOUT OUR LATEST ARRIVALS
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>JOIN</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.privacy}>We respect your privacy</Text>

      {/* Footer Links */}
      <View style={styles.linksRow}>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Info</Text>
          <Text style={styles.link}>Ring Size Chart</Text>
          <Text style={styles.link}>Contact</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.columnTitle}>Orders</Text>
          <Text style={styles.link}>Shipping Info</Text>
          <Text style={styles.link}>Return Policy</Text>
          <Text style={styles.link}>Terms & Conditions</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.columnTitle}>Locations</Text>
          <Text style={styles.link}>Stores</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.columnTitle}>Social</Text>
          <Text style={styles.link}>Instagram</Text>
          <Text style={styles.link}>Facebook</Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 85,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 30,
    fontWeight: '500',
    fontFamily: 'Canela',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
  },
  subheading: {
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 35
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    width: width * 0.2,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    fontSize: 14,
    marginRight: 10,
  },
  joinButton: {
    backgroundColor: 'black',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  privacy: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginVertical: 30,
  },
  linksRow: {
    flexDirection: 'row',
    marginHorizontal:'2%'
  },
  column: {
    minWidth: width / 8.5,
  },
  columnTitle: {
    fontWeight: '500',
    marginBottom: 6,
    letterSpacing: 1,
  },
  link: {
    fontSize: 12,
    color: 'black',
    marginBottom: 4,
    letterSpacing: 2,
    paddingVertical: 6,
  },
});
