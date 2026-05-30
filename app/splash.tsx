import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  // Animation values
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Step 1: Fade + scale logo in
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Step 2: Hold for a moment, then fade out screen → navigate
      setTimeout(() => {
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          router.replace("/login");
        });
      }, 1000);
    });
  }, []);

  return (
    <Animated.View style={[styles.root, { opacity: screenOpacity }]}>
      <StatusBar barStyle="light-content" backgroundColor="#09090B" />

      {/* Background ambient glows */}
      <View style={styles.glowTopLeft} />
      <View style={styles.glowBottomRight} />

      {/* Radial glow behind logo */}
      <Animated.View style={[styles.logoGlow, { opacity: glowOpacity }]} />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoWrapper,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Image
          source={require("../assets/images/logo.webp")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Bottom tagline dot */}
      <Animated.View style={[styles.taglineRow, { opacity: logoOpacity }]}>
        <View style={styles.dot} />
        <View style={styles.dotLine} />
        <View style={styles.dot} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#09090B",
    alignItems: "center",
    justifyContent: "center",
  },

  // Ambient bg glows
  glowTopLeft: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#7C3AED",
    opacity: 0.08,
    top: -80,
    left: -80,
  },
  glowBottomRight: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#A855F7",
    opacity: 0.07,
    bottom: -60,
    right: -60,
  },

  // Logo glow bloom
  logoGlow: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#7C3AED",
    opacity: 0.18,
  },

  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 160,
    height: 160,
  },

  // Decorative dots below logo
  taglineRow: {
    position: "absolute",
    bottom: height * 0.12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(168,85,247,0.5)",
  },
  dotLine: {
    width: 32,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: "rgba(168,85,247,0.25)",
  },
});
