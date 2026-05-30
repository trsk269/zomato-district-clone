import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => null}
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen
        name="location"
        options={{ title: "Location", href: null }}
      />
      <Tabs.Screen name="event" options={{ title: "Event", href: null }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      {/* Category screens — not shown in tab bar */}
      <Tabs.Screen name="dining" options={{ title: "Dining", href: null }} />
      <Tabs.Screen name="movies" options={{ title: "Movies", href: null }} />
      <Tabs.Screen name="events" options={{ title: "Events", href: null }} />
      <Tabs.Screen name="ipl" options={{ title: "IPL", href: null }} />
      <Tabs.Screen name="stores" options={{ title: "Stores", href: null }} />
      <Tabs.Screen
        name="activities"
        options={{ title: "Activities", href: null }}
      />
    </Tabs>
  );
}
