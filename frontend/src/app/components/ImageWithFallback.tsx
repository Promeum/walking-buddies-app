import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface ImageWithFallbackProps {
  source: { uri: string };
  style?: any;
}

export function ImageWithFallback({ source, style }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <View style={[styles.fallback, style]}>
        <Text style={styles.fallbackText}>Image unavailable</Text>
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={style}
      onError={() => setError(true)}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#999',
    fontSize: 12,
  },
});
