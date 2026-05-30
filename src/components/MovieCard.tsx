import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Star } from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.38;

export interface Movie {
  id: string;
  title: string;
  genre: string;
  rating?: string;
  tag?: string;
  tagColor?: string;
  imageUri: string;
}

interface MovieCardProps {
  item: Movie;
}

export function MovieCard({ item }: MovieCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => router.push("/(tabs)/event")}
    >
      {/* Poster */}
      <View style={styles.posterWrap}>
        <Image
          source={{ uri: item.imageUri }}
          style={styles.poster}
          resizeMode="cover"
        />
        {item.tag && (
          <View
            style={[
              styles.tag,
              { backgroundColor: (item.tagColor ?? "#A855F7") + "22" },
            ]}
          >
            <Text
              style={[styles.tagText, { color: item.tagColor ?? "#A855F7" }]}
            >
              {item.tag}
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.genre} numberOfLines={1}>
          {item.genre}
        </Text>
        {item.rating && (
          <View style={styles.ratingRow}>
            <Star size={11} color="#F9A825" fill="#F9A825" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 12,
  },
  posterWrap: {
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
    marginBottom: 8,
  },
  poster: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.45,
    backgroundColor: "#1A1A24",
  },
  tag: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  info: {
    gap: 3,
  },
  title: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "#F0EFF8",
    lineHeight: 18,
  },
  genre: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.38)",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  ratingText: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 12,
    color: "#F9A825",
  },
});
