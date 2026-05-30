import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 16 * 2 - 10) / 2; // 2-col, 16px px each side, 10 gap

export interface MoodItem {
  id: string;
  label: string;
  imageUri: string;
}

interface MoodGridProps {
  items: MoodItem[];
  onPress?: (item: MoodItem) => void;
}

export function MoodGrid({ items, onPress }: MoodGridProps) {
  // Split into two rows for horizontal scroll
  const midpoint = Math.ceil(items.length / 2);
  const topRow = items.slice(0, midpoint);
  const bottomRow = items.slice(midpoint);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      <View style={styles.grid}>
        {/* Top row */}
        <View style={styles.row}>
          {topRow.map((item) => (
            <MoodItemCard key={item.id} item={item} onPress={onPress} />
          ))}
        </View>
        {/* Bottom row */}
        <View style={styles.row}>
          {bottomRow.map((item) => (
            <MoodItemCard key={item.id} item={item} onPress={onPress} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function MoodItemCard({
  item,
  onPress,
}: {
  item: MoodItem;
  onPress?: (item: MoodItem) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.82}
      onPress={() => onPress?.(item)}
    >
      <Image
        source={{ uri: item.imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingRight: 16,
    paddingBottom: 4,
  },
  grid: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  card: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.7,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#1A1A24",
    justifyContent: "flex-end",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  label: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
    padding: 10,
  },
});
