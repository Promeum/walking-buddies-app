import { createRouter } from "expo-router";

const router = createRouter({
  routes: [
    {
      path: "/",
      component: () => import("./components/Root"),
      children: [
        {
          index: true,
          component: () => import("./components/HomePage"),
        },
        {
          path: "event/:id",
          component: () => import("./components/EventDetailsPage"),
        },
        {
          path: "profile",
          component: () => import("./components/ProfilePage"),
        },
        {
          path: "friends",
          component: () => import("./components/FriendsPage"),
        },
        {
          path: "tracker",
          component: () => import("./components/WalkingTrackerPage"),
        },
        {
          path: "onboarding",
          component: () => import("./components/OnboardingFlow"),
        },
      ],
    },
  ],
});

export default router;