import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SectionTitleProps {
  title: string;
  onSeeAll?: () => void;
  style?: object;
}

export function SectionTitle({ title, onSeeAll, style }: SectionTitleProps) {
  return (
    <View style={[styles.row, style]}>
      <Text style={styles.title}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.75}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 20,
    color: "#FFFFFF",
  },
  seeAll: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 13,
    color: "#A855F7",
  },
});
