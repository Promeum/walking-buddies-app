import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

interface SkeletonLoaderProps {
  onComplete: () => void;
}

const { width } = Dimensions.get("window");

export function SkeletonLoader({ onComplete }: SkeletonLoaderProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      true
    );
  }, [opacity]);

  const skeletonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacity.value, [0, 1], [0.3, 0.5], Extrapolate.CLAMP),
  }));

  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.headerSection}>
        <Animated.View
          style={[
            styles.skeletonLine,
            { width: width * 0.75, height: 40 },
            skeletonAnimatedStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.skeletonLine,
            { width: width * 0.5, height: 20, marginTop: 12 },
            skeletonAnimatedStyle,
          ]}
        />
      </View>

      {/* Grid Skeleton */}
      <View style={styles.gridContainer}>
        {[0, 1, 2, 3].map((i) => (
          <Animated.View
            key={i}
            style={[
              styles.gridItem,
              skeletonAnimatedStyle,
            ]}
          />
        ))}
      </View>

      {/* Large Card Skeleton */}
      <Animated.View
        style={[
          styles.largeCard,
          skeletonAnimatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 128,
  },
  headerSection: {
    marginBottom: 24,
  },
  skeletonLine: {
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  gridItem: {
    width: "48%",
    height: 128,
    backgroundColor: "#E0E0E0",
    borderRadius: 24,
    marginBottom: 16,
  },
  largeCard: {
    width: "100%",
    height: 160,
    backgroundColor: "#E0E0E0",
    borderRadius: 28,
  },
});

// Note: onComplete can be called by parent when appropriate. This component
// only renders the skeleton animation.

