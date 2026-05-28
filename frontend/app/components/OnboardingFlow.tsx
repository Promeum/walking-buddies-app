import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useApp } from "../context/AppContext";

const { width } = Dimensions.get("window");

const steps = [
  {
    id: "welcome",
    title: "Welcome",
    subtitle: "Walking Buddies",
    description: "Connect with like-minded people in your city and explore together. Let's get you set up!",
    icon: "hand-wave",
    emoji: "👋",
  },
  {
    id: "features",
    title: "Discover Events",
    description: "Find and join walking events happening nearby. Connect with people who share your interests.",
    icon: "map-marker",
    emoji: "🗺️",
  },
  {
    id: "friends",
    title: "Make Friends",
    description: "Build your walking buddy network and share your favorite routes and activities.",
    icon: "account-multiple",
    emoji: "👥",
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "Your account is ready. Start exploring events and connecting with walking buddies!",
    icon: "check-circle",
    emoji: "✓",
  },
];

export function OnboardingFlow() {
  const router = useRouter();
  const { completeOnboarding } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      // router.navigate("Main" as never);
      router.navigate("Main" as never);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    // router.navigate("Main" as never);
    router.navigate("Main" as never);
  };

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      {/* Skip Button */}
      <Pressable style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      {/* Content */}
      <View style={styles.content}>
        {/* Icon/Emoji */}
        <View style={styles.iconContainer}>
          <Text style={styles.emoji}>{step.emoji}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{step.title}</Text>

        {/* Subtitle */}
        {step.subtitle && (
          <Text style={styles.subtitle}>{step.subtitle}</Text>
        )}

        {/* Description */}
        <Text style={styles.description}>{step.description}</Text>

        {/* Step Indicators */}
        <View style={styles.indicators}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index <= currentStep && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.footer}>
        <Pressable
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
          </Text>
          <MaterialCommunityIcons
            name={currentStep === steps.length - 1 ? "check" : "arrow-right"}
            size={20}
            color="white"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  progressContainer: {
    height: 4,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FF9A76",
  },
  skipButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "flex-end",
  },
  skipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFE5D9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF9A76",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 48,
  },
  indicators: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  indicatorActive: {
    backgroundColor: "#FF9A76",
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
  },
  nextButton: {
    backgroundColor: "#FF9A76",
    borderRadius: 28,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
