import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const interests = [
  { id: 1, label: "Coffee Culture", icon: "coffee" },
  { id: 2, label: "Vinyl Records", icon: "music" },
  { id: 3, label: "Books & Reading", icon: "book-open" },
  { id: 4, label: "Urban Exploring", icon: "map-marker" },
];

const buddies = [
  { id: 1, name: "Sam Chen", distance: "0.3 mi away", interest: "Vintage shops" },
  { id: 2, name: "Jordan Lee", distance: "0.5 mi away", interest: "Campus study" },
  { id: 3, name: "Maya Patel", distance: "0.7 mi away", interest: "Coffee culture" },
];

export function ProfileView() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Circle of Buddies</Text>
      <Text style={styles.subheading}>Connect with people nearby</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Interests</Text>
        <View style={styles.badgeRow}>
          {interests.map((item) => (
            <View key={item.id} style={styles.badge}>
              <MaterialCommunityIcons name={item.icon} size={16} color="#FF9A76" />
              <Text style={styles.badgeText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby</Text>
        {buddies.map((buddy) => (
          <View key={buddy.id} style={styles.card}>
            <Text style={styles.cardTitle}>{buddy.name}</Text>
            <Text style={styles.cardSubtitle}>{buddy.distance}</Text>
            <Text style={styles.cardNote}>{buddy.interest}</Text>
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
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12, color: "#111" },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -6 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#F7F7F7",
    margin: 6,
  },
  badgeText: { marginLeft: 8, fontSize: 12, color: "#555" },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#111" },
  cardSubtitle: { fontSize: 12, color: "#666", marginTop: 4 },
  cardNote: { fontSize: 12, color: "#555", marginTop: 8 },
});
