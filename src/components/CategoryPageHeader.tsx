import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from "react-native";
import { MapPin, ChevronDown, Search, User, Home } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Types ───────────────────────────────────────────────────────────────────
export type CategoryTab =
  | "home"
  | "dining"
  | "movies"
  | "events"
  | "ipl"
  | "stores"
  | "activities";

interface CategoryPageHeaderProps {
  activeTab: CategoryTab;
  searchPlaceholder?: string;
}

// ─── Tab config ──────────────────────────────────────────────────────────────
const TABS: { id: CategoryTab; label: string; route: string }[] = [
  { id: "home", label: "Home", route: "/(tabs)" },
  { id: "dining", label: "Dining", route: "/(tabs)/dining" },
  { id: "movies", label: "Movies", route: "/(tabs)/movies" },
  { id: "events", label: "Events", route: "/(tabs)/events" },
  { id: "ipl", label: "IPL", route: "/(tabs)/ipl" },
  { id: "stores", label: "Shopping", route: "/(tabs)/stores" },
  { id: "activities", label: "Activities", route: "/(tabs)/activities" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export function CategoryPageHeader({
  activeTab,
  searchPlaceholder = "Search for restaurants, movies…",
}: CategoryPageHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 10 }]}>
      {/* ── Row 1: Location + Profile ── */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.locationPill}
          activeOpacity={0.75}
          onPress={() => router.push("/(tabs)/location")}
        >
          <MapPin size={15} color="#A855F7" strokeWidth={2} />
          <View style={{ marginLeft: 6 }}>
            <View style={styles.locationInner}>
              <Text style={styles.cityText}>Ranga Nagar</Text>
              <ChevronDown
                size={13}
                color="rgba(255,255,255,0.5)"
                style={{ marginLeft: 3 }}
              />
            </View>
            <Text style={styles.areaText}>Chromepet, Chennai</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileBtn}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <User size={18} color="rgba(255,255,255,0.7)" strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      {/* ── Row 2: Search bar ── */}
      <TouchableOpacity
        style={styles.searchBar}
        activeOpacity={0.85}
        onPress={() => router.push("/(tabs)/search")}
      >
        <Search size={16} color="rgba(255,255,255,0.3)" />
        <Text style={styles.searchPlaceholder}>{searchPlaceholder}</Text>
      </TouchableOpacity>

      {/* ── Row 3: Category tabs ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsScroll}
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const isHome = tab.id === "home";
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabItem}
              activeOpacity={0.75}
              onPress={() => {
                if (!isActive) {
                  router.replace(tab.route as any);
                }
              }}
            >
              {isHome ? (
                <Home
                  size={18}
                  color={isActive ? "#A855F7" : "rgba(255,255,255,0.4)"}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              ) : (
                <Text
                  style={[styles.tabLabel, isActive && styles.tabLabelActive]}
                >
                  {tab.label}
                </Text>
              )}
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#09090B",
    paddingHorizontal: 16,
    paddingBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  // Top row
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  cityText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  areaText: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    marginTop: 1,
  },
  profileBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.07)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
  },

  // Search
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    gap: 10,
  },
  searchPlaceholder: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.28)",
  },

  // Tabs
  tabsScroll: {
    paddingRight: 16,
    gap: 4,
  },
  tabItem: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 2,
    position: "relative",
  },
  tabLabel: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
  },
  tabLabelActive: {
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#FFFFFF",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 12,
    right: 12,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: "#A855F7",
  },
});
