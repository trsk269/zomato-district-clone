import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Search, User } from "lucide-react-native";
import { useThemeColor } from "./Themed";

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const inactiveColor = useThemeColor({}, "tabIconDefault");
  const borderColor = useThemeColor({}, "border");

  const icons: Record<string, any> = {
    index: Home,
    search: Search,
    profile: User,
  };

  // Only show these tabs
  const visibleRoutes = state.routes.filter((route) =>
    ["index", "search", "profile"].includes(route.name),
  );

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          backgroundColor,
          paddingBottom: insets.bottom || 10,
          borderTopColor: borderColor,
        },
      ]}
    >
      {visibleRoutes.map((route) => {
        const { options } = descriptors[route.key];
        const routeIndex = state.routes.findIndex((r) => r.key === route.key);
        const isFocused = state.index === routeIndex;
        const Icon = icons[route.name] || Home;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Icon
              color={isFocused ? tintColor : inactiveColor}
              size={24}
              strokeWidth={isFocused ? 2.5 : 2}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? 88 : 70,
    borderTopWidth: 1,
    paddingTop: 10,
    position: "relative",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
