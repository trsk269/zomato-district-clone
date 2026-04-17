import React, { useState, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View as DefaultView,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
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
  { id: "ipl", label: "IPL", Icon: Trophy },
  { id: "stores", label: "Stores", Icon: ShoppingBag },
  { id: "activities", label: "Activities", Icon: Gamepad2 },
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
    hasImage: true,
  },
  {
    id: "t2",
    title: "Shaan Live",
    sub: "Explore Chennai",
    bg: "#2a1a0e",
    textColor: "#fff",
    hasImage: true,
  },
  {
    id: "t3",
    title: "TATA IPL 2026: Match 48 | Del...",
    sub: "Event • Sports",
    bg: "#0a1f3a",
    textColor: "#fff",
    hasImage: true,
  },
  {
    id: "t4",
    title: "Make Your Own Perfume",
    sub: "Store • 10 items",
    bg: "#1a1a1a",
    textColor: "#fff",
    hasImage: true,
  },
  {
    id: "t5",
    title: "Dining Carnival",
    sub: "Get up to 50% OFF",
    bg: "#1f0a2a",
    textColor: "#fff",
    hasImage: true,
  },
  {
    id: "t6",
    title: "Heartful Leaders Foundation",
    sub: "Activity • HALF",
    bg: "#2a1f0a",
    textColor: "#fff",
    hasImage: true,
  },
];

const HOTSPOTS = [
  {
    id: "h1",
    name: "Trident, GST Road",
    sub: "Hotel • 8.2 km",
    rating: "4.5",
    bg: "#1a2a1a",
  },
  {
    id: "h2",
    name: "Radisson Blu Hotel & Suites G...",
    sub: "Hotel • 10.4 km",
    rating: "4.7",
    bg: "#1a1a2a",
  },
  {
    id: "h3",
    name: "Phoenix Market City",
    sub: "Mall • 10.6 km",
    rating: "4.6",
    bg: "#2a1a1a",
  },
];

// ─── Result row (after typing) ────────────────────────────────
function ResultRow({
  title,
  sub,
  offer,
  bg,
}: {
  title: string;
  sub: string;
  offer?: string;
  bg: string;
}) {
  return (
    <TouchableOpacity style={styles.resultRow} activeOpacity={0.7}>
      <DefaultView style={[styles.resultThumb, { backgroundColor: bg }]} />
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
      <DefaultView style={styles.trendThumb} />
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
      <DefaultView style={[styles.hotspotThumb, { backgroundColor: item.bg }]}>
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
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const inputRef = useRef<TextInput>(null);

  const hasQuery = query.trim().length > 0;

  const MOCK_RESULTS = [
    {
      id: "r1",
      title: "LIK: Love Insurance Kompany",
      sub: "Movie • Tamil",
      offer: undefined,
      bg: "#1a1a2e",
    },
    {
      id: "r2",
      title: "Bodycraft Salon",
      sub: "Store • 16.2 km • Anna Nagar",
      offer: "💎 Flat 25% OFF • Book appointment",
      bg: "#1e1e1e",
    },
    {
      id: "r3",
      title: "Liquid Library by Four Points",
      sub: "Restaurant • 15 km • Velachery",
      offer: "💎 Flat 40% OFF + FLAT ₹250 OFF",
      bg: "#1a1205",
    },
    {
      id: "r4",
      title: "KAMA AYURVEDA",
      sub: "Store • 10.6 km • Phoenix City",
      offer: "💎 10% OFF up to ₹500 + Bank benefits",
      bg: "#1a0a0a",
    },
    {
      id: "r5",
      title: "Bombay Likes To Brunch",
      sub: "Event • Every Sun, 12–5 PM",
      offer: undefined,
      bg: "#111111",
    },
    {
      id: "r6",
      title: "Juicy Chemistry",
      sub: "Store • 10.4 km • Phoenix City",
      offer: undefined,
      bg: "#0a1a0a",
    },
  ];

  return (
    <ScreenContainer title="" hideTitle>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── SEARCH BAR ── */}
        <DefaultView style={styles.searchRow}>
          <TouchableOpacity style={styles.backBtn}>
            <ChevronLeft size={22} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>

          <DefaultView style={styles.searchInputBox}>
            <Search size={16} color="rgba(255,255,255,0.3)" />
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              placeholder="Search for events, movies…"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={query}
              onChangeText={setQuery}
              autoFocus
              returnKeyType="search"
            />
            {hasQuery && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <X size={16} color="rgba(255,255,255,0.4)" />
              </TouchableOpacity>
            )}
          </DefaultView>
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
                contentContainerStyle={{ gap: 12, paddingRight: 4 }}
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
              />
            ))}
          </DefaultView>
        )}

        <DefaultView style={{ height: 100 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 20 },

  // Search bar
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
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
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 14,
    color: "#fff",
    padding: 0,
  },

  // Filter tabs
  filterScroll: { marginBottom: 0 },
  filterContent: { paddingRight: 16, gap: 6 },
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
  },

  // Section
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
  hotspotThumb: {
    width: "100%",
    height: 120,
    borderRadius: 14,
    marginBottom: 8,
    position: "relative",
    overflow: "hidden",
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
