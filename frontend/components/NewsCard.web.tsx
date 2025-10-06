import { motion } from 'framer-motion';
import { Image, Text, View, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity style={{
        borderRadius: 12,
        overflow: 'hidden',
        margin: 8,
        width: 260,
        height: 300,
        backgroundColor: colors.surface
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ height: '100%' }}
        >
          <Image source={{ uri: img }} style={{ width: '100%', height: 140, backgroundColor: '#111' }} />
          <View style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, color: colors.textMuted }}>{source}</Text>
              <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginTop: 4 }}>{title}</Text>
              <Text style={{ fontSize: 10, marginTop: 4, color: colors.textSecondary }}>{time}</Text>
            </View>
            {(bias === 0 || Math.abs(bias) > 0.1) && (
              <View style={{ marginBottom: 'auto', paddingTop: 'auto' }}>
                <Text style={{ 
                  fontSize: 9, 
                  fontWeight: '700', 
                  letterSpacing: 0.5, 
                  marginBottom: 4, 
                  color: getBiasColor(bias) 
                }}>
                  {getBiasText(bias)}
                </Text>
                <View style={{ height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' }}>
                  <View style={{
                    height: '100%',
                    width: `${getBiasWidth(bias)}%`,
                    backgroundColor: getBiasColor(bias),
                    borderRadius: 3,
                  }} />
                </View>
              </View>
            )}
          </View>
        </motion.div>
      </TouchableOpacity>
    </Link>
  );
}
