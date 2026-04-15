import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, BarChart3, Plus, Clock3, User } from "lucide-react-native";
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
    chart: BarChart3,
    add: Plus,
    history: Clock3,
    profile: User,
  };

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
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
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

        if (route.name === "add") {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.addButtonWrapper}
              activeOpacity={0.8}
            >
              <View style={[styles.addButton, { backgroundColor: tintColor }]}>
                <Plus color="#FFFFFF" size={32} />
              </View>
            </TouchableOpacity>
          );
        }

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
  addButtonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40, // Raise the button
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#A855F7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#A855F7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
