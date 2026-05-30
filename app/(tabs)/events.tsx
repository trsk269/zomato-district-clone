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
import { Star, MapPin, Clock } from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// ─── Data ─────────────────────────────────────────────────────────────────────
const EVENT_CATEGORIES = [
  "All",
  "Music",
  "Comedy",
  "Sports",
  "Art",
  "Food",
  "Tech",
];

interface EventItem {
  id: string;
  title: string;
  tag: string;
  date: string;
  venue: string;
  price: string;
  rating: string;
  imageUri: string;
  badge?: string;
  badgeColor?: string;
  accent: string;
}

const FEATURED_EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Sunburn Arena ft. Martin Garrix",
    tag: "Music",
    date: "Sat, Jun 14 · 6:00 PM",
    venue: "NESCO, Mumbai",
    price: "₹1,999",
    rating: "4.8",
    badge: "Selling Fast",
    badgeColor: "#EF5350",
    accent: "#A855F7",
    imageUri:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  },
  {
    id: "2",
    title: "Comedy Nights with Zakir Khan",
    tag: "Comedy",
    date: "Sun, Jun 15 · 8:00 PM",
    venue: "Amphitheatre, Bangalore",
    price: "₹799",
    rating: "4.9",
    badge: "Top Pick",
    badgeColor: "#F9A825",
    accent: "#26C6DA",
    imageUri:
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80",
  },
  {
    id: "3",
    title: "Coldplay: Music of the Spheres",
    tag: "Music",
    date: "Fri, Jun 20 · 7:30 PM",
    venue: "DY Patil Stadium, Mumbai",
    price: "₹2,500",
    rating: "4.9",
    badge: "Almost Full",
    badgeColor: "#FF6B6B",
    accent: "#818CF8",
    imageUri:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
  },
];

const ALL_EVENTS: EventItem[] = [
  {
    id: "4",
    title: "Art Walk: Modern Impressions",
    tag: "Art",
    date: "Sat, Jun 7 · 4:00 PM",
    venue: "NGMA, New Delhi",
    price: "₹300",
    rating: "4.5",
    accent: "#66BB6A",
    imageUri:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
  },
  {
    id: "5",
    title: "Food Festival: Street Eats Edition",
    tag: "Food",
    date: "Sun, Jun 8 · 11:00 AM",
    venue: "JLN Stadium, Delhi",
    price: "₹199",
    rating: "4.6",
    accent: "#F9A825",
    imageUri:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  },
  {
    id: "6",
    title: "TEDxBangalore 2025",
    tag: "Tech",
    date: "Sat, Jun 21 · 9:00 AM",
    venue: "NIMHANS, Bangalore",
    price: "₹500",
    rating: "4.7",
    accent: "#EF5350",
    imageUri:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
];

// ─── Featured card ────────────────────────────────────────────────────────────
function FeaturedEventCard({ item }: { item: EventItem }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.featCard, { width: width * 0.75 }]}
      activeOpacity={0.85}
      onPress={() => router.push("/(tabs)/event")}
    >
      <Image
        source={{ uri: item.imageUri }}
        style={styles.featImage}
        resizeMode="cover"
      />
      <View
        style={[styles.featOverlay, { backgroundColor: item.accent + "22" }]}
      />
      {item.badge && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: item.badgeColor + "22",
              borderColor: item.badgeColor + "55",
            },
          ]}
        >
          <Text style={[styles.badgeText, { color: item.badgeColor }]}>
            {item.badge}
          </Text>
        </View>
      )}
      <View style={styles.featContent}>
        <Text style={[styles.featTag, { color: item.accent }]}>{item.tag}</Text>
        <Text style={styles.featTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.featMeta}>
          <View style={styles.metaRow}>
            <Clock size={11} color="rgba(255,255,255,0.45)" />
            <Text style={styles.metaText}>{item.date}</Text>
          </View>
          <View style={styles.metaRow}>
            <MapPin size={11} color="rgba(255,255,255,0.45)" />
            <Text style={styles.metaText}>{item.venue}</Text>
          </View>
        </View>
        <View style={styles.featFooter}>
          <Text style={[styles.featPrice, { color: item.accent }]}>
            {item.price}
          </Text>
          <View style={styles.ratingPill}>
            <Star size={10} color="#F9A825" fill="#F9A825" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── List event card ──────────────────────────────────────────────────────────
function EventListCard({ item }: { item: EventItem }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.listCard}
      activeOpacity={0.85}
      onPress={() => router.push("/(tabs)/event")}
    >
      <Image
        source={{ uri: item.imageUri }}
        style={styles.listImage}
        resizeMode="cover"
      />
      <View style={styles.listInfo}>
        <View style={[styles.listTag, { backgroundColor: item.accent + "20" }]}>
          <Text style={[styles.listTagText, { color: item.accent }]}>
            {item.tag}
          </Text>
        </View>
        <Text style={styles.listTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.listDate}>{item.date}</Text>
        <Text style={styles.listVenue} numberOfLines={1}>
          {item.venue}
        </Text>
        <View style={styles.listFooter}>
          <Text style={styles.listPrice}>{item.price}</Text>
          <View style={styles.ratingPill}>
            <Star size={10} color="#F9A825" fill="#F9A825" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function EventsScreen() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <CategoryPageHeader
        activeTab="events"
        searchPlaceholder="Search for events near you"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {EVENT_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catChip,
                activeCategory === cat && styles.catChipActive,
              ]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.catText,
                  activeCategory === cat && styles.catTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured events */}
        <View style={styles.section}>
          <SectionTitle title="Featured Events" onSeeAll={() => {}} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featRow}
        >
          {FEATURED_EVENTS.map((item) => (
            <FeaturedEventCard key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* All events */}
        <View style={[styles.section, { marginTop: 24 }]}>
          <SectionTitle title="All Events" onSeeAll={() => {}} />
          {ALL_EVENTS.map((item) => (
            <EventListCard key={item.id} item={item} />
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
  section: { paddingHorizontal: 16, marginTop: 8 },

  // Category chips
  catRow: {
    paddingHorizontal: 16,
    paddingRight: 20,
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
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

  // Featured
  featRow: { paddingHorizontal: 16, paddingRight: 20, gap: 12 },
  featCard: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#13121A",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
  },
  featImage: { width: "100%", height: 180 },
  featOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: 80,
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  featContent: { padding: 16, gap: 4 },
  featTag: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  featTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
    color: "#F0EFF8",
    lineHeight: 22,
  },
  featMeta: { gap: 3, marginTop: 4, marginBottom: 8 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  featFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  featPrice: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 18,
  },

  // List card
  listCard: {
    flexDirection: "row",
    backgroundColor: "#13121A",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    overflow: "hidden",
    marginBottom: 14,
  },
  listImage: { width: 110, height: 120 },
  listInfo: { flex: 1, padding: 12, gap: 4 },
  listTag: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 2,
  },
  listTagText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  listTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 14,
    color: "#F0EFF8",
    lineHeight: 20,
  },
  listDate: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 12,
    color: "#F9A825",
  },
  listVenue: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.38)",
  },
  listFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  listPrice: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 14,
    color: "#A855F7",
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(249,168,37,0.12)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 11,
    color: "#F9A825",
  },
});
