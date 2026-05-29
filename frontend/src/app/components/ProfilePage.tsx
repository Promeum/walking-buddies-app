import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useApp } from "../context/AppContext";

export function ProfilePage() {
  const navigation = useNavigation();
  const { currentUser, events, joinedEvents } = useApp();
  const myEvents = events.filter((e) => joinedEvents.has(e.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={20} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <View style={[styles.avatar, { backgroundColor: currentUser.avatarColor }]}>
            <Text style={styles.avatarText}>{currentUser.avatar}</Text>
          </View>
          <Text style={styles.userName}>{currentUser.name}</Text>
          <Text style={styles.userSubtitle}>{currentUser.friendCount} friends • {currentUser.totalDistance} mi</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgesContainer}>
            {currentUser.badges.length === 0 ? (
              <Text style={{ color: '#666' }}>No badges yet</Text>
            ) : (
              currentUser.badges.map((b) => (
                <View key={b.id} style={styles.badgeItem}>
                  <Text style={styles.badgeIcon}>{b.icon}</Text>
                  <Text style={styles.badgeName}>{b.name}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Events ({myEvents.length})</Text>
          {myEvents.length === 0 ? (
            <Text style={{ color: '#666' }}>No joined events</Text>
          ) : (
            myEvents.map((ev) => (
              <View key={ev.id} style={styles.eventItem}>
                <Text style={styles.eventTitle}>{ev.title}</Text>
                <Text style={styles.eventLocation}>{ev.location}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '600' },
  headerSpacer: { width: 40 },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 28, color: 'white', fontWeight: '600' },
  userName: { fontSize: 20, fontWeight: '600', marginTop: 12 },
  userSubtitle: { fontSize: 12, color: '#666', marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  badgesContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  badgeItem: { width: '30%', padding: 8, borderRadius: 12, backgroundColor: '#F5F5F5', alignItems: 'center', marginRight: 8, marginBottom: 8 },
  badgeIcon: { fontSize: 18, marginBottom: 6 },
  badgeName: { fontSize: 12, color: '#666' },
  eventItem: { backgroundColor: '#F5F5F5', padding: 12, borderRadius: 12, marginBottom: 8 },
  eventTitle: { fontWeight: '600' },
  eventLocation: { color: '#666', marginTop: 4 },
});
