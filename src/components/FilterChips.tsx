import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SlidersHorizontal } from "lucide-react-native";

interface FilterChip {
  id: string;
  label: string;
  isFilter?: boolean;
}

interface FilterChipsProps {
  chips?: FilterChip[];
}

const DEFAULT_CHIPS: FilterChip[] = [
  { id: "filter", label: "Filters", isFilter: true },
  { id: "30off", label: "30% OFF & above" },
  { id: "near", label: "Near & top rated" },
  { id: "pure-veg", label: "Pure veg" },
  { id: "offers", label: "Offers" },
];

export function FilterChips({ chips = DEFAULT_CHIPS }: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      {chips.map((chip) => (
        <TouchableOpacity
          key={chip.id}
          style={[styles.chip, chip.isFilter && styles.chipFilter]}
          activeOpacity={0.75}
        >
          {chip.isFilter && (
            <SlidersHorizontal
              size={13}
              color="rgba(255,255,255,0.75)"
              strokeWidth={2}
            />
          )}
          <Text style={[styles.label, chip.isFilter && styles.labelFilter]}>
            {chip.label}
          </Text>
          {chip.isFilter && (
            <View style={styles.chevDown}>
              <Text style={styles.chevText}>›</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 20,
    paddingBottom: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  chipFilter: {
    backgroundColor: "rgba(255,255,255,0.09)",
    borderColor: "rgba(255,255,255,0.15)",
  },
  label: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
  },
  labelFilter: {
    color: "#FFFFFF",
  },
  chevDown: {
    marginLeft: -2,
  },
  chevText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
    transform: [{ rotate: "90deg" }],
  },
});
