import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen!</Text>
      <TextInput />
      <Text>TextInput above ^^^</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
