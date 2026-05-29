import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const stats = [
  { id: 1, label: "Hangouts This Week", value: "8", icon: "coffee" },
  { id: 2, label: "Active Buddies", value: "16", icon: "account-group" },
  { id: 3, label: "Places Visited", value: "24", icon: "map-marker" },
  { id: 4, label: "Connections Made", value: "42", icon: "trending-up" },
];

const favoriteSpots = [
  { id: 1, name: "Corner Cafe", visits: 12 },
  { id: 2, name: "Central Plaza", visits: 8 },
  { id: 3, name: "City Library", visits: 6 },
];

export function Dashboard() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Dashboard</Text>
      <Text style={styles.subheading}>Your urban social journey</Text>

      <View style={styles.grid}>
        {stats.map((stat) => (
          <View key={stat.id} style={styles.card}>
            <MaterialCommunityIcons name={stat.icon} size={24} color="#FF9A76" />
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.cardLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Favorite Spots</Text>
        {favoriteSpots.map((spot) => (
          <View key={spot.id} style={styles.listItem}>
            <Text style={styles.listText}>{spot.name}</Text>
            <Text style={styles.listSubtext}>{spot.visits} visits</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  content: { padding: 24, paddingBottom: 40 },
  heading: { fontSize: 28, fontWeight: "700", marginBottom: 8, color: "#111" },
  subheading: { fontSize: 14, color: "#666", marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    width: "48%",
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  value: { fontSize: 24, fontWeight: "700", marginTop: 12, color: "#111" },
  cardLabel: { fontSize: 12, color: "#666", marginTop: 4 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12, color: "#111" },
  listItem: {
    backgroundColor: "#F5F5F5",
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  listText: { fontSize: 14, fontWeight: "600", color: "#111" },
  listSubtext: { fontSize: 12, color: "#555", marginTop: 4 },
});
