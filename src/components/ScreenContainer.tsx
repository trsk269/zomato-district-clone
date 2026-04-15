import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "./Themed";
import { useThemeColor } from "./Themed";

interface ScreenContainerProps {
  title: string;
  hideTitle?: boolean;
  children?: React.ReactNode;
}

export function ScreenContainer({
  title,
  hideTitle = false,
  children,
}: ScreenContainerProps) {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.container}>
        {!hideTitle && <Text style={styles.title}>{title}</Text>}
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "SpaceGrotesk_700Bold",
    marginBottom: 20,
  },
});
