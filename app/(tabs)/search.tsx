import React, { useState, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View as DefaultView,
  Dimensions,
  TextInput,
  FlatList,
  Animated,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text, useThemeColor } from "@/components/Themed";
import {
  ChevronLeft,
  Search,
  X,
  Clock,
  TrendingUp,
  MapPin,
  Utensils,
  Clapperboard,
  Mic2,
  Trophy,
  ShoppingBag,
  Gamepad2,
  Star,
  ChevronRight,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

// ─── Constants ────────────────────────────────────────────────
const ACCENT = "#A855F7";

const FILTER_TABS = [
  { id: "all", label: "All", Icon: null },
  { id: "dining", label: "Dining", Icon: Utensils },
  { id: "movies", label: "Movies", Icon: Clapperboard },
  { id: "events", label: "Events", Icon: Mic2 },
  { id: "stores", label: "Stores", Icon: ShoppingBag },
  { id: "activities", label: "Activities", Icon: Gamepad2 },
  { id: "ipl", label: "IPL", Icon: Trophy },
];

const RECENT_SEARCHES = [
  "TATA IPL 2026: Match 27 | Sunrisers Hyderabad vs...",
  "Sunburn Arena ft. Martin Garrix",
];

const TRENDING = [
  {
    id: "t1",
    title: "LIK: Love Insurance Kompany",
    sub: "Movie • Tamil",
    bg: "#1a1a2e",
    textColor: "#fff",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "t2",
    title: "Shaan Live",
    sub: "Explore Chennai",
    bg: "#2a1a0e",
    textColor: "#fff",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "t3",
    title: "TATA IPL 2026: Match 48 | Del...",
    sub: "Event • Sports",
    bg: "#0a1f3a",
    textColor: "#fff",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: "t4",
    title: "Make Your Own Perfume",
    sub: "Store • 10 items",
    bg: "#1a1a1a",
    textColor: "#fff",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "t5",
    title: "Dining Carnival",
    sub: "Get up to 50% OFF",
    bg: "#1f0a2a",
    textColor: "#fff",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "t6",
    title: "Heartful Leaders Foundation",
    sub: "Activity • HALF",
    bg: "#2a1f0a",
    textColor: "#fff",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=300&q=80",
  },
];

const HOTSPOTS = [
  {
    id: "h1",
    name: "Trident, GST Road",
    sub: "Hotel • 8.2 km",
    rating: "4.5",
    bg: "#1a2a1a",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=350&q=80",
  },
  {
    id: "h2",
    name: "Radisson Blu Hotel & Suites G...",
    sub: "Hotel • 10.4 km",
    rating: "4.7",
    bg: "#1a1a2a",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=350&q=80",
  },
  {
    id: "h3",
    name: "Phoenix Market City",
    sub: "Mall • 10.6 km",
    rating: "4.6",
    bg: "#2a1a1a",
    image:
      "https://images.unsplash.com/photo-1567401893930-7bec7b28fa13?auto=format&fit=crop&w=350&q=80",
  },
];

// ─── Result row (after typing) ────────────────────────────────
function ResultRow({
  title,
  sub,
  offer,
  bg,
  image,
}: {
  title: string;
  sub: string;
  offer?: string;
  bg: string;
  image?: string;
}) {
  return (
    <TouchableOpacity style={styles.resultRow} activeOpacity={0.7}>
      {image ? (
        <Image source={{ uri: image }} style={styles.resultThumb} />
      ) : (
        <DefaultView style={[styles.resultThumb, { backgroundColor: bg }]} />
      )}
      <DefaultView style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{title}</Text>
        <Text style={styles.resultSub}>{sub}</Text>
        {offer ? <Text style={styles.resultOffer}>{offer}</Text> : null}
      </DefaultView>
      <ChevronRight size={16} color="rgba(255,255,255,0.2)" />
    </TouchableOpacity>
  );
}

// ─── Trending card ────────────────────────────────────────────
function TrendingCard({ item }: { item: (typeof TRENDING)[0] }) {
  return (
    <TouchableOpacity
      style={[styles.trendCard, { backgroundColor: item.bg }]}
      activeOpacity={0.75}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.trendThumb} />
      ) : (
        <DefaultView style={styles.trendThumb} />
      )}
      <DefaultView style={styles.trendInfo}>
        <Text style={styles.trendTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.trendSub}>{item.sub}</Text>
      </DefaultView>
    </TouchableOpacity>
  );
}

