// import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons/static";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BottomNavProps {
  state?: { index: number; routeNames: string[] };
  navigation?: { navigate: (screen: string) => void };
}

export function BottomNav({ state, navigation }: BottomNavProps) {
  const tabs = [
    { name: "Home", icon: "home" },
    { name: "Friends", icon: "account-multiple" },
    { name: "Tracker", icon: "walk" },
    { name: "Profile", icon: "account-circle" },
  ];

  if (!navigation || !state) {
    return null;
  }

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const active = state.index === index;
        return (
          <TouchableOpacity
            key={tab.name}
            style={[styles.button, active && styles.buttonActive]}
            onPress={() => navigation.navigate(tab.name)}
          >
            <MaterialCommunityIcons
              name={tab.icon}
              size={24}
              color={active ? "#FF9A76" : "#777"}
            />
            <Text style={[styles.label, active && styles.labelActive]}>{tab.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 64,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#FFF",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    opacity: 1,
  },
  label: {
    fontSize: 10,
    color: "#777",
    marginTop: 2,
  },
  labelActive: {
    color: "#FF9A76",
    fontWeight: "600",
  },
});
