import React from "react";
import { Tabs } from "expo-router";
import { CustomTabBar } from "@/components/CustomTabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          title: "Chart",
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Item",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
