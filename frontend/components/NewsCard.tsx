import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

import { MotiView } from 'moti';
import { motion } from 'framer-motion';

const AnimatedWrapper = Platform.OS === 'web' ? motion.div : MotiView;

type Props = {
  id: string;
  title: string;
  source: string;
  bias?: number;
  image?: string;
  time: string;
};

export default function NewsCard({ id, title, source, bias = 0, image, time }: Props) {
  const { colors } = useTheme();
  
  const getBiasColor = (score?: number) => {
    if (!score) return '#aaa';
    return score > 0.3 ? '#ef4444' : score < -0.3 ? '#3b82f6' : '#aaa';
  };

  const getBiasText = (score?: number) => {
    if (score === undefined || score === 0 || Math.abs(score) <= 0.1) return 'CENTER';
    if (score > 0.3) return 'RIGHT';
    if (score < -0.3) return 'LEFT';
    return score > 0 ? 'LEAN RIGHT' : 'LEAN LEFT';
  };

  const getBiasWidth = (score?: number) => {
    if (!score) return 0;
    return Math.abs(score) * 100;
  };

  const img = image || 'https://via.placeholder.com/300x180.png?text=No+Image';

  return (
    <Link href={`/news/${id}`} asChild>
      <TouchableOpacity activeOpacity={0.9} style={styles.touchable}>
        <AnimatedWrapper
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 500 }}
          style={
            Platform.OS === 'web'
              ? { ...StyleSheet.flatten(styles.card), backgroundColor: colors.surface }
              : { ...StyleSheet.flatten(styles.card), backgroundColor: colors.surface }
          }
        >
          <Image source={{ uri: img }} style={styles.image} />
          <View style={styles.content}>
            <Text style={[styles.source, { color: colors.textMuted }]}>{source}</Text>
            <Text numberOfLines={2} style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.time, { color: colors.textMuted }]}>{time}</Text>
            {(bias === 0 || Math.abs(bias) > 0.1) && (
              <View style={styles.biasSection}>
                <Text style={[styles.biasLabel, { color: getBiasColor(bias) }]}>
                  {getBiasText(bias)}
                </Text>
                <View style={[styles.biasContainer, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.biasBar,
                      {
                        backgroundColor: getBiasColor(bias),
                        width: Platform.OS === 'web' ? `${getBiasWidth(bias)}%` : getBiasWidth(bias),
                      },
                    ]}
                  />
                </View>
              </View>
            )}
          </View>
        </AnimatedWrapper>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    width: 260,
    height: 300,
  },
  image: {
    width: '100%',
    height: 140,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  source: {
    fontSize: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  time: {
    fontSize: 10,
    marginTop: 4,
  },
  biasSection: {
    marginTop: 8,
  },
  biasLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  biasContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  biasBar: {
    height: '100%',
    borderRadius: 3,
  },
});
