import React, { useRef } from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View as DefaultView,
  Dimensions,
  StatusBar,
} from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { View, Text, useThemeColor } from "@/components/Themed";
import {
  Search,
  MapPin,
  ChevronDown,
  Bookmark,
  User,
  ChevronRight,
  Star,
  Clock,
  UtensilsCrossed,
  Clapperboard,
  Mic2,
  Trophy,
  ShoppingBag,
  Gamepad2,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

// --- Data ---
const CATEGORIES = [
  {
    id: "1",
    label: "Dining",
    Icon: UtensilsCrossed,
    color: "#FF6B6B",
    bg: "#FF6B6B15",
    border: "#FF6B6B30",
  },
  {
    id: "2",
    label: "Movies",
    Icon: Clapperboard,
    color: "#818CF8",
    bg: "#818CF815",
    border: "#818CF830",
  },
  {
    id: "3",
    label: "Events",
    Icon: Mic2,
    color: "#F9A825",
    bg: "#F9A82515",
    border: "#F9A82530",
  },
  {
    id: "4",
    label: "IPL",
    Icon: Trophy,
    color: "#EF5350",
    bg: "#EF535015",
    border: "#EF535030",
  },
  {
    id: "5",
    label: "Stores",
    Icon: ShoppingBag,
    color: "#26C6DA",
    bg: "#26C6DA15",
    border: "#26C6DA30",
  },
  {
    id: "6",
    label: "Activities",
    Icon: Gamepad2,
    color: "#66BB6A",
    bg: "#66BB6A15",
    border: "#66BB6A30",
  },
];

const FEATURED_EVENTS = [
  {
    id: "1",
    title: "Sunburn Arena ft. Martin Garrix",
    tag: "Music",
    date: "Sat, Apr 19",
    venue: "NESCO, Mumbai",
    price: "₹1,999",
    rating: "4.8",
    badge: "Selling Fast",
    badgeColor: "#FF6B6B",
    gradient: ["#1a0533", "#2d0a6b"],
    accent: "#A855F7",
  },
  {
    id: "2",
    title: "Comedy Nights with Zakir Khan",
    tag: "Comedy",
    date: "Sun, Apr 20",
    venue: "Amphitheatre, Bangalore",
    price: "₹799",
    rating: "4.9",
    badge: "Top Pick",
    badgeColor: "#F9A825",
    gradient: ["#0a1a33", "#0a2d4a"],
    accent: "#26C6DA",
  },
];

// --- Sub-components ---
function CategoryCard({ item }: { item: (typeof CATEGORIES)[0] }) {
  const router = useRouter();
  const { Icon, color, bg, border, label } = item;
  return (
    <TouchableOpacity
      style={[styles.catCard, { backgroundColor: bg, borderColor: border }]}
      activeOpacity={0.72}
      onPress={() => router.push("/event")}
    >
      <DefaultView
        style={[styles.catGlow, { backgroundColor: color + "25" }]}
      />
      <DefaultView
        style={[styles.catIconBox, { backgroundColor: color + "20" }]}
      >
        <Icon size={26} color={color} strokeWidth={1.8} />
      </DefaultView>
      <Text style={styles.catLabel}>{label}</Text>
      <DefaultView style={[styles.catAccentLine, { backgroundColor: color }]} />
    </TouchableOpacity>
  );
}

function FeaturedCard({ item }: { item: (typeof FEATURED_EVENTS)[0] }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.featuredCard}
      activeOpacity={0.85}
      onPress={() => router.push("/event")}
    >
      <DefaultView
        style={[styles.featuredInner, { backgroundColor: item.gradient[0] }]}
      >
        {/* Decorative glow blob */}
        <DefaultView
          style={[styles.glowBlob, { backgroundColor: item.accent + "33" }]}
        />

        {/* Badge */}
        <DefaultView
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
        </DefaultView>

        {/* Tag */}
        <Text style={[styles.featuredTag, { color: item.accent }]}>
          {item.tag}
        </Text>
        <Text style={styles.featuredTitle}>{item.title}</Text>

        <DefaultView style={styles.featuredMeta}>
          <DefaultView style={styles.metaRow}>
            <Clock size={12} color="rgba(255,255,255,0.5)" />
            <Text style={styles.metaText}>{item.date}</Text>
          </DefaultView>
          <DefaultView style={styles.metaRow}>
            <MapPin size={12} color="rgba(255,255,255,0.5)" />
            <Text style={styles.metaText}>{item.venue}</Text>
          </DefaultView>
        </DefaultView>

        <DefaultView style={styles.featuredFooter}>
          <Text style={[styles.featuredPrice, { color: item.accent }]}>
            {item.price}
          </Text>
          <DefaultView style={styles.ratingPill}>
            <Star size={11} color="#F9A825" fill="#F9A825" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </DefaultView>
        </DefaultView>
      </DefaultView>
    </TouchableOpacity>
  );
}

