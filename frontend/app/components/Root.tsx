import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";

interface RootProps {
  children: React.ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    flex: 1,
  },
});
