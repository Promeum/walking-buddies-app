import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function StatusBar() {
  return (
    <View style={styles.bar}>
      <Text style={styles.text}>9:41</Text>
      <View style={styles.statusGroup}>
        <Text style={styles.statusText}>75%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    height: 44,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
  statusGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    color: "#555",
  },
});
