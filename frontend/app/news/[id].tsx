import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, ActivityIndicator } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useEffect, useState } from 'react';

interface Article {
  id: string;
  title: string;
  source: string;
  summary: string;
  bias: number;
  url?: string;
  image?: string;
  time: string;
}

export default function NewsDetail() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const styles = createStyles(colors);

  const baseUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(`${baseUrl}/articles/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!article) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={styles.message}>Haber bulunamadı.</Text>
      </View>
    );
  }

  const biasColor = article.bias > 0.3 ? '#f87171' : article.bias < -0.3 ? '#60a5fa' : '#a1a1aa';
  const biasLabel =
    article.bias > 0.3 ? 'Sağ Yönlü' : article.bias < -0.3 ? 'Sol Yönlü' : 'Tarafsız';
  const biasEmoji = article.bias > 0.3 ? '🔴' : article.bias < -0.3 ? '🔵' : '⚪';

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webRoot}>
        <View style={styles.iframeWrapper}>
          {article.url && (
            <iframe
              src={article.url}
              title="Kaynak Sayfa"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          )}
        </View>

        <View style={styles.sidePanel}>
          <Pressable style={styles.backBtn} onPress={() => router.replace('/')}>
            <Text style={styles.backText}>◀ Ana Sayfa</Text>
          </Pressable>

          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.source}>Kaynak: {article.source}</Text>

          <View style={styles.summaryBlock}>
            <Text style={styles.summary}>{article.summary}</Text>
          </View>

          <View style={styles.biasWrapper}>
            <Text style={styles.biasLabel}>
              Bias Skoru: {biasEmoji} {biasLabel} ({article.bias.toFixed(2)})
            </Text>
            <View style={styles.biasBarContainer}>
              <View
                style={[
                  styles.biasBar,
                  { width: `${Math.abs(article.bias) * 100}%`, backgroundColor: biasColor },
                ]}
              />
            </View>
          </View>

          <Pressable style={styles.timelineBtn} onPress={() => alert('Timeline yakında :)')}>
            <Text style={styles.timelineText}>🕒 Bu haberin zaman çizelgesini gör</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.backBtn} onPress={() => router.replace('/')}>
        <Text style={styles.backText}>◀ Ana Sayfa</Text>
      </Pressable>

      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.source}>Kaynak: {article.source}</Text>

      <View style={styles.summaryBlock}>
        <Text style={styles.summary}>{article.summary}</Text>
      </View>

      <View style={styles.biasWrapper}>
        <Text style={styles.biasLabel}>
          Bias Skoru: {biasEmoji} {biasLabel} ({article.bias.toFixed(2)})
        </Text>
        <View style={styles.biasBarContainer}>
          <View
            style={[
              styles.biasBar,
              { width: `${Math.abs(article.bias) * 100}%`, backgroundColor: biasColor },
            ]}
          />
        </View>
      </View>

      <Pressable style={styles.timelineBtn} onPress={() => alert('Timeline yakında :)')}>
        <Text style={styles.timelineText}>🕒 Bu haberin zaman çizelgesini gör</Text>
      </Pressable>
    </ScrollView>
  );
}


// Move createStyles outside of the component
const createStyles = (colors: any) => {
  const baseStyles = StyleSheet.create({
    message: {
      fontSize: 18,
      textAlign: 'center',
      color: colors.text,
    },
    container: {
      padding: 24,
      backgroundColor: colors.background,
      minHeight: '100%',
    },
    backBtn: {
      marginBottom: 16,
      alignSelf: 'flex-start',
      backgroundColor: colors.surface,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    backText: {
      color: colors.text,
      fontWeight: '600',
      fontSize: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    source: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 16,
    },
    summaryBlock: {
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
    },
    summary: {
      fontSize: 16,
      color: colors.textSecondary,
      lineHeight: 24,
    },
    biasWrapper: {
      marginBottom: 36,
    },
    biasLabel: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 8,
    },
    biasBarContainer: {
      height: 8,
      backgroundColor: colors.surface,
      borderRadius: 4,
    },
    biasBar: {
      height: '100%',
      borderRadius: 4,
    },
    timelineBtn: {
      backgroundColor: colors.surface,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    timelineText: {
      color: colors.text,
      fontWeight: '600',
    },
  });

  // Web-specific styles that may not be compatible with React Native
  const webStyles = Platform.OS === 'web' ? {
    webRoot: {
      flexDirection: 'row' as 'row',
      height: '100vh' as any,
      backgroundColor: colors.background,
    },
    iframeWrapper: {
      flex: 2,
      borderRightWidth: 1,
      borderColor: colors.border,
    },
    iframe: {
      width: '100%',
      height: '100%',
    } as any,
    sidePanel: {
      flex: 1,
      padding: 24,
      backgroundColor: colors.surfaceSecondary,
    },
  } : {};

  return { ...baseStyles, ...webStyles };
};
