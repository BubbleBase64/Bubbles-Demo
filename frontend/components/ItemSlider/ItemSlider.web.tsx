// components/ItemSlider/ItemSlider.web.tsx
import React, { useRef, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { useSwipeable } from 'react-swipeable';
import styles, { ITEM_WIDTH, SPACING } from './styles';
import './slider.css';

export interface ItemSliderItem {
  id: string;
  title: string;
  content?: any;
}

interface ItemSliderProps {
  items?: ItemSliderItem[];
  renderItem?: (item: ItemSliderItem, index: number) => React.ReactNode;
  showScrollIndicator?: boolean;
  showNavButtons?: boolean;
}

const defaultItems: ItemSliderItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `item-${i + 1}`,
  title: `Item ${i + 1}`,
}));

const ItemSlider: React.FC<ItemSliderProps> = ({ 
  items = defaultItems, 
  renderItem,
  showNavButtons = true 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollAmount = ITEM_WIDTH + SPACING;

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      // Update button states after scroll
      setTimeout(updateScrollButtons, 300);
    }
  };

  const scrollLeft = () => scrollBy(-scrollAmount * 2);
  const scrollRight = () => scrollBy(scrollAmount * 2);

  const handlers = useSwipeable({
    onSwipedLeft: scrollRight,
    onSwipedRight: scrollLeft,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  // Extract handlers without ref
  const { ref: handlerRef, ...swipeHandlers } = handlers;

  const defaultRenderItem = (item: ItemSliderItem, index: number) => (
    <View key={item.id} style={styles.item}>
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  // Web-specific styles
  const webSliderStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        {showNavButtons && (
          <>
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              style={{
                ...styles.navButton,
                opacity: canScrollLeft ? 1 : 0.5,
                cursor: canScrollLeft ? 'pointer' : 'not-allowed',
              }}
              onMouseEnter={(e) => {
                if (canScrollLeft) {
                  Object.assign((e.target as HTMLButtonElement).style, styles.navButtonHover);
                }
              }}
              onMouseLeave={(e) => {
                Object.assign((e.target as HTMLButtonElement).style, styles.navButton);
              }}
            >
              ←
            </button>
          </>
        )}
        
        <div
          ref={scrollRef}
          className="item-slider"
          style={webSliderStyle}
          onScroll={updateScrollButtons}
          {...swipeHandlers}
        >
          {items.map((item, index) => 
            renderItem ? renderItem(item, index) : defaultRenderItem(item, index)
          )}
        </div>

        {showNavButtons && (
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            style={{
              ...styles.navButton,
              opacity: canScrollRight ? 1 : 0.5,
              cursor: canScrollRight ? 'pointer' : 'not-allowed',
            }}
            onMouseEnter={(e) => {
              if (canScrollRight) {
                Object.assign((e.target as HTMLButtonElement).style, styles.navButtonHover);
              }
            }}
            onMouseLeave={(e) => {
              Object.assign((e.target as HTMLButtonElement).style, styles.navButton);
            }}
          >
            →
          </button>
        )}
      </View>
    </View>
  );
};

export default ItemSlider;
