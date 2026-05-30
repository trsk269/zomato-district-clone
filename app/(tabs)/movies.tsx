import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryPageHeader } from "@/components/CategoryPageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import {
  SpotlightCarousel,
  SpotlightItem,
} from "@/components/SpotlightCarousel";
import { MovieCard, Movie } from "@/components/MovieCard";
import { useRouter } from "expo-router";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SPOTLIGHT: SpotlightItem[] = [
  {
    id: "1",
    title: "Obsession",
    genre: "Horror · Thriller",
    description: "Desire and danger collide in this eerie love tale",
    tag: "Now showing",
    imageUri:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=90",
    accentColor: "#EF5350",
  },
  {
    id: "2",
    title: "Neon Drift",
    genre: "Sci-Fi · Action",
    description: "A race through time in the streets of the future",
    tag: "Now showing",
    imageUri:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=90",
    accentColor: "#26C6DA",
  },
  {
    id: "3",
    title: "The Last Canvas",
    genre: "Drama · Art",
    description: "A painter's final masterpiece changes everything",
    tag: "Now showing",
    imageUri:
      "https://images.unsplash.com/photo-1578926288207-32356f4d0526?w=800&q=90",
    accentColor: "#F9A825",
  },
  {
    id: "4",
    title: "Wildfire",
    genre: "Action · Adventure",
    description: "One storm. One team. A fight for survival.",
    tag: "Now showing",
    imageUri:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=90",
    accentColor: "#FF6B6B",
  },
];

const THIS_WEEK: Movie[] = [
  {
    id: "1",
    title: "Obsession",
    genre: "Horror · Thriller",
    rating: "8.1",
    tag: "Now Showing",
    tagColor: "#22C55E",
    imageUri:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80",
  },
  {
    id: "2",
    title: "Neon Drift",
    genre: "Sci-Fi · Action",
    rating: "7.9",
    tag: "Now Showing",
    tagColor: "#22C55E",
    imageUri:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80",
  },
  {
    id: "3",
    title: "The Last Canvas",
    genre: "Drama",
    rating: "8.5",
    tag: "Now Showing",
    tagColor: "#22C55E",
    imageUri:
      "https://images.unsplash.com/photo-1578926288207-32356f4d0526?w=400&q=80",
  },
  {
    id: "4",
    title: "Wildfire",
    genre: "Action",
    rating: "7.6",
    tag: "Now Showing",
    tagColor: "#22C55E",
    imageUri:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
  },
];

const COMING_SOON: Movie[] = [
  {
    id: "5",
    title: "Phantom Signal",
    genre: "Mystery · Sci-Fi",
    tag: "Coming Soon",
    tagColor: "#F9A825",
    imageUri:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
  },
  {
    id: "6",
    title: "Hearts & Daggers",
    genre: "Romance · Thriller",
    tag: "Coming Soon",
    tagColor: "#F9A825",
    imageUri:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&q=80",
  },
  {
    id: "7",
    title: "Aurora",
    genre: "Drama · Fantasy",
    tag: "Coming Soon",
    tagColor: "#F9A825",
    imageUri:
      "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=400&q=80",
  },
  {
    id: "8",
    title: "Code Red",
    genre: "Thriller · Action",
    tag: "Coming Soon",
    tagColor: "#F9A825",
    imageUri:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80",
  },
];

// ─── Genre filter chips ───────────────────────────────────────────────────────
const GENRES = [
  "All",
  "Action",
  "Drama",
  "Horror",
  "Comedy",
  "Sci-Fi",
  "Romance",
];

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function MoviesScreen() {
  const router = useRouter();
  const [activeGenre, setActiveGenre] = React.useState("All");

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <CategoryPageHeader
        activeTab="movies"
        searchPlaceholder="Search for 'Dharpakad'"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* In the Spotlight */}
        <View style={styles.spotlightSection}>
          <SectionTitle
            title="In the Spotlight"
            style={{ paddingHorizontal: 16 }}
          />
        </View>
        <SpotlightCarousel
          items={SPOTLIGHT}
          onBook={() => router.push("/(tabs)/event")}
        />

        {/* Genre filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreRow}
        >
          {GENRES.map((g) => (
            <TouchableOpacity
              key={g}
              style={[
                styles.genreChip,
                activeGenre === g && styles.genreChipActive,
              ]}
              onPress={() => setActiveGenre(g)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.genreText,
                  activeGenre === g && styles.genreTextActive,
                ]}
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* This Week's Releases */}
        <View style={styles.section}>
          <SectionTitle title="This Week's Releases" onSeeAll={() => {}} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.movieRow}
        >
          {THIS_WEEK.map((m) => (
            <MovieCard key={m.id} item={m} />
          ))}
        </ScrollView>

        {/* Coming Soon */}
        <View style={[styles.section, { marginTop: 24 }]}>
          <SectionTitle title="Coming Soon" onSeeAll={() => {}} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.movieRow}
        >
          {COMING_SOON.map((m) => (
            <MovieCard key={m.id} item={m} />
          ))}
        </ScrollView>

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
  spotlightSection: {
    marginTop: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  movieRow: {
    paddingHorizontal: 16,
    paddingRight: 20,
  },

  // Genre chips
  genreRow: {
    paddingHorizontal: 16,
    paddingRight: 20,
    gap: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  genreChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
  },
  genreChipActive: {
    backgroundColor: "rgba(168,85,247,0.18)",
    borderColor: "rgba(168,85,247,0.45)",
  },
  genreText: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
  genreTextActive: {
    color: "#D8B4FE",
    fontFamily: "SpaceGrotesk_700Bold",
  },
});
