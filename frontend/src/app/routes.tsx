import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useApp } from "./context/AppContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Screens
import { HomePage } from "./components/HomePage";
import { EventDetailsPage } from "./components/EventDetailsPage";
import { ProfilePage } from "./components/ProfilePage";
import { FriendsPage } from "./components/FriendsPage";
import { WalkingTrackerPage } from "./components/WalkingTrackerPage";
import { OnboardingFlow } from "./components/OnboardingFlow";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomePage} />
      <Stack.Screen name="EventDetails" component={EventDetailsPage} />
    </Stack.Navigator>
  );
}

function FriendsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FriendsScreen" component={FriendsPage} />
    </Stack.Navigator>
  );
}

function TrackerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TrackerScreen" component={WalkingTrackerPage} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfilePage} />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";
          if (route.name === "Friends") {
            iconName = "account-multiple";
          } else if (route.name === "Tracker") {
            iconName = "walk";
          } else if (route.name === "Profile") {
            iconName = "account-circle";
          }
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#FF9A76",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "rgba(255, 154, 118, 0.15)",
          paddingBottom: 8,
          paddingTop: 8,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Friends" component={FriendsStack} />
      <Tab.Screen name="Tracker" component={TrackerStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { onboardingComplete } = useApp();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!onboardingComplete ? (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingFlow}
          options={{ animation: "none" }}
        />
      ) : (
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ animation: "none" }}
        />
      )}
    </Stack.Navigator>
  );
}
