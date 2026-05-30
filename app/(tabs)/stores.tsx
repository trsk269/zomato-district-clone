import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryPageHeader } from "@/components/CategoryPageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { FilterChips } from "@/components/FilterChips";
import { Star, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// ─── Data ─────────────────────────────────────────────────────────────────────
const STORE_CATEGORIES = [
  "All",
  "Fashion",
  "Electronics",
  "Food & Bev",
  "Books",
  "Beauty",
];

interface StoreItem {
  id: string;
  name: string;
  category: string;
  rating: string;
  distance: string;
  tag?: string;
  tagColor?: string;
  imageUri: string;
  accent: string;
}

const STORES: StoreItem[] = [
  {
    id: "1",
    name: "Zara",
    category: "Fashion · Apparel",
    rating: "4.5",
    distance: "0.9 km",
    tag: "New Arrivals",
    tagColor: "#A855F7",
    imageUri:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    accent: "#A855F7",
  },
  {
    id: "2",
    name: "Croma",
    category: "Electronics · Gadgets",
    rating: "4.3",
    distance: "1.4 km",
    tag: "Summer Sale",
    tagColor: "#26C6DA",
    imageUri:
      "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80",
    accent: "#26C6DA",
  },
  {
    id: "3",
    name: "Blue Tokai Coffee",
    category: "Café · Specialty Coffee",
    rating: "4.8",
    distance: "0.5 km",
    tag: "Fan Favourite",
    tagColor: "#F9A825",
    imageUri:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    accent: "#F9A825",
  },
  {
    id: "4",
    name: "H&M",
    category: "Fashion · Lifestyle",
    rating: "4.4",
    distance: "1.1 km",
    imageUri:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    accent: "#EF5350",
  },
  {
    id: "5",
    name: "Crossword Bookstores",
    category: "Books · Stationery",
    rating: "4.6",
    distance: "2.0 km",
    imageUri:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    accent: "#66BB6A",
  },
];

// ─── Store card ───────────────────────────────────────────────────────────────
function StoreCard({ item }: { item: StoreItem }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.storeCard}
      activeOpacity={0.85}
      onPress={() => router.push("/(tabs)/event")}
    >
      <View style={styles.storeImageWrap}>
        <Image
          source={{ uri: item.imageUri }}
          style={styles.storeImage}
          resizeMode="cover"
        />
        {item.tag && (
          <View
            style={[
              styles.storeTag,
              {
                backgroundColor: item.tagColor + "22",
                borderColor: item.tagColor + "55",
              },
            ]}
          >
            <Text style={[styles.storeTagText, { color: item.tagColor }]}>
              {item.tag}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.storeInfo}>
        <Text style={styles.storeName}>{item.name}</Text>
        <Text style={styles.storeCategory}>{item.category}</Text>
        <View style={styles.storeMeta}>
          <View style={styles.storeRating}>
            <Star size={11} color="#22C55E" fill="#22C55E" />
            <Text style={styles.storeRatingText}>{item.rating}</Text>
          </View>
          <View style={styles.storeDot} />
          <View style={styles.storeDistRow}>
            <MapPin size={11} color="rgba(255,255,255,0.35)" />
            <Text style={styles.storeDistText}>{item.distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Featured store banner ────────────────────────────────────────────────────
function FeaturedBanner() {
  return (
    <TouchableOpacity style={styles.featBanner} activeOpacity={0.88}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
        }}
        style={StyleSheet.absoluteFillObject as any}
        resizeMode="cover"
      />
      <View style={styles.featOverlay} />
      <View style={styles.featContent}>
        <Text style={styles.featLabel}>EXCLUSIVE</Text>
        <Text style={styles.featTitle}>Shop & Save Big</Text>
        <Text style={styles.featSub}>Up to 40% off at partner stores</Text>
        <TouchableOpacity style={styles.featBtn} activeOpacity={0.85}>
          <Text style={styles.featBtnText}>Explore Offers</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function StoresScreen() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <CategoryPageHeader
        activeTab="stores"
        searchPlaceholder="Search stores near you"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Featured banner */}
        <View style={styles.section}>
          <FeaturedBanner />
        </View>

        {/* Filter chips */}
        <View style={styles.section}>
          <FilterChips
            chips={[
              { id: "filter", label: "Filters", isFilter: true },
              { id: "near", label: "Near me" },
              { id: "open", label: "Open now" },
              { id: "offers", label: "Offers" },
            ]}
          />
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {STORE_CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.catChip,
                activeCategory === c && styles.catChipActive,
              ]}
              onPress={() => setActiveCategory(c)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.catText,
                  activeCategory === c && styles.catTextActive,
                ]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stores list */}
        <View style={styles.section}>
          <SectionTitle title="Stores Near You" onSeeAll={() => {}} />
          {STORES.map((s) => (
            <StoreCard key={s.id} item={s} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#09090B" },
  scroll: { paddingBottom: 20 },
  section: { paddingHorizontal: 16, marginTop: 16 },

  // Featured banner
  featBanner: {
    borderRadius: 20,
    overflow: "hidden",
    height: 160,
    justifyContent: "flex-end",
  },
  featOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5,5,15,0.55)",
  },
  featContent: { padding: 18, gap: 3 },
  featLabel: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 10,
    color: "#A855F7",
    letterSpacing: 2,
  },
  featTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 22,
    color: "#FFFFFF",
  },
  featSub: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    marginBottom: 8,
  },
  featBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#A855F7",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  featBtnText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
  },

  // Category chips
  catRow: {
    paddingHorizontal: 16,
    paddingRight: 20,
    gap: 8,
    marginTop: 14,
    marginBottom: 4,
  },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
  },
  catChipActive: {
    backgroundColor: "rgba(168,85,247,0.18)",
    borderColor: "rgba(168,85,247,0.45)",
  },
  catText: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
  catTextActive: {
    color: "#D8B4FE",
    fontFamily: "SpaceGrotesk_700Bold",
  },

  // Store card
  storeCard: {
    backgroundColor: "#13121A",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    marginBottom: 14,
    overflow: "hidden",
  },
  storeImageWrap: { position: "relative" },
  storeImage: { width: "100%", height: 160, backgroundColor: "#1A1A24" },
  storeTag: {
    position: "absolute",
    bottom: 10,
    left: 10,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  storeTagText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 11,
    letterSpacing: 0.3,
  },
  storeInfo: { padding: 14, gap: 4 },
  storeName: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
    color: "#F0EFF8",
  },
  storeCategory: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.38)",
  },
  storeMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  storeRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(34,197,94,0.12)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  storeRatingText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 12,
    color: "#22C55E",
  },
  storeDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  storeDistRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  storeDistText: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
  },
});