// --- Main Screen ---
export default function HomeScreen() {
  const router = useRouter();
  const textColor = useThemeColor({}, "text");

  return (
    <ScreenContainer title="Home" hideTitle>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── TOP BAR ── */}
        <DefaultView style={styles.topBar}>
          {/* Location */}
          <TouchableOpacity
            style={styles.locationRow}
            activeOpacity={0.7}
            onPress={() => router.push("/location")}
          >
            <MapPin size={16} color="#A855F7" />
            <DefaultView style={{ marginLeft: 6 }}>
              <DefaultView style={styles.locationInner}>
                <Text style={styles.locationCity}>Ranga Nagar</Text>
                <ChevronDown
                  size={14}
                  color="rgba(255,255,255,0.6)"
                  style={{ marginLeft: 3 }}
                />
              </DefaultView>
              <Text style={styles.locationArea}>Chromepet, Chennai</Text>
            </DefaultView>
          </TouchableOpacity>

          {/* Actions */}
          <DefaultView style={styles.topActions}>
            <TouchableOpacity style={styles.topIconBtn}>
              <Bookmark size={19} color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.topIconBtn, { marginLeft: 8 }]}>
              <User size={19} color={textColor} />
            </TouchableOpacity>
          </DefaultView>
        </DefaultView>

        {/* ── SEARCH BAR ── */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={() => router.push("/search")}
        >
          <Search size={18} color="rgba(255,255,255,0.35)" />
          <Text style={styles.searchPlaceholder}>
            Search for events, movies…
          </Text>
        </TouchableOpacity>

        {/* ── HERO BANNER ── */}
        <TouchableOpacity
          style={styles.heroBanner}
          activeOpacity={0.9}
          onPress={() => router.push("/event")}
        >
          <DefaultView style={styles.heroGradientBg}>
            <DefaultView style={styles.heroGlow} />
            <Text style={styles.heroEyebrow}>Limited Time Offer</Text>
            <Text style={styles.heroHeading}>
              Unlock up to{"\n"}
              <Text style={styles.heroHighlight}>50% OFF</Text>
            </Text>
            <DefaultView style={styles.gpayPill}>
              <Text style={styles.gpayText}>Instant ₹150 OFF via </Text>
              <Text
                style={[
                  styles.gpayText,
                  { color: "#4285F4", fontWeight: "700" },
                ]}
              >
                G
              </Text>
              <Text
                style={[
                  styles.gpayText,
                  { color: "#EA4335", fontWeight: "700" },
                ]}
              >
                o
              </Text>
              <Text
                style={[
                  styles.gpayText,
                  { color: "#FBBC04", fontWeight: "700" },
                ]}
              >
                o
              </Text>
              <Text
                style={[
                  styles.gpayText,
                  { color: "#4285F4", fontWeight: "700" },
                ]}
              >
                g
              </Text>
              <Text
                style={[
                  styles.gpayText,
                  { color: "#34A853", fontWeight: "700" },
                ]}
              >
                l
              </Text>
              <Text
                style={[
                  styles.gpayText,
                  { color: "#EA4335", fontWeight: "700" },
                ]}
              >
                e
              </Text>
              <Text style={styles.gpayText}> Pay</Text>
            </DefaultView>
            <DefaultView style={styles.heroBtn}>
              <Text style={styles.heroBtnText}>Explore now</Text>
              <ChevronRight size={15} color="#09090B" />
            </DefaultView>
          </DefaultView>
        </TouchableOpacity>

        {/* ── CATEGORIES ── */}
        <DefaultView style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore</Text>
        </DefaultView>

        <DefaultView style={styles.categoryGrid}>
          {CATEGORIES.map((item) => (
            <CategoryCard key={item.id} item={item} />
          ))}
        </DefaultView>

        {/* ── FEATURED EVENTS ── */}
        <DefaultView style={[styles.sectionHeader, { marginTop: 28 }]}>
          <Text style={styles.sectionTitle}>Featured Events</Text>
          <TouchableOpacity onPress={() => router.push("/event")}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </DefaultView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredScroll}
        >
          {FEATURED_EVENTS.map((item) => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </ScrollView>

        <DefaultView style={{ height: 100 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 20 },

  // Top bar
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  locationRow: { flexDirection: "row", alignItems: "center" },
  locationInner: { flexDirection: "row", alignItems: "center" },
  locationCity: {
    fontSize: 16,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#fff",
  },
  locationArea: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "rgba(255,255,255,0.45)",
    marginTop: 1,
  },
  topActions: { flexDirection: "row", alignItems: "center" },
  topIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.07)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Search
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  searchPlaceholder: {
    marginLeft: 10,
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.3)",
  },

  // Hero Banner
  heroBanner: {
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 28,
  },
  heroGradientBg: {
    backgroundColor: "#0d0020",
    padding: 24,
    minHeight: 190,
    justifyContent: "center",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#A855F7",
    opacity: 0.18,
    top: -60,
    right: -40,
  },
  heroEyebrow: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 12,
    color: "#A855F7",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  heroHeading: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 26,
    color: "#fff",
    lineHeight: 32,
    marginBottom: 12,
  },
  heroHighlight: {
    color: "#A855F7",
    fontSize: 32,
  },
  gpayPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  gpayText: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
  heroBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  heroBtnText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "#09090B",
    marginRight: 4,
  },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 20,
    color: "#fff",
  },
  seeAll: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 13,
    color: "#A855F7",
  },

  // Categories
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  catCard: {
    width: (width - 40 - 12) / 2,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    position: "relative",
  },
  catGlow: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    top: -20,
    right: -10,
  },
  catIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  catLabel: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    flex: 1,
  },
  catAccentLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    borderRadius: 2,
    opacity: 0.5,
  },

  // Featured events
  featuredScroll: { paddingRight: 20 },
  featuredCard: {
    width: width * 0.72,
    marginRight: 14,
    borderRadius: 20,
    overflow: "hidden",
  },
  featuredInner: {
    padding: 20,
    minHeight: 180,
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  glowBlob: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    top: -40,
    right: -30,
  },
  badge: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  featuredTag: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  featuredTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
    marginBottom: 10,
  },
  featuredMeta: { marginBottom: 14, gap: 4 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
  },
  featuredFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  featuredPrice: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 18,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(249,168,37,0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  ratingText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 12,
    color: "#F9A825",
  },
});
