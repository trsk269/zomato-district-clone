import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { View, Text, useThemeColor } from "@/components/Themed";
import {
  MapPin,
  Search,
  ChevronRight,
  Building2,
  Landmark,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const RECENT = ["Chennai", "Hyderabad"];

const POPULAR = [
  { name: "Delhi NCR", icon: Landmark },
  { name: "Mumbai", icon: Building2 },
  { name: "Kolkata", icon: Landmark },
  { name: "Bengaluru", icon: Building2 },
  { name: "Hyderabad", icon: Landmark },
  { name: "Chandigarh", icon: Building2 },
];

export default function LocationScreen() {
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔍 Search */}
      <View
        style={[styles.searchBox, { backgroundColor: cardColor, borderColor }]}
      >
        <Search size={18} color={textColor} opacity={0.4} />
        <TextInput
          placeholder="Search city, area or locality"
          placeholderTextColor="rgba(255,255,255,0.3)"
          style={[styles.searchInput, { color: textColor }]}
        />
      </View>

      {/* 📍 Enable Location */}
      <TouchableOpacity activeOpacity={0.85}>
        <LinearGradient
          colors={["#FF4D6D", "#FF7A18"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.locationCard}
        >
          <View style={styles.locationIcon}>
            <MapPin color="#FFF" size={20} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.locationTitle}>
              Enable location permissions
            </Text>
            <Text style={styles.locationSubtitle}>
              for better recommendations near you
            </Text>
          </View>

          <ChevronRight color="#FFF" opacity={0.8} />
        </LinearGradient>
      </TouchableOpacity>

      {/* 🕘 Recent */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent searches</Text>

        <View style={styles.chipRow}>
          {RECENT.map((city) => (
            <TouchableOpacity
              key={city}
              style={[styles.chip, { backgroundColor: cardColor }]}
            >
              <Text style={[styles.chipText, { color: textColor }]}>
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 🌆 Popular */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular cities</Text>

        <View style={styles.grid}>
          {POPULAR.map((item, index) => {
            const Icon = item.icon;

            return (
              <TouchableOpacity
                key={index}
                style={[styles.cityCard, { backgroundColor: cardColor }]}
              >
                <View style={styles.cityIcon}>
                  <Icon size={22} color={tintColor} />
                </View>

                <Text style={[styles.cityText, { color: textColor }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  /* Search */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
    fontFamily: "SpaceGrotesk_500Medium",
  },

  /* Location Card */
  locationCard: {
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  locationIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  locationTitle: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  locationSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "SpaceGrotesk_500Medium",
  },

  /* Section */
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 13,
    opacity: 0.5,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontFamily: "SpaceGrotesk_700Bold",
  },

  /* Chips */
  chipRow: {
    flexDirection: "row",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  /* Grid */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cityCard: {
    width: "48%",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 12,
  },
  cityIcon: {
    marginBottom: 8,
  },
  cityText: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },
});
