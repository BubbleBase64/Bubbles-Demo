import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

type Props = {
  id: string;
  title: string;
  source: string;
  bias?: number;
  image?: string;
  time: string;
};

export default function CompactNewsCard({id, title, source, bias = 0, image, time }: Props) {
  const { colors } = useTheme();
  const img = image || 'https://via.placeholder.com/100x100.png?text=No+Image';

  const getBiasColor = (score?: number) => {
    if (!score) return '#aaa';
    // Strong right: > 0.3, fade right: 0 to 0.3, strong left: < -0.3, fade left: 0 to -0.3
    if (score > 0.3) return '#ef4444'; // strong right (red)
    if (score < -0.3) return '#3b82f6'; // strong left (blue)
    if (score > 0) {
      // fade right: interpolate from #aaa to #ef4444
      const percent = score / 0.3;
      return `rgba(239,68,68,${percent.toFixed(2)})`;
    }
    if (score < 0) {
      // fade left: interpolate from #aaa to #3b82f6
      const percent = Math.abs(score) / 0.3;
      return `rgba(59,130,246,${percent.toFixed(2)})`;
    }
    return '#aaa';
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

  return (
    <View style={[
      styles.cardContainer,
      { 
        backgroundColor: colors.surfaceSecondary,
        borderColor: colors.border,
      }
    ]}>
      <Link href={`/news/${id}`} asChild>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.touchable}
        >
          <View style={styles.leftContent}>
            <Text numberOfLines={3} style={[styles.title, { color: colors.text }]}>{title}</Text>
            <View style={styles.metaContainer}>
              <Text style={[styles.meta, { color: colors.textMuted }]}>
                {source} · {time}
              </Text>
              {bias !== undefined && (bias === 0 || Math.abs(bias) > 0.1) && (
                <View style={styles.biasContainer}>
                  <Text style={[styles.biasScore, { color: getBiasColor(bias) }]}>
                    {getBiasText(bias)}
                  </Text>
                  <View style={styles.biasBar}>
                    <View 
                      style={[
                        styles.biasIndicator, 
                        { 
                          backgroundColor: getBiasColor(bias),
                          width: `${getBiasWidth(bias)}%`
                        }
                      ]} 
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
          <Image source={{ uri: img }} style={styles.image} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 4,
    marginHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    maxHeight: 150,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 12,
    minHeight: 110,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 12,
    gap: 12,
    minHeight: 100,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 8,
    height: '100%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  meta: {
    fontSize: 11,
    opacity: 0.7,
  },
  biasScore: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  biasContainer: {
    marginTop: 4,
  },
  biasBar: {
    width: 60,
    height: 3,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  biasIndicator: {
    height: '100%',
    borderRadius: 2,
  },
});
