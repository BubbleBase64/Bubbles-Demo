import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  isTabletOrLarger: boolean;
}

export default function Header({ isTabletOrLarger }: HeaderProps) {
  const [searchText, setSearchText] = useState('');
  const { isDark, toggleTheme, colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={[styles.header, isTabletOrLarger ? styles.headerTablet : styles.headerMobile]}>
      <View style={styles.headerContent}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🫧 Bubbles</Text>
        </View>

        {/* Search Bar (only on tablet/desktop) */}
        {isTabletOrLarger && (
          <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Haber ve konu ara"
                placeholderTextColor={colors.textMuted}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>
        )}

        {/* Right side items */}
        <View style={styles.rightContainer}>
          {/* Theme Toggle Button */}
          <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
            <Text style={styles.themeIcon}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>

          {/* Currency/Status Info */}
          {isTabletOrLarger && (
            <View style={styles.statusContainer}>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>TRY</Text>
                <Text style={styles.statusValue}>₺0.025</Text>
                <Text style={styles.statusChange}>▼</Text>
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.cryptoIcon}>⚡</Text>
                <Text style={styles.statusLabel}>İST.28°</Text>
                <Text style={styles.statusChange}>▼</Text>
              </View>
            </View>
          )}

          {/* App Download Links */}
          {isTabletOrLarger && (
            <View style={styles.appLinksContainer}>
              <Text style={styles.appLabel}>APP</Text>
              <TouchableOpacity style={styles.appIcon}>
                <Text style={styles.appIconText}>🍎</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.appIcon}>
                <Text style={styles.appIconText}>▶️</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Country Selector */}
          <TouchableOpacity style={styles.countrySelector}>
            <Text style={styles.flag}>🇹🇷</Text>
            <Text style={styles.countryText}>Türkiye</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  header: {
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 1000,
  },
  headerTablet: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  headerMobile: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
    flexShrink: 0,
  },
  logo: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    maxWidth: 400,
    marginHorizontal: 32,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: colors.textMuted,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    padding: 0,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  themeToggle: {
    marginRight: 16,
    padding: 8,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  themeIcon: {
    fontSize: 18,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cryptoIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  statusLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  statusValue: {
    color: colors.text,
    fontSize: 12,
    marginRight: 4,
  },
  statusChange: {
    color: colors.textMuted,
    fontSize: 10,
  },
  appLinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  appLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8,
  },
  appIcon: {
    marginLeft: 4,
    padding: 4,
  },
  appIconText: {
    fontSize: 16,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  flag: {
    fontSize: 16,
    marginRight: 6,
  },
  countryText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
    marginRight: 6,
  },
  dropdownArrow: {
    color: colors.textMuted,
    fontSize: 10,
  },
});
