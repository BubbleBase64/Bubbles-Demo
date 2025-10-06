import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Platform, ActivityIndicator } from 'react-native';
import NewsCard from '../components/NewsCard';
import CompactNewsCard from '../components/CompactNewsCard';
import ItemSlider from '../components/ItemSlider/ItemSlider';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

interface Article {
  id: string;
  title: string;
  source: string;
  bias?: number;
  image?: string;
  time: string;
}

const categories = ['GÜNDEM', 'BİLİM & TEKNOLOJİ', 'FİNANS', 'YAŞAM', 'SPOR'];

export default function HomePage() {
  const { colors } = useTheme();

  // Umami tracker script (sadece web)
  useEffect(() => {
    if (Platform.OS === 'web') {
      const script = document.createElement('script');
      script.defer = true;
      script.src = "https://cloud.umami.is/script.js";
      script.setAttribute("data-website-id", "d1effa25-922a-4c40-b354-67cf431a1a18");
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);
  const [screenData, setScreenData] = useState(() => {
    const { width } = Dimensions.get('window');
    return {
      width,
      isWeb: Platform.OS === 'web',
      isTabletOrLarger: width >= 768,
    };
  });

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const styles = createStyles(colors);

  // 🔹 API'den haberleri çek
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${baseUrl}/articles`);
        const data = await res.json();

        // Gelen datayı NewsCard/CompactNewsCard props’una map et
        const mapped = data.map((a: any) => ({
          id: a._id,
          title: a.title,
          source: a.source || "Bilinmeyen Kaynak",
          bias: a.bias || undefined,
          image: a.image || undefined,
          time: a.createdAt ? new Date(a.createdAt).toLocaleString() : "",
        }));

        setArticles(mapped);
      } catch (err) {
        console.error("Haberler alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Ekran boyutu event listener
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData({
        width: window.width,
        isWeb: Platform.OS === 'web',
        isTabletOrLarger: window.width >= 768,
      });
    });

    return () => subscription?.remove();
  }, []);

  const renderSidebar = () => {
    if (!screenData.isTabletOrLarger) return null;
    return (
      <View style={styles.sidebar}>
        {categories.map((cat) => (
          <Pressable key={cat} style={styles.categoryButton}>
            <Text style={styles.category}>{cat}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

const renderFeaturedSection = () => {
  const featuredNews = articles.slice(0, 6);
  return (
    <ItemSlider
      items={featuredNews as any[]}
      renderItem={(item: any, index) => (
        <View key={item.id} style={styles.featuredNewsCard}>
          <NewsCard 
            id={item.id}
            title={item.title}
            source={item.source}
            time={item.time}
            bias={item.bias}
            image={item.image}
          />
        </View>
      )}
      showNavButtons={screenData.isTabletOrLarger}
    />
  );
};


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Haberler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Header isTabletOrLarger={screenData.isTabletOrLarger} />
      
      <View style={styles.contentContainer}>
        {renderSidebar()}
        
        <ScrollView
          style={[
            styles.main,
            screenData.isTabletOrLarger ? styles.mainWithSidebar : styles.mainFullWidth
          ]}
          contentContainerStyle={styles.mainContent}
        >
          <Text style={styles.sectionTitle}>Ne Oldu?</Text>
          {renderFeaturedSection()}

          <Text style={styles.sectionTitle}>Daha Fazla Haber</Text>

          {screenData.isWeb ? (
            <View style={{ 
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: 16, 
              paddingHorizontal: 16 
            }}>
              {articles.map((item) => (
                <View key={item.id} style={{ width: screenData.isTabletOrLarger ? 280 : '100%' }}>
                  <NewsCard {...item} />
                </View>
              ))}
            </View>
          ) : (
            <View style={{ paddingHorizontal: 8 }}>
              {articles.map((item) => (
                <CompactNewsCard key={item.id} {...item} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background, // Use theme background color
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    backgroundColor: colors.sidebar,
    paddingTop: 48,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  logo: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  category: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  main: {
    flex: 1,
  },
  mainWithSidebar: {
    flex: 1,
  },
  mainFullWidth: {
    flex: 1,
  },
  mainContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  newsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  newsList: {
    flexDirection: 'column',
  },
  newsFlexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 16,
  },
  newsFlexItem: {
    minWidth: 250,
    marginBottom: 16,
  },
  newsGridItem: {
    width: '48%',
    marginBottom: 16,
  },
  newsListItem: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryCard: {
    width: 120,
    height: 120,
    backgroundColor: colors.surface,
    marginRight: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  categoryLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  categoryCardSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.primary,
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
  },
  categoryLabelSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  selectedCategoryIndicator: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  featuredNewsCard: {
    width: 260,
    marginRight: 16,
  },
  newsSliderCard: {
    width: 200,
    marginRight: 12,
  },
});
