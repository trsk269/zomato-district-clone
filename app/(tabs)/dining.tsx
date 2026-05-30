import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryPageHeader } from "@/components/CategoryPageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { FilterChips } from "@/components/FilterChips";
import { RestaurantCard, Restaurant } from "@/components/RestaurantCard";
import { MoodGrid, MoodItem } from "@/components/MoodGrid";

// ─── Data ─────────────────────────────────────────────────────────────────────
const MOOD_ITEMS: MoodItem[] = [
  {
    id: "1",
    label: "Buffet",
    imageUri:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
  },
  {
    id: "2",
    label: "Family dining",
    imageUri:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
  },
  {
    id: "3",
    label: "Fresh finds",
    imageUri:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  },
  {
    id: "4",
    label: "Party vibes",
    imageUri:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&q=80",
  },
  {
    id: "5",
    label: "Pocket friendly",
    imageUri:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
  },
  {
    id: "6",
    label: "Romantic dining",
    imageUri:
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&q=80",
  },
  {
    id: "7",
    label: "Rooftops",
    imageUri:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
  },
  {
    id: "8",
    label: "Drink & dine",
    imageUri:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80",
  },
];

const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "The Bombay Canteen",
    cuisine: "Modern Indian • Cocktail Bar",
    rating: "4.7",
    deliveryTime: "30-35 min",
    distance: "1.2 km",
    promo: "20% OFF",
    imageUri:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    accent: "#A855F7",
  },
  {
    id: "2",
    name: "Social",
    cuisine: "Continental • Café • Bar",
    rating: "4.5",
    deliveryTime: "25-30 min",
    distance: "0.8 km",
    promo: "BOGO on drinks",
    imageUri:
      "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&q=80",
    accent: "#26C6DA",
  },
  {
    id: "3",
    name: "Smoke House Deli",
    cuisine: "European • Deli • Café",
    rating: "4.6",
    deliveryTime: "40-45 min",
    distance: "2.1 km",
    promo: "30% OFF",
    imageUri:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    accent: "#F9A825",
  },
  {
    id: "4",
    name: "Farzi Cafe",
    cuisine: "Modern Indian • Bar",
    rating: "4.8",
    deliveryTime: "35-40 min",
    distance: "1.6 km",
    imageUri:
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80",
    accent: "#EF5350",
  },
];

// ─── Promo Banner ─────────────────────────────────────────────────────────────
function PromoBanner() {
  return (
    <TouchableOpacity style={styles.banner} activeOpacity={0.88}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1575367439058-6096bb9cf5e2?w=800&q=80",
        }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <View style={styles.bannerOverlay} />
      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>Finals{"\n"}Fever 🏆</Text>
        <Text style={styles.bannerSub}>Save more with Google Pay</Text>
        <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.85}>
          <Text style={styles.exploreBtnText}>Explore now ›</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function DiningScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <CategoryPageHeader
        activeTab="dining"
        searchPlaceholder="Search for 'Vegan Treats'"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Promo banner */}
        <PromoBanner />

        {/* Filter chips */}
        <View style={styles.section}>
          <FilterChips />
        </View>

        {/* In the mood for */}
        <View style={styles.section}>
          <View style={styles.moodHeader}>
            <View style={styles.moodLine} />
            <Text style={styles.moodTitle}>IN THE MOOD FOR</Text>
            <View style={styles.moodLine} />
          </View>
          <MoodGrid items={MOOD_ITEMS} />
        </View>

        {/* Top Restaurants */}
        <View style={styles.section}>
          <SectionTitle title="Top Restaurants" onSeeAll={() => {}} />
          {RESTAURANTS.map((r) => (
            <RestaurantCard key={r.id} item={r} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#09090B",
  },
  scroll: {
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },

  // Banner
  banner: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    overflow: "hidden",
    height: 180,
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5,10,30,0.55)",
  },
  bannerContent: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    gap: 4,
  },
  bannerTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 28,
    color: "#ADFF2F",
    lineHeight: 34,
  },
  bannerSub: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 10,
  },
  exploreBtn: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  exploreBtnText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "#09090B",
  },

  // Mood header
  moodHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  moodLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  moodTitle: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 2,
  },
});
