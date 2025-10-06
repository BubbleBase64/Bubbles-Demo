import { Stack } from 'expo-router';
import { SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

function RootLayoutContent() {
  const { colors } = useTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.background} 
        translucent={true} 
      />
      <View style={[
        { flex: 1, backgroundColor: colors.background },
        Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight || 0 }
      ]}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
