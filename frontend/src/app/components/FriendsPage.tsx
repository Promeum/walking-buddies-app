import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useApp } from "../context/AppContext";

export function FriendsPage() {
  const navigation = useNavigation();
  const { friendRequests, friends, acceptFriendRequest, rejectFriendRequest } = useApp();
  const [activeTab, setActiveTab] = useState<"requests" | "friends">("friends");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={20} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Friends</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "requests" && styles.tabActive]}
          onPress={() => setActiveTab("requests")}
        >
          <Text style={[styles.tabText, activeTab === "requests" && styles.tabTextActive]}>Requests</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "friends" && styles.tabActive]}
          onPress={() => setActiveTab("friends")}
        >
          <Text style={[styles.tabText, activeTab === "friends" && styles.tabTextActive]}>My Friends</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === "requests" ? (
          <View>
            {friendRequests.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons name="account-plus" size={48} color="#AAA" />
                <Text style={styles.emptyStateText}>No pending requests</Text>
              </View>
            ) : (
              friendRequests.map((r) => (
                <View key={r.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <View style={[styles.requestAvatar, { backgroundColor: r.from.avatarColor }]}>
                      <Text style={styles.requestAvatarText}>{r.from.avatar}</Text>
                    </View>
                    <View style={styles.requestInfo}>
                      <Text style={styles.requestName}>{r.from.name}</Text>
                      <Text style={styles.requestText}>Wants to be your friend</Text>
                    </View>
                  </View>
                  <View style={styles.requestActions}>
                    <Pressable style={[styles.actionButton, styles.acceptButton]} onPress={() => acceptFriendRequest(r.id)}>
                      <Text style={{ color: "white" }}>Accept</Text>
                    </Pressable>
                    <Pressable style={[styles.actionButton, styles.rejectButton]} onPress={() => rejectFriendRequest(r.id)}>
                      <Text>Decline</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </View>
        ) : (
          <View>
            {friends.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons name="account-multiple" size={48} color="#AAA" />
                <Text style={styles.emptyStateText}>No friends yet</Text>
                <Text style={styles.emptyStateSubtext}>Accept friend requests to start building your network</Text>
              </View>
            ) : (
              friends.map((f) => (
                <View key={f.id} style={styles.friendCard}>
                  <View style={[styles.friendAvatar, { backgroundColor: f.user.avatarColor }]}>
                    <Text style={styles.friendAvatarText}>{f.user.avatar}</Text>
                  </View>
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{f.user.name}</Text>
                    <Text style={styles.friendActivity}>{f.user.totalDistance.toFixed(1)} mi walked</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0", justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 16, fontWeight: "600", color: "#000" },
  headerSpacer: { width: 40 },
  tabContainer: { flexDirection: "row", padding: 12, margin: 12, borderRadius: 24, backgroundColor: "#F5F5F5" },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 20, alignItems: "center" },
  tabActive: { backgroundColor: "#FF9A76" },
  tabText: { color: "#666", fontWeight: "600" },
  tabTextActive: { color: "#fff" },
  content: { paddingHorizontal: 16, paddingBottom: 40 },
  requestCard: { borderRadius: 16, padding: 12, backgroundColor: "#fff", marginBottom: 12, borderWidth: 1, borderColor: "#E0E0E0" },
  requestHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  requestAvatar: { width: 56, height: 56, borderRadius: 28, justifyContent: "center", alignItems: "center" },
  requestAvatarText: { fontSize: 18, fontWeight: "600", color: "white" },
  requestInfo: { flex: 1, marginLeft: 12 },
  requestName: { fontSize: 14, fontWeight: "600" },
  requestText: { fontSize: 12, color: "#666" },
  requestActions: { flexDirection: "row", gap: 8 },
  actionButton: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  rejectButton: { backgroundColor: "#E0E0E0" },
  acceptButton: { backgroundColor: "#FF9A76" },
  friendCard: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#E0E0E0", marginBottom: 8 },
  friendAvatar: { width: 48, height: 48, borderRadius: 24, justifyContent: "center", alignItems: "center" },
  friendAvatarText: { fontSize: 16, fontWeight: "600", color: "white" },
  friendInfo: { flex: 1, marginLeft: 12 },
  friendName: { fontSize: 14, fontWeight: "600" },
  friendActivity: { fontSize: 12, color: "#666" },
  emptyState: { alignItems: "center", justifyContent: "center", paddingVertical: 60 },
  emptyStateText: { fontSize: 16, fontWeight: "600", marginTop: 12 },
  emptyStateSubtext: { fontSize: 12, color: "#666", textAlign: "center", marginTop: 8, paddingHorizontal: 32 },
});
