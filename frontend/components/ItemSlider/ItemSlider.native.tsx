// components/ItemSlider/ItemSlider.native.tsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import styles from './styles';

export interface ItemSliderItem {
  id: string;
  title: string;
  content?: any;
}

interface ItemSliderProps {
  items?: ItemSliderItem[];
  renderItem?: (item: ItemSliderItem, index: number) => React.ReactNode;
  showScrollIndicator?: boolean;
  showNavButtons?: boolean; // Added for consistency with web version
}

const defaultItems: ItemSliderItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `item-${i + 1}`,
  title: `Item ${i + 1}`,
}));

const ItemSlider: React.FC<ItemSliderProps> = ({ 
  items = defaultItems, 
  renderItem,
  showScrollIndicator = false,
  showNavButtons = false // Not used on mobile, just for prop consistency
}) => {
  const defaultRenderItem = (item: ItemSliderItem, index: number) => (
    <View key={item.id} style={styles.item}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={showScrollIndicator}
        style={styles.slider}
        contentContainerStyle={{ paddingRight: 16 }}
        decelerationRate="fast"
        snapToInterval={styles.item.width + 10}
        snapToAlignment="start"
      >
        {items.map((item, index) => 
          renderItem ? renderItem(item, index) : defaultRenderItem(item, index)
        )}
      </ScrollView>
    </View>
  );
};

export default ItemSlider;
