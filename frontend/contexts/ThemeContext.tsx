import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  primary: string;
  accent: string;
  header: string;
  sidebar: string;
}

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const lightTheme: ThemeColors = {
  background: '#f9fafb',          // Çok hafif gri beyaz
  surface: '#ffffff',             // Ana kart arka planı
  surfaceSecondary: '#f1f5f9',    // Alt sekmeler, bilgi kutuları
  text: '#0f172a',                // Ana yazı rengi (çok koyu mavi-gri)
  textSecondary: '#334155',      // Alt başlıklar için
  textMuted: '#64748b',          // Etiket, zaman, kaynak gibi detaylar
  border: '#e2e8f0',              // Kart kenarları
  primary: '#dc2626',            // Ana vurgu (daha koyu kırmızı)
  accent: '#2563eb',             // İkincil vurgu (daha net mavi)
  header: '#ffffff',             // Üst bar
  sidebar: '#f8fafc',            // Yan menü
};


const darkTheme: ThemeColors = {
  background: '#0b1120',          // Daha derin koyu mavi
  surface: '#1e293b',             // Kart arka planı
  surfaceSecondary: '#273447',    // İkinci düzey alanlar
  text: '#f1f5f9',                // Ana yazı rengi
  textSecondary: '#cbd5e1',       // Alt başlıklar
  textMuted: '#94a3b8',           // Zaman, detay vs.
  border: '#334155',              // Kart sınırları
  primary: '#f87171',             // Daha soft kırmızı (göz yormayan)
  accent: '#3b82f6',              // Mavi vurgular aynı kalabilir
  header: '#1e293b',              // Üst bar
  sidebar: '#1e293b',             // Sidebar
};


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  // Load saved theme preference on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  // Save theme preference when it changes
  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
