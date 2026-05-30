import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  MapPin,
  ChevronDown,
  Search,
  User,
  Star,
  Clock,
  MapPin as MapPinSm,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SectionTitle } from "@/components/SectionTitle";

const { width } = Dimensions.get("window");

// ─── Category data ────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "1",
    label: "Dining",
    emoji: "🍽️",
    bg: "#1E1B2E",
    glow: "#FF6B6B",
    route: "/(tabs)/dining",
  },
  {
    id: "2",
    label: "Movies",
    emoji: "🎬",
    bg: "#1A1E30",
    glow: "#818CF8",
    route: "/(tabs)/movies",
  },
  {
    id: "3",
    label: "Events",
    emoji: "🎤",
    bg: "#1E1D28",
    glow: "#F9A825",
    route: "/(tabs)/events",
  },
  {
    id: "4",
    label: "IPL",
    emoji: "🏏",
    bg: "#211A1A",
    glow: "#EF5350",
    route: "/(tabs)/ipl",
  },
  {
    id: "5",
    label: "Shopping",
    emoji: "🛍️",
    bg: "#181E22",
    glow: "#26C6DA",
    route: "/(tabs)/stores",
  },
  {
    id: "6",
    label: "Activities",
    emoji: "🎯",
    bg: "#181E1A",
    glow: "#66BB6A",
    route: "/(tabs)/activities",
  },
];

// ─── Hero banners ─────────────────────────────────────────────────────────────
const HERO_BANNERS = [
  {
    id: "1",
    title: "Summertime\nMadness",
    sub: "at water parks, arcades and more",
    cta: "Up to 50% OFF",
    imageUri:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
    overlayColors: ["rgba(0,60,120,0.65)", "rgba(0,30,80,0.85)"] as [
      string,
      string,
    ],
    accentColor: "#ADFF2F",
  },
  {
    id: "2",
    title: "Finals\nFever 🏆",
    sub: "Dine out with exclusive match-day offers",
    cta: "Explore Dining",
    imageUri:
      "https://images.unsplash.com/photo-1575367439058-6096bb9cf5e2?w=900&q=80",
    overlayColors: ["rgba(15,30,5,0.55)", "rgba(5,15,5,0.85)"] as [
      string,
      string,
    ],
    accentColor: "#ADFF2F",
  },
  {
    id: "3",
    title: "Live\nExperiences",
    sub: "Concerts, comedy nights & more",
    cta: "Book now",
    imageUri:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=80",
    overlayColors: ["rgba(60,0,100,0.5)", "rgba(20,0,40,0.88)"] as [
      string,
      string,
    ],
    accentColor: "#D8B4FE",
  },
];

// ─── Spotlight items ──────────────────────────────────────────────────────────
const SPOTLIGHT_ITEMS = [
  {
    id: "1",
    title: "Scarlett's",
    tag: "Dining",
    tagColor: "#FF6B6B",
    rating: "4.8",
    meta: "Lower Parel · 0.8 km",
    imageUri:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    badge: "Top Rated",
    badgeColor: "#F9A825",
    accent: "#FF6B6B",
  },
  {
    id: "2",
    title: "Sunburn Arena",
    tag: "Music",
    tagColor: "#A855F7",
    rating: "4.9",
    meta: "NESCO, Mumbai · Sat Jun 14",
    imageUri:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
    badge: "Selling Fast",
    badgeColor: "#EF5350",
    accent: "#A855F7",
  },
  {
    id: "3",
    title: "Obsession",
    tag: "Movies",
    tagColor: "#818CF8",
    rating: "8.1",
    meta: "Now Showing · Horror",
    imageUri:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&q=80",
    badge: "Must Watch",
    badgeColor: "#26C6DA",
    accent: "#818CF8",
  },
  {
    id: "4",
    title: "TEDxBangalore",
    tag: "Events",
    tagColor: "#F9A825",
    rating: "4.7",
    meta: "NIMHANS · Sat Jun 21",
    imageUri:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    badge: "Popular",
    badgeColor: "#66BB6A",
    accent: "#F9A825",
  },
];

