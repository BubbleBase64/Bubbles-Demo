import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const dummyNews = [
  { id: '1', title: 'AI Breakthrough in Medicine', summary: 'A new model surpasses human performance.' },
  { id: '2', title: 'Elections Impact Global Markets', summary: 'Stock markets react to political instability.' },
];

export default function HomeScreen() {
  return (
    <FlatList
      data={dummyNews}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  summary: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
});
