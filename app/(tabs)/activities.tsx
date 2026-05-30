import React from "react";
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
import { Star, Clock, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 16 * 2 - 12) / 2;

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Activity {
  id: string;
  name: string;
  category: string;
  rating: string;
  duration: string;
  price: string;
  imageUri: string;
  accent: string;
  tag?: string;
}

const TRENDING: Activity[] = [
  {
    id: "1",
    name: "Bouldering at Boulder Box",
    category: "Sports · Climbing",
    rating: "4.8",
    duration: "2 hrs",
    price: "₹599",
    imageUri:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80",
    accent: "#EF5350",
    tag: "Trending",
  },
  {
    id: "2",
    name: "Pottery Workshop",
    category: "Arts & Crafts",
    rating: "4.9",
    duration: "3 hrs",
    price: "₹899",
    imageUri:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    accent: "#F9A825",
    tag: "Top Rated",
  },
  {
    id: "3",
    name: "Escape Room: Lost in Time",
    category: "Games · Adventure",
    rating: "4.7",
    duration: "1 hr",
    price: "₹699",
    imageUri:
      "https://images.unsplash.com/photo-1525026198548-4baa812f1183?w=600&q=80",
    accent: "#818CF8",
  },
  {
    id: "4",
    name: "Aerial Yoga",
    category: "Fitness · Wellness",
    rating: "4.6",
    duration: "1.5 hrs",
    price: "₹499",
    imageUri:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
    accent: "#26C6DA",
  },
  {
    id: "5",
    name: "Go-Karting Championship",
    category: "Racing · Sports",
    rating: "4.5",
    duration: "30 min",
    price: "₹349",
    imageUri:
      "https://images.unsplash.com/photo-1570993492891-70d0e9f47dbe?w=600&q=80",
    accent: "#66BB6A",
    tag: "New",
  },
  {
    id: "6",
    name: "Virtual Reality Gaming",
    category: "Gaming · Tech",
    rating: "4.7",
    duration: "1 hr",
    price: "₹799",
    imageUri:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&q=80",
    accent: "#A855F7",
  },
];

// ─── Activity card ────────────────────────────────────────────────────────────
function ActivityCard({ item }: { item: Activity }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => router.push("/(tabs)/event")}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: item.imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
        {item.tag && (
          <View
            style={[
              styles.tag,
              {
                backgroundColor: item.accent + "22",
                borderColor: item.accent + "55",
              },
            ]}
          >
            <Text style={[styles.tagText, { color: item.accent }]}>
              {item.tag}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {item.category}
        </Text>
        <View style={styles.metaRow}>
          <Star size={10} color="#F9A825" fill="#F9A825" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <View style={styles.dot} />
          <Clock size={10} color="rgba(255,255,255,0.35)" />
          <Text style={styles.metaText}>{item.duration}</Text>
        </View>
        <Text style={[styles.price, { color: item.accent }]}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Hero banner ──────────────────────────────────────────────────────────────
function HeroBanner() {
  return (
    <TouchableOpacity style={styles.hero} activeOpacity={0.88}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80",
        }}
        style={StyleSheet.absoluteFillObject as any}
        resizeMode="cover"
      />
      <View style={styles.heroOverlay} />
      <View style={styles.heroContent}>
        <Text style={styles.heroLabel}>WEEKEND SPECIAL</Text>
        <Text style={styles.heroTitle}>Try something{"\n"}new today!</Text>
        <TouchableOpacity style={styles.heroBtn} activeOpacity={0.85}>
          <Text style={styles.heroBtnText}>Browse activities</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function ActivitiesScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <CategoryPageHeader
        activeTab="activities"
        searchPlaceholder="Search for activities"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Hero */}
        <View style={styles.section}>
          <HeroBanner />
        </View>

        {/* Trending activities */}
        <View style={[styles.section, { marginTop: 24 }]}>
          <SectionTitle title="Trending Activities" onSeeAll={() => {}} />
          <View style={styles.grid}>
            {TRENDING.map((a) => (
              <ActivityCard key={a.id} item={a} />
            ))}
          </View>
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

  // Hero
  hero: {
    borderRadius: 22,
    overflow: "hidden",
    height: 170,
    justifyContent: "flex-end",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5,5,20,0.6)",
  },
  heroContent: { padding: 20, gap: 4 },
  heroLabel: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 10,
    color: "#66BB6A",
    letterSpacing: 2,
  },
  heroTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 24,
    color: "#FFFFFF",
    lineHeight: 30,
    marginBottom: 10,
  },
  heroBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#66BB6A",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  heroBtnText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
  },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#13121A",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    overflow: "hidden",
  },
  imageWrap: { position: "relative" },
  image: {
    width: "100%",
    height: CARD_WIDTH * 0.85,
    backgroundColor: "#1A1A24",
  },
  tag: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  info: { padding: 12, gap: 3 },
  name: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "#F0EFF8",
    lineHeight: 18,
  },
  category: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.38)",
  },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  ratingText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 11,
    color: "#F9A825",
  },
  dot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  metaText: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
  },
  price: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 14,
    marginTop: 2,
  },
});