// ─── Trending restaurants ─────────────────────────────────────────────────────
const TRENDING = [
  {
    id: "1",
    name: "The Bombay Canteen",
    cuisine: "Modern Indian",
    rating: "4.7",
    imageUri:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80",
    tag: "20% OFF",
  },
  {
    id: "2",
    name: "Social",
    cuisine: "Continental · Bar",
    rating: "4.5",
    imageUri:
      "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=500&q=80",
    tag: "BOGO",
  },
  {
    id: "3",
    name: "Farzi Cafe",
    cuisine: "Modern Indian",
    rating: "4.8",
    imageUri:
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=500&q=80",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

// Hero Carousel
function HeroCarousel() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Dot values — fixed count, no hooks in loops
  const d0 = useRef(new Animated.Value(1)).current;
  const d1 = useRef(new Animated.Value(0.3)).current;
  const d2 = useRef(new Animated.Value(0.3)).current;
  const dots = [d0, d1, d2];

  useEffect(() => {
    dots.forEach((d, i) => {
      Animated.timing(d, {
        toValue: i === activeIdx ? 1 : 0.3,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }, [activeIdx]);

  useEffect(() => {
    const t = setInterval(() => {
      const next = (activeIdx + 1) % HERO_BANNERS.length;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setActiveIdx(next);
    }, 3800);
    return () => clearInterval(t);
  }, [activeIdx]);

  return (
    <View style={heroStyles.wrap}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIdx(idx);
        }}
        scrollEventThrottle={16}
      >
        {HERO_BANNERS.map((banner) => (
          <TouchableOpacity
            key={banner.id}
            style={heroStyles.slide}
            activeOpacity={0.92}
            onPress={() => router.push("/(tabs)/events" as any)}
          >
            <Image
              source={{ uri: banner.imageUri }}
              style={heroStyles.img}
              resizeMode="cover"
            />
            <LinearGradient
              colors={banner.overlayColors}
              style={StyleSheet.absoluteFill}
            />
            <View style={heroStyles.content}>
              <Text style={[heroStyles.title, { color: banner.accentColor }]}>
                {banner.title}
              </Text>
              <Text style={heroStyles.sub}>{banner.sub}</Text>
              <View style={heroStyles.ctaBtn}>
                <Text style={heroStyles.ctaText}>{banner.cta} ›</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Dots */}
      <View style={heroStyles.dotsRow}>
        {dots.map((d, i) => (
          <Animated.View
            key={i}
            style={[
              heroStyles.dot,
              { opacity: d },
              i === activeIdx && heroStyles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

// Category card — Zomato District style (dark card + big emoji + label)
function CategoryCard({ item }: { item: (typeof CATEGORIES)[0] }) {
  const router = useRouter();
  const CARD_W = (width - 16 * 2 - 12) / 3;

  return (
    <TouchableOpacity
      style={[catStyles.card, { width: CARD_W, backgroundColor: item.bg }]}
      activeOpacity={0.76}
      onPress={() => router.push(item.route as any)}
    >
      {/* Subtle glow */}
      <View style={[catStyles.glow, { backgroundColor: item.glow + "20" }]} />
      <Text style={catStyles.emoji}>{item.emoji}</Text>
      <Text style={catStyles.label}>{item.label}</Text>
    </TouchableOpacity>
  );
}

// Spotlight card — horizontal scroll
function SpotlightCard({ item }: { item: (typeof SPOTLIGHT_ITEMS)[0] }) {
  const router = useRouter();
  const CARD_W = width * 0.68;

  return (
    <TouchableOpacity
      style={[spotStyles.card, { width: CARD_W }]}
      activeOpacity={0.88}
      onPress={() => router.push("/(tabs)/event" as any)}
    >
      <Image
        source={{ uri: item.imageUri }}
        style={spotStyles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(9,9,11,0.92)"]}
        locations={[0.35, 1]}
        style={StyleSheet.absoluteFill}
      />
      {/* Badge */}
      <View
        style={[
          spotStyles.badge,
          {
            backgroundColor: item.badgeColor + "22",
            borderColor: item.badgeColor + "66",
          },
        ]}
      >
        <Text style={[spotStyles.badgeText, { color: item.badgeColor }]}>
          {item.badge}
        </Text>
      </View>
      {/* Content */}
      <View style={spotStyles.content}>
        <View
          style={[spotStyles.tagPill, { backgroundColor: item.accent + "25" }]}
        >
          <Text style={[spotStyles.tagText, { color: item.accent }]}>
            {item.tag}
          </Text>
        </View>
        <Text style={spotStyles.title}>{item.title}</Text>
        <View style={spotStyles.metaRow}>
          <View style={spotStyles.ratingRow}>
            <Star size={11} color="#F9A825" fill="#F9A825" />
            <Text style={spotStyles.ratingText}>{item.rating}</Text>
          </View>
          <View style={spotStyles.metaDot} />
          <Text style={spotStyles.metaText}>{item.meta}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Trending restaurant card — horizontal compact
function TrendingCard({ item }: { item: (typeof TRENDING)[0] }) {
  const router = useRouter();
  const CARD_W = width * 0.52;

  return (
    <TouchableOpacity
      style={[trendStyles.card, { width: CARD_W }]}
      activeOpacity={0.85}
      onPress={() => router.push("/(tabs)/dining" as any)}
    >
      <View style={trendStyles.imageWrap}>
        <Image
          source={{ uri: item.imageUri }}
          style={trendStyles.image}
          resizeMode="cover"
        />
        {item.tag && (
          <View style={trendStyles.tagBadge}>
            <Text style={trendStyles.tagBadgeText}>{item.tag}</Text>
          </View>
        )}
      </View>
      <View style={trendStyles.info}>
        <Text style={trendStyles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={trendStyles.cuisine}>{item.cuisine}</Text>
        <View style={trendStyles.ratingRow}>
          <Star size={11} color="#22C55E" fill="#22C55E" />
          <Text style={trendStyles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();

  // Split categories into rows: 3 + 3
  const row1 = CATEGORIES.slice(0, 3);
  const row2 = CATEGORIES.slice(3, 6);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.locationRow}
            activeOpacity={0.75}
            onPress={() => router.push("/(tabs)/location" as any)}
          >
            <MapPin size={16} color="#A855F7" strokeWidth={2} />
            <View style={{ marginLeft: 8 }}>
              <View style={styles.cityRow}>
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
            onPress={() => router.push("/(tabs)/profile" as any)}
          >
            <User size={18} color="rgba(255,255,255,0.75)" strokeWidth={1.8} />
          </TouchableOpacity>
        </View>

        {/* ── Search ── */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.85}
          onPress={() => router.push("/(tabs)/search" as any)}
        >
          <Search size={16} color="rgba(255,255,255,0.3)" />
          <Text style={styles.searchPlaceholder}>
            Search for 'Vent it out – Mumbai'
          </Text>
        </TouchableOpacity>

        {/* ── Hero Carousel ── */}
        <HeroCarousel />

        {/* ── Category Grid ── */}
        <View style={styles.catSection}>
          {/* Row 1 */}
          <View style={styles.catRow}>
            {row1.map((item) => (
              <CategoryCard key={item.id} item={item} />
            ))}
          </View>
          {/* Row 2 */}
          <View style={[styles.catRow, { marginTop: 10 }]}>
            {row2.map((item) => (
              <CategoryCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* ── In the Spotlight ── */}
        <View style={styles.section}>
          <SectionTitle
            title="In the Spotlight"
            onSeeAll={() => router.push("/(tabs)/events" as any)}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hScroll}
        >
          {SPOTLIGHT_ITEMS.map((item) => (
            <SpotlightCard key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* ── Trending Dining ── */}
        <View style={[styles.section, { marginTop: 28 }]}>
          <SectionTitle
            title="Trending Restaurants"
            onSeeAll={() => router.push("/(tabs)/dining" as any)}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hScroll}
        >
          {TRENDING.map((item) => (
            <TrendingCard key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* ── Quick Explore Banner ── */}
        <TouchableOpacity
          style={styles.exploreBanner}
          activeOpacity={0.88}
          onPress={() => router.push("/(tabs)/events" as any)}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
            }}
            style={StyleSheet.absoluteFillObject as any}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(40,0,80,0.4)", "rgba(10,0,25,0.88)"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.exploreContent}>
            <Text style={styles.exploreEyebrow}>UPCOMING</Text>
            <Text style={styles.exploreTitle}>
              Coldplay · Music of{"\n"}the Spheres
            </Text>
            <View style={styles.exploreBtn}>
              <Text style={styles.exploreBtnText}>Book tickets ›</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#09090B" },
  scroll: { paddingBottom: 20 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 14,
  },
  locationRow: { flexDirection: "row", alignItems: "center" },
  cityRow: { flexDirection: "row", alignItems: "center" },
  cityText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 17,
    color: "#FFFFFF",
  },
  areaText: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.42)",
    marginTop: 1,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  searchPlaceholder: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.28)",
  },

  // Category grid
  catSection: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 4,
  },
  catRow: {
    flexDirection: "row",
    gap: 12,
  },

  // Horizontal scroll lists
  hScroll: {
    paddingHorizontal: 16,
    paddingRight: 20,
    gap: 12,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 28,
  },

  // Explore banner (bottom promo)
  exploreBanner: {
    marginHorizontal: 16,
    marginTop: 28,
    borderRadius: 22,
    overflow: "hidden",
    height: 200,
    justifyContent: "flex-end",
  },
  exploreContent: {
    padding: 22,
    gap: 5,
  },
  exploreEyebrow: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 10,
    color: "#D8B4FE",
    letterSpacing: 2.5,
  },
  exploreTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 22,
    color: "#FFFFFF",
    lineHeight: 28,
    marginBottom: 10,
  },
  exploreBtn: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.25)",
  },
  exploreBtnText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});

// ─── Hero carousel styles ─────────────────────────────────────────────────────
const heroStyles = StyleSheet.create({
  wrap: { marginBottom: 4 },
  slide: {
    width,
    height: width * 0.54,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A24",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 22,
    gap: 5,
  },
  title: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  sub: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    marginBottom: 6,
  },
  ctaBtn: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  ctaText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "#09090B",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 12,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: {
    width: 20,
    backgroundColor: "#A855F7",
  },
});

// ─── Category card styles ─────────────────────────────────────────────────────
const catStyles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
  },
  glow: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    top: -10,
    right: -10,
  },
  emoji: {
    fontSize: 34,
    marginBottom: 8,
  },
  label: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

// ─── Spotlight card styles ────────────────────────────────────────────────────
const spotStyles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    height: 240,
    backgroundColor: "#1A1A24",
    justifyContent: "flex-end",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 10,
    letterSpacing: 0.4,
  },
  content: {
    padding: 16,
    gap: 5,
  },
  tagPill: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginBottom: 2,
  },
  tagText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 18,
    color: "#FFFFFF",
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(249,168,37,0.15)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 11,
    color: "#F9A825",
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  metaText: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    flex: 1,
  },
});

// ─── Trending card styles ─────────────────────────────────────────────────────
const trendStyles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: "#13121A",
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
  },
  imageWrap: { position: "relative" },
  image: {
    width: "100%",
    height: 130,
    backgroundColor: "#1A1A24",
  },
  tagBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(168,85,247,0.9)",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  tagBadgeText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 11,
    color: "#FFFFFF",
  },
  info: {
    padding: 12,
    gap: 3,
  },
  name: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 14,
    color: "#F0EFF8",
  },
  cuisine: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.38)",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 3,
  },
  ratingText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 12,
    color: "#22C55E",
  },
});
