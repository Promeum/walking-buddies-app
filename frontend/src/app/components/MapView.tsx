import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export function MapView({ onPing }: { onPing: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.mapBox, expanded && styles.mapBoxExpanded]}>
        <Text style={styles.mapTitle}>City Map</Text>
        <View style={styles.mapArea}>
          <Text style={styles.mapText}>Interactive map preview</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={() => setZoom((prev) => Math.max(prev - 0.1, 0.8))}>
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.zoomLabel}>{Math.round(zoom * 100)}%</Text>
          <TouchableOpacity style={styles.controlButton} onPress={() => setZoom((prev) => Math.min(prev + 0.1, 2))}>
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.expandButton} onPress={() => setExpanded((prev) => !prev)}>
          <Text style={styles.expandText}>{expanded ? "Collapse" : "Expand"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Check-ins</Text>
        {['Corner Cafe', 'City Library', 'Central Plaza'].map((location) => (
          <View key={location} style={styles.item}>
            <Text style={styles.itemText}>{location}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.pingButton} onPress={onPing}>
        <Text style={styles.pingText}>Send Ping</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  content: { padding: 24, paddingBottom: 40 },
  mapBox: { borderRadius: 24, backgroundColor: "#E8EDF5", padding: 20, marginBottom: 20 },
  mapBoxExpanded: { minHeight: 360 },
  mapTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  mapArea: { height: 220, backgroundColor: "#FFF", borderRadius: 20, justifyContent: "center", alignItems: "center", marginBottom: 16 },
  mapText: { color: "#777" },
  controls: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  controlButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#FF9A76", justifyContent: "center", alignItems: "center" },
  controlText: { color: "#FFF", fontSize: 20, fontWeight: "700" },
  zoomLabel: { fontSize: 14, fontWeight: "600", color: "#333" },
  expandButton: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 18, backgroundColor: "#FFF", alignSelf: "flex-start", borderWidth: 1, borderColor: "#E0E0E0" },
  expandText: { color: "#333", fontWeight: "600" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12, color: "#111" },
  item: { backgroundColor: "#F7F7F7", borderRadius: 16, padding: 14, marginBottom: 10 },
  itemText: { color: "#333" },
  pingButton: { backgroundColor: "#FF9A76", borderRadius: 18, paddingVertical: 14, alignItems: "center" },
  pingText: { color: "#FFF", fontWeight: "600" },
});
