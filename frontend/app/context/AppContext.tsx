import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  badges: Badge[];
  verified: boolean;
  totalDistance: number;
  friendCount: number;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  time: string;
  participants: number;
  maxParticipants: number;
  image: string;
  organizer: string;
  organizerId: string;
  verified: boolean;
  vibe: string;
  bgColor: string;
  description?: string;
  distance?: string;
}

export interface FriendRequest {
  id: string;
  from: User;
  status: "pending" | "accepted" | "rejected";
  timestamp: number;
}

export interface Friend {
  id: string;
  user: User;
  sharedActivities: string[];
}

export interface WalkingLog {
  id: string;
  date: string;
  distance: number;
  steps: number;
  activities: string[];
}

interface AppContextType {
  currentUser: User;
  updateUser: (user: Partial<User>) => void;
  events: Event[];
  joinedEvents: Set<string>;
  joinEvent: (eventId: string) => void;
  leaveEvent: (eventId: string) => void;
  createEvent: (event: Omit<Event, "id" | "organizerId" | "organizer">) => void;
  friendRequests: FriendRequest[];
  friends: Friend[];
  sendFriendRequest: (userId: string) => void;
  acceptFriendRequest: (requestId: string) => void;
  rejectFriendRequest: (requestId: string) => void;
  walkingLogs: WalkingLog[];
  addWalkingLog: (log: Omit<WalkingLog, "id">) => void;
  onboardingComplete: boolean;
  completeOnboarding: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialBadges: Badge[] = [
  { id: "coffee", name: "Coffee Lover", icon: "☕", color: "#D4A99A" },
  { id: "books", name: "Book Worm", icon: "📚", color: "#8B92A8" },
  { id: "music", name: "Music Fan", icon: "🎵", color: "#A8B0C0" },
  { id: "fitness", name: "Fitness Enthusiast", icon: "💪", color: "#A8C5A8" },
  { id: "art", name: "Art Lover", icon: "🎨", color: "#E8C9A8" },
  { id: "foodie", name: "Foodie", icon: "🍕", color: "#FFB6B9" },
];

const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Rivera",
    avatar: "AR",
    avatarColor: "#D4A99A",
    badges: [initialBadges[0], initialBadges[1]],
    verified: true,
    totalDistance: 45.2,
    friendCount: 12,
  },
  {
    id: "user-2",
    name: "Sam Chen",
    avatar: "SC",
    avatarColor: "#8B92A8",
    badges: [initialBadges[1], initialBadges[2]],
    verified: true,
    totalDistance: 32.8,
    friendCount: 8,
  },
];

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Coffee & Conversation",
    location: "Corner Cafe",
    time: "Today, 3:00 PM",
    participants: 4,
    maxParticipants: 8,
    image: "",
    organizer: "Alex Rivera",
    organizerId: "user-1",
    verified: true,
    vibe: "Chill",
    bgColor: "#FFE5D9",
    description: "Join us for a relaxed afternoon coffee chat. Perfect for making new friends!",
    distance: "0.3 mi",
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>({
    id: "current-user",
    name: "You",
    avatar: "YO",
    avatarColor: "#D4A99A",
    badges: [],
    verified: true,
    totalDistance: 0,
    friendCount: 0,
  });

  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(new Set());
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [walkingLogs, setWalkingLogs] = useState<WalkingLog[]>([]);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("onboardingComplete").then((value) => {
      setOnboardingComplete(value === "true");
    });
  }, []);

  const updateUser = (updates: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  const joinEvent = (eventId: string) => {
    setJoinedEvents((prev) => new Set([...prev, eventId]));
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, participants: event.participants + 1 } : event
      )
    );
  };

  const leaveEvent = (eventId: string) => {
    setJoinedEvents((prev) => {
      const next = new Set(prev);
      next.delete(eventId);
      return next;
    });
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, participants: Math.max(1, event.participants - 1) } : event
      )
    );
  };

  const createEvent = (eventData: Omit<Event, "id" | "organizerId" | "organizer">) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}`,
      organizerId: currentUser.id,
      organizer: currentUser.name,
      participants: 1,
    };
    setEvents((prev) => [newEvent, ...prev]);
    setJoinedEvents((prev) => new Set([...prev, newEvent.id]));
  };

  const sendFriendRequest = (userId: string) => {};
  const acceptFriendRequest = (requestId: string) => {};
  const rejectFriendRequest = (requestId: string) => {};
  const addWalkingLog = (log: Omit<WalkingLog, "id">) => {};

  const completeOnboarding = async () => {
    setOnboardingComplete(true);
    await AsyncStorage.setItem("onboardingComplete", "true");
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        updateUser,
        events,
        joinedEvents,
        joinEvent,
        leaveEvent,
        createEvent,
        friendRequests,
        friends,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        walkingLogs,
        addWalkingLog,
        onboardingComplete,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}

export { initialBadges };