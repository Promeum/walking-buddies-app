import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useApp } from "../context/AppContext";

export function EnhancedMapView() {
  const { friends } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <View style={styles.mapPlaceholder}>
        {friends.slice(0, 6).map((f) => (
          <View key={f.id} style={[styles.avatar, { backgroundColor: f.user.avatarColor }]}>
            <Text style={styles.avatarText}>{f.user.avatar}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  title: { fontWeight: '600', marginBottom: 8 },
  mapPlaceholder: { height: 200, backgroundColor: '#F0F0F0', borderRadius: 12, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', margin: 6 },
  avatarText: { color: 'white', fontWeight: '600' },
});