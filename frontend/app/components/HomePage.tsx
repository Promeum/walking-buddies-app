import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useApp } from "../context/AppContext";
import { CreateEventModal } from "./CreateEventModal";
import { EnhancedMapView } from "./EnhancedMapView";
import { ImageWithFallback } from "./ImageWithFallback";

const { width } = Dimensions.get("window");
const quickActionSize = (width - 48 - 18) / 4; // 4 items with padding

export function HomePage() {
  const navigation = useNavigation<any>();
  const { events, joinedEvents, joinEvent, friendRequests } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeView, setActiveView] = useState<"map" | "events">("map");

  const pendingRequests = friendRequests.filter((r) => r.status === "pending");

  const quickActions = [
    {
      id: "tracker",
      label: "Tracker",
      icon: "walk",
      color: "#FF9A76",
      bgColor: "#FFE5D9",
      onPress: () => navigation.navigate("Tracker" as never),
    },
    {
      id: "friends",
      label: "Friends",
      icon: "account-multiple",
      color: "#8B92A8",
      bgColor: "#D4E4FF",
      badge: pendingRequests.length,
      onPress: () => navigation.navigate("Friends" as never),
    },
    {
      id: "events",
      label: "Events",
      icon: "calendar",
      color: "#A8C5A8",
      bgColor: "#E0F4E0",
      onPress: () => setActiveView("events"),
    },
    {
      id: "profile",
      label: "Profile",
      icon: "account-circle",
      color: "#FFB6B9",
      bgColor: "#FFE8F0",
      onPress: () => navigation.navigate("Profile" as never),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Quick Actions */}
        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Walking Buddies</Text>
              <Text style={styles.subtitle}>Find friends nearby</Text>
            </View>
            <Pressable
              style={styles.createButton}
              onPress={() => setShowCreateModal(true)}
            >
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color="white"
              />
            </Pressable>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action) => (
              <Pressable
                key={action.id}
                style={[styles.quickAction, { backgroundColor: action.bgColor }]}
                onPress={action.onPress}
              >
                <MaterialCommunityIcons
                  name={action.icon}
                  size={24}
                  color={action.color}
                />
                {action.badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{action.badge}</Text>
                  </View>
                ) : null}
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* View Toggle */}
        <View style={styles.toggleContainer}>
          <Pressable
            style={[
              styles.toggleButton,
              activeView === "map" && styles.toggleButtonActive,
            ]}
            onPress={() => setActiveView("map")}
          >
            <Text
              style={[
                styles.toggleButtonText,
                activeView === "map" && styles.toggleButtonTextActive,
              ]}
            >
              Map View
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.toggleButton,
              activeView === "events" && styles.toggleButtonActive,
            ]}
            onPress={() => setActiveView("events")}
          >
            <Text
              style={[
                styles.toggleButtonText,
                activeView === "events" && styles.toggleButtonTextActive,
              ]}
            >
              Events
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        {activeView === "map" ? (
          <View style={styles.mapContainer}>
            <EnhancedMapView />
          </View>
        ) : (
          <View style={styles.eventsGrid}>
            {events.map((event, index) => (
              <Pressable
                key={event.id}
                style={[
                  styles.eventCard,
                  { backgroundColor: event.bgColor },
                ]}
                onPress={() =>
                  navigation.navigate("EventDetails" as never, { eventId: event.id } as never)
                }
              >
                <View style={styles.eventImageContainer}>
                  <ImageWithFallback
                    source={{ uri: event.image }}
                    style={styles.eventImage}
                  />
                  <View style={styles.vibeLabel}>
                    <Text style={styles.vibeLabelText}>{event.vibe}</Text>
                  </View>
                  {event.verified && (
                    <View style={styles.verifiedBadge}>
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={16}
                        color="white"
                      />
                    </View>
                  )}
                  {joinedEvents.has(event.id) && (
                    <View style={styles.joinedBadge}>
                      <Text style={styles.joinedText}>✓ Joined</Text>
                    </View>
                  )}
                </View>

                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle} numberOfLines={2}>
                    {event.title}
                  </Text>

                  <View style={styles.eventDetails}>
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={12}
                        color="#666"
                      />
                      <Text style={styles.detailText} numberOfLines={1}>
                        {event.location}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons
                        name="clock"
                        size={12}
                        color="#666"
                      />
                      <Text style={styles.detailText} numberOfLines={1}>
                        {event.time}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons
                        name="account-multiple"
                        size={12}
                        color="#666"
                      />
                      <Text style={styles.detailText}>
                        {event.participants}/{event.maxParticipants}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
  },
  createButton: {
    width: 56,
    height: 56,
    borderRadius: 24,
    backgroundColor: "#FF9A76",
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  quickAction: {
    flex: 1,
    borderRadius: 24,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF9A76",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "white",
  },
  quickActionLabel: {
    fontSize: 11,
    marginTop: 6,
    color: "#666",
    fontWeight: "500",
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#F5EBE7",
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#FF9A76",
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  toggleButtonTextActive: {
    color: "white",
  },
  mapContainer: {
    height: 400,
    marginBottom: 32,
  },
  eventsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 32,
  },
  eventCard: {
    width: "48%",
    borderRadius: 32,
    overflow: "hidden",
  },
  eventImageContainer: {
    position: "relative",
    height: 144,
  },
  eventImage: {
    width: "100%",
    height: "100%",
  },
  vibeLabel: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vibeLabelText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  verifiedBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(139, 146, 168, 0.9)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  joinedBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#A8C5A8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  joinedText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  eventContent: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  eventDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
});
