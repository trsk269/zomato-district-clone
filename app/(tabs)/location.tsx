import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { View, Text, useThemeColor } from "@/components/Themed";
import {
  MapPin,
  Search,
  ChevronDown,
  Building2,
  Landmark,
  ArrowRight,
  Castle,
  School,
  Building,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const RECENT = ["Chennai", "Hyderabad"];

const POPULAR = [
  { name: "Delhi NCR", icon: Landmark },
  { name: "Mumbai", icon: Building2 },
  { name: "Kolkata", icon: Castle },
  { name: "Bengaluru", icon: Building },
  { name: "Hyderabad", icon: Landmark },
  { name: "Chandigarh", icon: School },
];

const ALL_CITIES = [
  "Abohar", "Abu Road", "Achalpur", "Adampur", "Adra", "Agartala", "Agra", "Ahmedabad"
];

export default function LocationScreen() {
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft}>
          <ChevronDown color={textColor} size={24} />
          <Text style={[styles.headerTitle, { color: textColor }]}>Location</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* 🔍 Search */}
        <View
          style={[styles.searchBox, { backgroundColor: cardColor }]}
        >
          <Search size={20} color={textColor} opacity={0.6} />
          <TextInput
            placeholder="Search city, area or locality"
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={[styles.searchInput, { color: textColor }]}
          />
        </View>

        {/* 📍 Enable Location Card */}
        <TouchableOpacity activeOpacity={0.9}>
          <LinearGradient
            colors={["#310E3A", "#1A0B2E"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.locationCard}
          >
            <View style={styles.locationIconContainer}>
               <MapPin color="#D8B4FE" size={24} strokeWidth={1.5} />
            </View>

            <View style={{ flex: 1, backgroundColor: "transparent" }}>
              <View style={[styles.locationTitleRow, { backgroundColor: "transparent" }]}>
                <Text style={styles.locationTitle}>Enable location permissions</Text>
                <ArrowRight color="#FFF" size={16} style={{ marginLeft: 6 }} />
              </View>
              <Text style={styles.locationSubtitle}>
                for more relevant suggestions near you
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🕘 Recent searches */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Recent searches</Text>
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

        {/* 🌆 Popular cities */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Popular cities</Text>
          <View style={styles.grid}>
            {POPULAR.map((item, index) => {
              const Icon = item.icon || Building2;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.cityCard, { backgroundColor: cardColor }]}
                >
                  <Icon size={32} color={tintColor} strokeWidth={1} style={styles.cityIcon} />
                  <Text style={[styles.cityText, { color: textColor }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 🏙️ All cities */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>All cities</Text>
          {ALL_CITIES.map((city, index) => (
            <TouchableOpacity key={index} style={styles.allCityItem}>
              <Text style={[styles.allCityText, { color: textColor }]}>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "SpaceGrotesk_700Bold",
    marginLeft: 12,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  /* Search */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 12,
    fontSize: 16,
    flex: 1,
    fontFamily: "SpaceGrotesk_500Medium",
  },

  /* Location Card */
  locationCard: {
    borderRadius: 16,
    padding: 20,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 30,
  },
  locationIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(216, 180, 254, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  locationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTitle: {
    color: "#FFF",
    fontSize: 17,
    fontFamily: "SpaceGrotesk_700Bold",
  },
  locationSubtitle: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    marginTop: 4,
    fontFamily: "SpaceGrotesk_500Medium",
  },

  /* Section */
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "SpaceGrotesk_700Bold",
    marginBottom: 16,
  },

  /* Chips */
  chipRow: {
    flexDirection: "row",
    gap: 12,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
  },
  chipText: {
    fontSize: 15,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  /* Grid */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  cityCard: {
    width: "31%",
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  cityIcon: {
    marginBottom: 10,
    opacity: 0.8,
  },
  cityText: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
    textAlign: "center",
  },

  /* All Cities */
  allCityItem: {
    paddingVertical: 12,
  },
  allCityText: {
    fontSize: 16,
    opacity: 0.8,
    fontFamily: "SpaceGrotesk_500Medium",
  },
});
