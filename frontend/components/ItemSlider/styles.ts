// components/ItemSlider/styles.ts
import { StyleSheet, Platform } from 'react-native';

export const ITEM_WIDTH = 120;
export const ITEM_HEIGHT = 120;
export const SPACING = 10;

const itemStyle = {
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT,
  backgroundColor: '#334155',
  marginRight: SPACING,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  borderRadius: 8,
  ...Platform.select({
    web: {
      display: 'flex' as const,
    },
  }),
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  slider: {
    flexDirection: 'row',
  },
  sliderWeb: Platform.select({
    web: {
      display: 'flex',
      flexDirection: 'row',
      overflowX: 'auto',
      scrollbarWidth: 'none', // Firefox
      msOverflowStyle: 'none', // IE/Edge
      // Hide scrollbar for webkit browsers
      WebkitScrollbarWidth: 'none',
    },
    default: {},
  }),
  item: itemStyle,
  text: {
    fontSize: 16,
    color: '#f8fafc',
    fontWeight: '600',
  },
  navigation: Platform.select({
    web: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    default: {
      display: 'none',
    },
  }),
  navButton: Platform.select({
    web: {
      backgroundColor: '#475569',
      borderRadius: 20,
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none',
      color: '#f8fafc',
      fontSize: 18,
      fontWeight: 'bold',
      transition: 'background-color 0.2s',
    },
    default: {},
  }),
  navButtonHover: Platform.select({
    web: {
      backgroundColor: '#64748b',
    },
    default: {},
  }),
  sliderWrapper: Platform.select({
    web: {
      flex: 1,
      position: 'relative',
    },
    default: {},
  }),
});

export default styles;
