import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useApp } from "../context/AppContext";
import { ImageWithFallback } from "./ImageWithFallback";

export function EventDetailsPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { events, joinedEvents, joinEvent, leaveEvent } = useApp();

  const eventId = (route.params as any)?.eventId;
  const event = events.find((e) => e.id === eventId);
  const isJoined = eventId ? joinedEvents.has(eventId) : false;

  const handleJoinToggle = () => {
    if (!event) return;
    if (isJoined) {
      leaveEvent(event.id);
      Alert.alert("Success", "Left event");
    } else {
      joinEvent(event.id);
      Alert.alert("Success", `You're going! We'll remind you about ${event.title}`);
    }
  };

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>Event not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Event Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <ImageWithFallback
            source={{ uri: event.image }}
            style={styles.heroImage}
          />
          <View style={styles.vibeLabel}>
            <Text style={styles.vibeLabelText}>{event.vibe}</Text>
          </View>
          {event.verified && (
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="check-circle" size={20} color="white" />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.eventTitle}>{event.title}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#FF9A76" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{event.location}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="clock" size={20} color="#FF9A76" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>{event.time}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="account-multiple" size={20} color="#FF9A76" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Participants</Text>
                <Text style={styles.infoValue}>
                  {event.participants}/{event.maxParticipants}
                </Text>
              </View>
            </View>

            {event.distance ? (
              <View style={styles.infoItem}>
                <MaterialCommunityIcons name="navigation" size={20} color="#FF9A76" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Distance</Text>
                  <Text style={styles.infoValue}>{event.distance}</Text>
                </View>
              </View>
            ) : null}
          </View>

          {event.description ? (
            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionTitle}>About</Text>
              <Text style={styles.description}>{event.description}</Text>
            </View>
          ) : null}

          <View style={styles.organizerSection}>
            <Text style={styles.organizerTitle}>Organized by</Text>
            <View style={styles.organizerCard}>
              <View style={styles.organizerAvatar}>
                <Text style={styles.organizerAvatarText}>{event.organizer[0]}</Text>
              </View>
              <View>
                <Text style={styles.organizerName}>{event.organizer}</Text>
                <Text style={styles.organizerStatus}>Event Organizer</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.actionButton, isJoined && styles.actionButtonLeave]}
          onPress={handleJoinToggle}
        >
          <MaterialCommunityIcons
            name={isJoined ? "check" : "plus"}
            size={20}
            color="white"
          />
          <Text style={styles.actionButtonText}>
            {isJoined ? "Joined - Leave" : "Join Event"}
          </Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  headerSpacer: {
    width: 40,
  },
  imageContainer: {
    position: "relative",
    height: 280,
    marginBottom: 24,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  vibeLabel: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  vibeLabelText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  verifiedBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(139, 146, 168, 0.9)",
    padding: 8,
    borderRadius: 12,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 24,
  },
  infoSection: {
    gap: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  organizerSection: {
    marginBottom: 24,
  },
  organizerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  organizerCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    gap: 12,
  },
  organizerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF9A76",
    justifyContent: "center",
    alignItems: "center",
  },
  organizerAvatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  organizerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  organizerStatus: {
    fontSize: 12,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  actionButton: {
    backgroundColor: "#FF9A76",
    paddingVertical: 14,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionButtonLeave: {
    backgroundColor: "#E0E0E0",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