// ─── Hotspot card ─────────────────────────────────────────────
function HotspotCard({ item }: { item: (typeof HOTSPOTS)[0] }) {
  return (
    <TouchableOpacity style={styles.hotspotCard} activeOpacity={0.8}>
      <DefaultView style={styles.hotspotThumbContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.hotspotThumb} />
        ) : (
          <DefaultView
            style={[styles.hotspotThumb, { backgroundColor: item.bg }]}
          />
        )}
        <DefaultView style={styles.hotspotRating}>
          <Star size={10} color="#F9A825" fill="#F9A825" />
          <Text style={styles.hotspotRatingText}>{item.rating}</Text>
        </DefaultView>
      </DefaultView>
      <Text style={styles.hotspotName} numberOfLines={2}>
        {item.name}
      </Text>
      <DefaultView style={styles.hotspotSubRow}>
        <MapPin size={11} color="rgba(255,255,255,0.4)" />
        <Text style={styles.hotspotSub}>{item.sub}</Text>
      </DefaultView>
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────────
export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const inputRef = useRef<TextInput>(null);

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
    outputRange: [0.3, 0.9],
  });

  const hasQuery = query.trim().length > 0;

  const MOCK_RESULTS = [
    {
      id: "r1",
      title: "LIK: Love Insurance Kompany",
      sub: "Movie • Tamil",
      offer: undefined,
      bg: "#1a1a2e",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "r2",
      title: "Bodycraft Salon",
      sub: "Store • 16.2 km • Anna Nagar",
      offer: "💎 Flat 25% OFF • Book appointment",
      bg: "#1e1e1e",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "r3",
      title: "Liquid Library by Four Points",
      sub: "Restaurant • 15 km • Velachery",
      offer: "💎 Flat 40% OFF + FLAT ₹250 OFF",
      bg: "#1a1205",
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "r4",
      title: "KAMA AYURVEDA",
      sub: "Store • 10.6 km • Phoenix City",
      offer: "💎 10% OFF up to ₹500 + Bank benefits",
      bg: "#1a0a0a",
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "r5",
      title: "Bombay Likes To Brunch",
      sub: "Event • Every Sun, 12–5 PM",
      offer: undefined,
      bg: "#111111",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "r6",
      title: "Juicy Chemistry",
      sub: "Store • 10.4 km • Phoenix City",
      offer: undefined,
      bg: "#0a1a0a",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── SEARCH BAR ── */}
        <DefaultView style={styles.searchRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/(tabs)");
              }
            }}
          >
            <ChevronLeft size={22} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.searchInputBox,
              {
                borderColor: animatedBorderColor,
                shadowOpacity: animatedShadowOpacity,
                transform: [{ scale: animatedScale }],
              },
            ]}
          >
            <Animated.View style={{ opacity: animatedIconOpacity }}>
              <Search size={16} color="#fff" />
            </Animated.View>
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              placeholder="Search for events, movies…"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={query}
              onChangeText={setQuery}
              autoFocus
              returnKeyType="search"
              onFocus={onFocus}
              onBlur={onBlur}
              selectionColor="#A855F7"
            />
            {hasQuery && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <X size={16} color="rgba(255,255,255,0.4)" />
              </TouchableOpacity>
            )}
          </Animated.View>
        </DefaultView>

        {/* ── FILTER TABS ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.filterTab, active && styles.filterTabActive]}
                onPress={() => setActiveFilter(tab.id)}
                activeOpacity={0.75}
              >
                {tab.Icon && (
                  <tab.Icon
                    size={13}
                    color={active ? "#fff" : "rgba(255,255,255,0.5)"}
                    strokeWidth={2}
                    style={{ marginRight: 5 }}
                  />
                )}
                <Text
                  style={[
                    styles.filterTabText,
                    active && styles.filterTabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
                {active && <DefaultView style={styles.filterActiveUnderline} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── DIVIDER ── */}
        <DefaultView style={styles.divider} />

        {/* ── CONTENT: Before search ── */}
        {!hasQuery ? (
          <>
            {/* Recent Searches */}
            <DefaultView style={styles.section}>
              <DefaultView style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent searches</Text>
                <TouchableOpacity>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              </DefaultView>

              {RECENT_SEARCHES.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.recentRow}
                  activeOpacity={0.7}
                >
                  <DefaultView style={styles.recentIconBox}>
                    <Clock size={15} color="rgba(255,255,255,0.4)" />
                  </DefaultView>
                  <Text style={styles.recentText} numberOfLines={1}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </DefaultView>

            {/* Trending */}
            <DefaultView style={styles.section}>
              <DefaultView style={styles.sectionHeader}>
                <DefaultView style={styles.sectionTitleRow}>
                  <TrendingUp
                    size={16}
                    color={ACCENT}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.sectionTitle}>Trending in Chennai</Text>
                </DefaultView>
              </DefaultView>

              <DefaultView style={styles.trendGrid}>
                {TRENDING.map((item) => (
                  <TrendingCard key={item.id} item={item} />
                ))}
              </DefaultView>
            </DefaultView>

            {/* Popular Hotspots */}
            <DefaultView style={styles.section}>
              <DefaultView style={styles.sectionHeader}>
                <DefaultView style={styles.sectionTitleRow}>
                  <MapPin size={16} color={ACCENT} style={{ marginRight: 6 }} />
                  <Text style={styles.sectionTitle}>
                    Popular hotspots near you
                  </Text>
                </DefaultView>
              </DefaultView>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
              >
                {HOTSPOTS.map((item) => (
                  <HotspotCard key={item.id} item={item} />
                ))}
              </ScrollView>
            </DefaultView>
          </>
        ) : (
          /* ── CONTENT: After search ── */
          <DefaultView style={styles.section}>
            {MOCK_RESULTS.map((item) => (
              <ResultRow
                key={item.id}
                title={item.title}
                sub={item.sub}
                offer={item.offer}
                bg={item.bg}
                image={item.image}
              />
            ))}
          </DefaultView>
        )}

        <DefaultView style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#09090B",
  },
  scrollContent: { paddingBottom: 20 },

  // Search bar
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.08)",
    gap: 10,
    shadowColor: "#A855F7",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 14,
    color: "#fff",
    padding: 0,
    outlineStyle: "none" as any,
  },

  // Filter tabs
  filterScroll: { marginBottom: 0 },
  filterContent: { paddingLeft: 20, paddingRight: 20, gap: 6 },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    position: "relative",
  },
  filterTabActive: {
    backgroundColor: "rgba(168,85,247,0.12)",
  },
  filterTabText: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
  },
  filterTabTextActive: {
    color: "#fff",
    fontFamily: "SpaceGrotesk_600SemiBold",
  },
  filterActiveUnderline: {
    position: "absolute",
    bottom: 0,
    left: 14,
    right: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: ACCENT,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginTop: 6,
    marginBottom: 24,
    marginHorizontal: 20,
  },

  // Section
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center" },
  sectionTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
    color: "#fff",
  },
  clearText: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 13,
    color: ACCENT,
    textDecorationLine: "underline",
  },

  // Recent
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.04)",
    gap: 12,
    paddingHorizontal: 20,
  },
  recentIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  recentText: {
    flex: 1,
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
  },

  // Trending grid — 2 columns
  trendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 20,
  },
  trendCard: {
    width: (width - 40 - 10) / 2,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  trendThumb: {
    width: "100%",
    height: 90,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  trendInfo: {
    padding: 10,
  },
  trendTitle: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 13,
    color: "#fff",
    marginBottom: 3,
    lineHeight: 18,
  },
  trendSub: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
  },

  // Hotspot cards — horizontal scroll
  hotspotCard: {
    width: width * 0.46,
    borderRadius: 16,
    overflow: "hidden",
  },
  hotspotThumbContainer: {
    width: "100%",
    height: 120,
    borderRadius: 14,
    marginBottom: 8,
    position: "relative",
    overflow: "hidden",
  },
  hotspotThumb: {
    width: "100%",
    height: "100%",
  },
  hotspotRating: {
    position: "absolute",
    bottom: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  hotspotRatingText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 11,
    color: "#F9A825",
  },
  hotspotName: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 13,
    color: "#fff",
    marginBottom: 4,
    lineHeight: 18,
  },
  hotspotSubRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  hotspotSub: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
  },

  // Results (after typing)
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.04)",
    gap: 14,
    paddingHorizontal: 20,
  },
  resultThumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  resultInfo: {
    flex: 1,
    gap: 2,
  },
  resultTitle: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 14,
    color: "#fff",
  },
  resultSub: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  resultOffer: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 11,
    color: ACCENT,
    marginTop: 2,
  },
});
