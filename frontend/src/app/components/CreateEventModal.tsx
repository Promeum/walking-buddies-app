import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useApp } from "../context/AppContext";

const vibeOptions = ["Chill", "Focused", "Social", "Music", "Active", "Creative"];
const bgColors = ["#FFE5D9", "#D4E4FF", "#E0F4E0", "#FFE8F0", "#FFF4ED", "#D4C5FF"];

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  const { createEvent } = useApp();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    time: "",
    maxParticipants: "",
    vibe: "Chill",
    description: "",
  });

  const handleCreate = () => {
    if (
      !formData.title ||
      !formData.location ||
      !formData.time ||
      !formData.maxParticipants
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    createEvent({
      title: formData.title,
      location: formData.location,
      time: formData.time,
      maxParticipants: parseInt(formData.maxParticipants),
      image:
        "https://images.unsplash.com/photo-1775300175543-96f588eca1fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      verified: true,
      vibe: formData.vibe,
      bgColor: bgColors[Math.floor(Math.random() * bgColors.length)],
      description: formData.description || undefined,
      distance: "0.2 mi",
      participants: 1,
    });

    Alert.alert("Success", "Event created! Your hangout is now live");

    setFormData({
      title: "",
      location: "",
      time: "",
      maxParticipants: "",
      vibe: "Chill",
      description: "",
    });
    onClose();
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.container}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
        />
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Event</Text>
            <Pressable
              style={styles.closeButton}
              onPress={onClose}
            >
              <MaterialCommunityIcons
                name="close"
                size={24}
                color="#666"
              />
            </Pressable>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.formSection}>
              <Text style={styles.label}>
                Title <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Coffee & Chat"
                placeholderTextColor="#999"
                value={formData.title}
                onChangeText={(text) =>
                  setFormData({ ...formData, title: text })
                }
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>
                Location <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Corner Cafe"
                placeholderTextColor="#999"
                value={formData.location}
                onChangeText={(text) =>
                  setFormData({ ...formData, location: text })
                }
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>
                Time <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Today, 3:00 PM"
                placeholderTextColor="#999"
                value={formData.time}
                onChangeText={(text) =>
                  setFormData({ ...formData, time: text })
                }
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>
                Max People <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="8"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={formData.maxParticipants}
                onChangeText={(text) =>
                  setFormData({ ...formData, maxParticipants: text })
                }
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tell people what to expect..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Vibe</Text>
              <View style={styles.vibeContainer}>
                {vibeOptions.map((vibe) => (
                  <Pressable
                    key={vibe}
                    style={[
                      styles.vibeButton,
                      formData.vibe === vibe && styles.vibeButtonActive,
                    ]}
                    onPress={() => setFormData({ ...formData, vibe })}
                  >
                    <Text
                      style={[
                        styles.vibeButtonText,
                        formData.vibe === vibe &&
                          styles.vibeButtonTextActive,
                      ]}
                    >
                      {vibe}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Pressable
              style={styles.createButton}
              onPress={handleCreate}
            >
              <Text style={styles.createButtonText}>Create Event</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: "#FFF4ED",
    borderRadius: 32,
    padding: 24,
    width: "90%",
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  content: {
    flex: 1,
  },
  formSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  required: {
    color: "#FF9A76",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "#000",
  },
  textArea: {
    textAlignVertical: "top",
    height: 80,
  },
  vibeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  vibeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5EBE7",
  },
  vibeButtonActive: {
    backgroundColor: "#FF9A76",
  },
  vibeButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  vibeButtonTextActive: {
    color: "white",
  },
  createButton: {
    backgroundColor: "#FF9A76",
    borderRadius: 28,
    paddingVertical: 16,
    marginTop: 24,
    alignItems: "center",
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
