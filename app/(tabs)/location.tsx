import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
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
  {
    name: "Delhi NCR",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Kolkata",
    image:
      "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Chandigarh",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=150&q=80",
  },
];

const ALL_CITIES = [
  "Abohar",
  "Abu Road",
  "Achalpur",
  "Adampur",
  "Adra",
  "Agartala",
  "Agra",
  "Ahmedabad",
];

export default function LocationScreen() {
  const router = useRouter();
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");

  const focusAnim = useRef(new Animated.Value(0)).current;

  const onFocus = () => {
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const animatedBorderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255,255,255,0.08)", "#A855F7"],
  });

  const animatedShadowOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.35],
  });

  const animatedScale = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.015],
  });

  const animatedIconOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)");
            }
          }}
        >
          <ChevronDown color={textColor} size={24} />
          <Text style={[styles.headerTitle, { color: textColor }]}>
            Location
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* 🔍 Search */}
        <Animated.View
          style={[
            styles.searchBox,
            {
              backgroundColor: cardColor,
              borderColor: animatedBorderColor,
              shadowOpacity: animatedShadowOpacity,
              transform: [{ scale: animatedScale }],
            },
          ]}
        >
          <Animated.View style={{ opacity: animatedIconOpacity }}>
            <Search size={20} color={textColor} />
          </Animated.View>
          <TextInput
            placeholder="Search city, area or locality"
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={[styles.searchInput, { color: textColor }]}
            onFocus={onFocus}
            onBlur={onBlur}
            selectionColor="#A855F7"
          />
        </Animated.View>

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
              <View
                style={[
                  styles.locationTitleRow,
                  { backgroundColor: "transparent" },
                ]}
              >
                <Text style={styles.locationTitle}>
                  Enable location permissions
                </Text>
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
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Recent searches
          </Text>
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
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Popular cities
          </Text>
          <View style={styles.grid}>
            {POPULAR.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.cityCard}
                  activeOpacity={0.75}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cityImage}
                  />
                  <Text
                    style={[styles.cityText, { color: textColor }]}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 🏙️ All cities */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            All cities
          </Text>
          {ALL_CITIES.map((city, index) => (
            <TouchableOpacity key={index} style={styles.allCityItem}>
              <Text style={[styles.allCityText, { color: textColor }]}>
                {city}
              </Text>
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
    borderWidth: 1.5,
    shadowColor: "#A855F7",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  searchInput: {
    marginLeft: 12,
    fontSize: 16,
    flex: 1,
    fontFamily: "SpaceGrotesk_500Medium",
    outlineStyle: "none" as any,
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cityImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.08)",
  },
  cityText: {
    fontSize: 13,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#FFFFFF",
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
