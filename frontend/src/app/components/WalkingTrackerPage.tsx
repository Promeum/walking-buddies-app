import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useApp } from "../context/AppContext";

export function WalkingTrackerPage() {
  const { walkingLogs } = useApp();
  const totalDistance = walkingLogs.reduce((sum, log) => sum + log.distance, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Walking Tracker</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Distance</Text>
          <Text style={styles.totalValue}>{totalDistance.toFixed(1)} mi</Text>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Recent Walks</Text>
          {walkingLogs.length === 0 ? (
            <Text style={styles.emptyText}>No walks logged yet. Start your first walk to track progress.</Text>
          ) : (
            walkingLogs.map((log) => (
              <View key={log.id} style={styles.logItem}>
                <View style={styles.logIcon}>
                  <MaterialCommunityIcons name="walk" size={20} color="#FF9A76" />
                </View>
                <View style={styles.logInfo}>
                  <Text style={styles.logDate}>{new Date(log.date).toDateString()}</Text>
                  <Text style={styles.logActivities}>{log.activities.join(", ")}</Text>
                </View>
                <Text style={styles.logDistance}>{log.distance.toFixed(1)} mi</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  totalCard: {
    backgroundColor: "#FF9A76",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  totalLabel: {
    color: "rgba(255,255,255,0.9)",
  },
  totalValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginTop: 8,
  },
  chartSection: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
  },
  chartTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    color: "#666",
    paddingTop: 12,
  },
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  logIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,154,118,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logInfo: {
    flex: 1,
  },
  logDate: {
    fontSize: 12,
    color: "#333",
  },
  logActivities: {
    fontSize: 12,
    color: "#666",
  },
  logDistance: {
    fontWeight: "600",
  },
});
