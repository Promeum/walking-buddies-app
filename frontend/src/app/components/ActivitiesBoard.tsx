import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ImageWithFallback } from "./ImageWithFallback";

const initialHangouts = [
  {
    id: 1,
    title: "Coffee & Conversation",
    location: "Corner Cafe",
    time: "Today, 3:00 PM",
    participants: 4,
    maxParticipants: 8,
    image: { uri: "https://images.unsplash.com/photo-1770718915953-86650ef8a218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    vibe: "Chill",
  },
  {
    id: 2,
    title: "Study Group",
    location: "City Library",
    time: "Tomorrow, 2:00 PM",
    participants: 6,
    maxParticipants: 10,
    image: { uri: "https://images.unsplash.com/photo-1758840734307-aed01ccec284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    vibe: "Focused",
  },
];

export function ActivitiesBoard() {
  const [hangouts, setHangouts] = useState(initialHangouts);
  const [joined, setJoined] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  const toggleJoin = (id: number) => {
    setJoined((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const addHangout = () => {
    if (!title || !location || !time) return;
    setHangouts([
      {
        id: Date.now(),
        title,
        location,
        time,
        participants: 1,
        maxParticipants: 8,
        image: { uri: "https://images.unsplash.com/photo-1775300175543-96f588eca1fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
        vibe: "Social",
      },
      ...hangouts,
    ]);
    setShowForm(false);
    setTitle("");
    setLocation("");
    setTime("");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Community Board</Text>
          <Text style={styles.subheading}>Find hangouts near you</Text>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={() => setShowForm(!showForm)}>
          <MaterialCommunityIcons name="plus" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      {showForm && (
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
          <TextInput style={styles.input} placeholder="Time" value={time} onChangeText={setTime} />
          <TouchableOpacity style={styles.submitButton} onPress={addHangout}>
            <Text style={styles.submitText}>Create Hangout</Text>
          </TouchableOpacity>
        </View>
      )}

      {hangouts.map((hangout) => (
        <View key={hangout.id} style={styles.card}>
          <ImageWithFallback source={hangout.image} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{hangout.title}</Text>
            <Text style={styles.cardMeta}>{hangout.location}</Text>
            <Text style={styles.cardMeta}>{hangout.time}</Text>
            <TouchableOpacity style={styles.joinButton} onPress={() => toggleJoin(hangout.id)}>
              <Text style={styles.joinText}>{joined.includes(hangout.id) ? "Joined" : "Join"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  content: { padding: 24, paddingBottom: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  heading: { fontSize: 24, fontWeight: "700", color: "#111" },
  subheading: { fontSize: 12, color: "#666" },
  createButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#FF9A76", alignItems: "center", justifyContent: "center" },
  form: { marginBottom: 20, backgroundColor: "#F7F7F7", borderRadius: 20, padding: 16 },
  input: { backgroundColor: "#FFF", borderRadius: 14, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: "#E0E0E0" },
  submitButton: { backgroundColor: "#FF9A76", borderRadius: 18, paddingVertical: 12, alignItems: "center" },
  submitText: { color: "#FFF", fontWeight: "600" },
  card: { marginBottom: 16, borderRadius: 24, overflow: "hidden", backgroundColor: "#F5F5F5" },
  image: { width: "100%", height: 160 },
  cardBody: { padding: 16 },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  cardMeta: { fontSize: 12, color: "#666", marginBottom: 4 },
  joinButton: { marginTop: 10, backgroundColor: "#8B92A8", paddingVertical: 10, borderRadius: 16, alignItems: "center" },
  joinText: { color: "#FFF", fontWeight: "600" },
});
