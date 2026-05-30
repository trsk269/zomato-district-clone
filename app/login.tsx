import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ChevronDown,
  UtensilsCrossed,
  Ticket,
  Music2,
} from "lucide-react-native";

const { width, height } = Dimensions.get("window");

// ─── Animated category pill ───────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: "Dining",
    Icon: UtensilsCrossed,
    color: "#A855F7",
    glow: "#A855F730",
  },
  { label: "Events", Icon: Music2, color: "#26C6DA", glow: "#26C6DA30" },
  { label: "Movies", Icon: Ticket, color: "#F9A825", glow: "#F9A82530" },
];

function CategoryOrb({
  item,
  isActive,
}: {
  item: (typeof CATEGORIES)[0];
  isActive: boolean;
}) {
  const scale = useRef(new Animated.Value(isActive ? 1 : 0.72)).current;
  const opacity = useRef(new Animated.Value(isActive ? 1 : 0.45)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isActive ? 1 : 0.72,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isActive ? 1 : 0.45,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive]);

  return (
    <Animated.View style={[styles.orb, { transform: [{ scale }], opacity }]}>
      <View style={[styles.orbInner, { backgroundColor: item.glow }]}>
        <View
          style={[styles.orbGlow, { backgroundColor: item.color + "20" }]}
        />
        <item.Icon
          size={isActive ? 28 : 20}
          color={item.color}
          strokeWidth={1.8}
        />
      </View>
      {isActive && (
        <Text style={[styles.orbLabel, { color: item.color }]}>
          ✦ {item.label} ✦
        </Text>
      )}
    </Animated.View>
  );
}

// ─── Main Login Screen ─────────────────────────────────────────────────────────
export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [activeCat, setActiveCat] = useState(0);

  // Stagger entrance animations
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslate = useRef(new Animated.Value(30)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslate = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    // Cycle through categories
    const interval = setInterval(() => {
      setActiveCat((prev) => (prev + 1) % CATEGORIES.length);
    }, 2200);

    // Entrance animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(heroTranslate, {
          toValue: 0,
          tension: 70,
          friction: 10,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(cardTranslate, {
          toValue: 0,
          tension: 60,
          friction: 10,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    // Mock: navigate to home regardless (no real auth)
    router.replace("/(tabs)");
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  const isPhoneValid = phone.length === 10;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#09090B" />

      {/* ── Skip button ── */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={handleSkip}
        activeOpacity={0.7}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Hero: Logo + animated orbs ── */}
          <Animated.View
            style={[
              styles.heroSection,
              {
                opacity: heroOpacity,
                transform: [{ translateY: heroTranslate }],
              },
            ]}
          >
            {/* Logo */}
            <Image
              source={require("../assets/images/logo.webp")}
              style={styles.logoImg}
              resizeMode="contain"
            />

            {/* Orbs row */}
            <View style={styles.orbsRow}>
              {CATEGORIES.map((item, idx) => (
                <CategoryOrb
                  key={item.label}
                  item={item}
                  isActive={idx === activeCat}
                />
              ))}
            </View>

            {/* Platform glow disc */}
            <View style={styles.platformDisc} />
          </Animated.View>

          {/* ── Bottom login card ── */}
          <Animated.View
            style={[
              styles.card,
              {
                opacity: cardOpacity,
                transform: [{ translateY: cardTranslate }],
              },
            ]}
          >
            {/* Glow accent on card top */}
            <View style={styles.cardTopGlow} />

            <Text style={styles.headline}>
              For all your going{"\n"}out plans
            </Text>

            <Text style={styles.subLabel}>LOG IN OR SIGN UP</Text>

            {/* Phone input row */}
            <View style={styles.inputRow}>
              {/* Country code selector */}
              <TouchableOpacity style={styles.countryBtn} activeOpacity={0.75}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.countryCode}>+91</Text>
                <ChevronDown size={14} color="rgba(255,255,255,0.45)" />
              </TouchableOpacity>

              {/* Phone number field */}
              <TextInput
                style={styles.phoneInput}
                placeholder="10-digit mobile number"
                placeholderTextColor="rgba(255,255,255,0.28)"
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                selectionColor="#A855F7"
              />
            </View>

            {/* Continue button */}
            <TouchableOpacity
              style={[
                styles.continueBtn,
                isPhoneValid && styles.continueBtnActive,
              ]}
              onPress={handleContinue}
              activeOpacity={isPhoneValid ? 0.8 : 0.95}
            >
              <Text
                style={[
                  styles.continueBtnText,
                  isPhoneValid && styles.continueBtnTextActive,
                ]}
              >
                Continue
              </Text>
            </TouchableOpacity>

            {/* Terms */}
            <View style={styles.termsRow}>
              <Text style={styles.termsText}>
                By continuing, you agree to our{"\n"}
              </Text>
              <View style={styles.termsLinks}>
                <TouchableOpacity>
                  <Text style={styles.termsLink}>Terms of Services</Text>
                </TouchableOpacity>
                <Text style={styles.termsText}>{"  "}</Text>
                <TouchableOpacity>
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#09090B",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },

  // Skip
  skipBtn: {
    position: "absolute",
    top: 54,
    right: 22,
    zIndex: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.12)",
  },
  skipText: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
  },

  // Hero section
  heroSection: {
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 10,
    flex: 1,
    justifyContent: "center",
    minHeight: height * 0.44,
  },
  logoImg: {
    width: 120,
    height: 120,
    marginBottom: 28,
  },
  orbsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 16,
    zIndex: 2,
  },
  orb: {
    alignItems: "center",
    gap: 10,
  },
  orbInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  orbGlow: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  orbLabel: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 13,
    letterSpacing: 0.5,
  },

  // Platform disc (elliptical glow beneath orbs)
  platformDisc: {
    width: width * 0.7,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#7C3AED",
    opacity: 0.22,
    marginTop: 6,
    alignSelf: "center",
  },

  // ── Card ──
  card: {
    backgroundColor: "#111118",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: Platform.OS === "ios" ? 44 : 32,
    overflow: "hidden",
  },
  cardTopGlow: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 200,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#7C3AED",
    opacity: 0.12,
  },

  headline: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 28,
    color: "#FFFFFF",
    lineHeight: 36,
    textAlign: "center",
    marginBottom: 22,
  },

  subLabel: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 20,
  },

  // Phone input
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  countryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  flag: {
    fontSize: 18,
  },
  countryCode: {
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
  },
  phoneInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 15,
    color: "#FFFFFF",
  },

  // Continue button
  continueBtn: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  continueBtnActive: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },
  continueBtnText: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
    color: "rgba(255,255,255,0.35)",
  },
  continueBtnTextActive: {
    color: "#FFFFFF",
  },

  // Terms
  termsRow: {
    alignItems: "center",
  },
  termsLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  termsText: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
  },
  termsLink: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    textDecorationLine: "underline",
    textDecorationColor: "rgba(255,255,255,0.25)",
  },
});
