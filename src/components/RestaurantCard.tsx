import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Star, MapPin, Clock } from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: string;
  deliveryTime: string;
  distance: string;
  promo?: string;
  imageUri: string;
  accent?: string;
}

interface RestaurantCardProps {
  item: Restaurant;
}

export function RestaurantCard({ item }: RestaurantCardProps) {
  const router = useRouter();
  const accent = item.accent ?? "#A855F7";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => router.push("/(tabs)/event")}
    >
      {/* Image */}
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: item.imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
        {item.promo && (
          <View
            style={[
              styles.promoBadge,
              { backgroundColor: accent + "22", borderColor: accent + "55" },
            ]}
          >
            <Text style={[styles.promoText, { color: accent }]}>
              {item.promo}
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cuisine} numberOfLines={1}>
          {item.cuisine}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.ratingPill}>
            <Star size={11} color="#22C55E" fill="#22C55E" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <View style={styles.dot} />
          <View style={styles.metaItem}>
            <Clock size={11} color="rgba(255,255,255,0.35)" />
            <Text style={styles.metaText}>{item.deliveryTime}</Text>
          </View>
          <View style={styles.dot} />
          <View style={styles.metaItem}>
            <MapPin size={11} color="rgba(255,255,255,0.35)" />
            <Text style={styles.metaText}>{item.distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#13121A",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    marginBottom: 14,
    overflow: "hidden",
  },
  imageWrap: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 170,
    backgroundColor: "#1A1A24",
  },
  promoBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  promoText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 11,
    letterSpacing: 0.3,
  },
  info: {
    padding: 14,
    gap: 4,
  },
  name: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
    color: "#F0EFF8",
  },
  cuisine: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(34,197,94,0.12)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 12,
    color: "#22C55E",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  metaText: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
  },
});
