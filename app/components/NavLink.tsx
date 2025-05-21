import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

type NavLinkProps = {
  href: string;
  label: string;
  isHome?: boolean;
};

const NavLink = ({ href, label, isHome }: NavLinkProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
    >
      <Link
        href={href}
        style={[
          styles.linkText,
          isHome && styles.home,
          hovered && styles.hoveredText,
        ]}
      >
        {label}
      </Link>
    </Pressable>
  );
};

export default NavLink;

const styles = StyleSheet.create({
  linkText: {
    fontSize: 16,
    fontWeight: '100',
    letterSpacing: 2,
    marginRight: 100,
    fontFamily: 'Canela',
    color: 'black',
    textDecorationLine: 'none',
  },
  hoveredText: {
    color: '#D8B74F', // subtle gold on hover
  },
  home: {
    color: '#D8B74F',
  },
});
