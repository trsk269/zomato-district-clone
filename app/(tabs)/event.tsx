import React, { useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View as DefaultView,
  ImageBackground,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { Text } from "@/components/Themed";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  MapPin,
  CalendarClock,
  ChevronRight,
  Crown,
  Gem,
  Images,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const HERO_HEIGHT = SCREEN_HEIGHT * 0.52;

// ─── Types ────────────────────────────────────────────────────────────────────
interface EventScreenProps {
  navigation?: any;
  route?: any;
}

// ─── Info Row ─────────────────────────────────────────────────────────────────
interface InfoRowProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

const InfoRow = ({ icon: Icon, title, subtitle, onPress }: InfoRowProps) => (
  <TouchableOpacity
    style={styles.infoRow}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <DefaultView style={styles.infoIconBox}>
      <Icon color="#9CA3AF" size={18} strokeWidth={1.8} />
    </DefaultView>
    <DefaultView style={styles.infoText}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoSubtitle}>{subtitle}</Text>
    </DefaultView>
    <ChevronRight color="#3D3D4E" size={16} strokeWidth={2} />
  </TouchableOpacity>
);

// ─── Highlight Card ───────────────────────────────────────────────────────────
interface HighlightCardProps {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  heading: string;
  body: string;
}

const HighlightCard = ({
  icon: Icon,
  iconColor,
  iconBg,
  heading,
  body,
}: HighlightCardProps) => (
  <DefaultView style={styles.highlightCard}>
    <DefaultView style={[styles.highlightIconBox, { backgroundColor: iconBg }]}>
      <Icon color={iconColor} size={18} strokeWidth={1.8} />
    </DefaultView>
    <Text style={styles.highlightHeading}>{heading}</Text>
    <Text style={styles.highlightBody}>{body}</Text>
  </DefaultView>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function EventScreen({ navigation }: EventScreenProps) {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Navbar fade-in on scroll
  const navBg = scrollY.interpolate({
    inputRange: [HERO_HEIGHT - 100, HERO_HEIGHT - 40],
    outputRange: ["rgba(10,10,14,0)", "rgba(10,10,14,1)"],
    extrapolate: "clamp",
  });

  return (
    <DefaultView style={styles.root}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* ── Floating Navbar ── */}
      <Animated.View
        style={[
          styles.navbar,
          { backgroundColor: navBg, paddingTop: insets.top + 8 },
        ]}
      >
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.8}
        >
          <ArrowLeft color="#FFF" size={20} strokeWidth={2} />
        </TouchableOpacity>
        <DefaultView style={styles.navActions}>
          <TouchableOpacity style={styles.navBtn} activeOpacity={0.8}>
            <Bookmark color="#FFF" size={20} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} activeOpacity={0.8}>
            <Share2 color="#FFF" size={20} strokeWidth={2} />
          </TouchableOpacity>
        </DefaultView>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* ── Hero Image ── */}
        <DefaultView style={{ height: HERO_HEIGHT }}>
          <ImageBackground
            source={{ uri: "https://picsum.photos/seed/ipl2026/800/1000" }}
            style={styles.hero}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "rgba(10,10,14,0.6)", "#0A0A0E"]}
              locations={[0.3, 0.7, 1]}
              style={StyleSheet.absoluteFill}
            />
            {/* Gallery pill */}
            <TouchableOpacity style={styles.galleryPill} activeOpacity={0.8}>
              <Images color="#FFF" size={15} strokeWidth={2} />
              <Text style={styles.galleryText}>Gallery</Text>
            </TouchableOpacity>
          </ImageBackground>
        </DefaultView>

        {/* ── Content Sheet ── */}
        <DefaultView style={styles.sheet}>
          {/* Tags */}
          <DefaultView style={styles.tagsRow}>
            <DefaultView style={styles.tag}>
              <Text style={styles.tagText}>Cricket Matches</Text>
            </DefaultView>
            <DefaultView style={styles.tag}>
              <Text style={styles.tagText}>Sports</Text>
            </DefaultView>
          </DefaultView>

          {/* Title */}
          <Text style={styles.eventTitle}>
            TATA IPL 2026: Match 31 | Sunrisers Hyderabad vs Delhi Capitals
          </Text>

          {/* Date */}
          <Text style={styles.eventDate}>Tue, 21 Apr, 7:30 PM</Text>

          {/* Divider */}
          <DefaultView style={styles.divider} />

          {/* Info Rows */}
          <InfoRow
            icon={MapPin}
            title="Rajiv Gandhi International Cricket Stadium, Hyderabad"
            subtitle="646.8 km away"
          />
          <DefaultView style={styles.infoSep} />
          <InfoRow
            icon={CalendarClock}
            title="Gates open at 4:30 PM"
            subtitle="View full schedule & timeline"
          />

          {/* Divider */}
          <DefaultView style={styles.divider} />

          {/* Highlight Cards */}
          <Text style={styles.sectionLabel}>Highlights</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.highlightRow}
          >
            <HighlightCard
              icon={Crown}
              iconColor="#FBBF24"
              iconBg="rgba(251,191,36,0.12)"
              heading="Why this event stands out"
              body="High-octane clash: Sunrisers Hyderabad vs Delhi Capitals."
            />
            <HighlightCard
              icon={Gem}
              iconColor="#A78BFA"
              iconBg="rgba(167,139,250,0.12)"
              heading="Exclusive IPL perks"
              body="Premium seats, hospitality boxes & more available."
            />
          </ScrollView>

          {/* Offer Banner */}
          <TouchableOpacity style={styles.offerBanner} activeOpacity={0.8}>
            <ImageBackground
              source={{ uri: "https://picsum.photos/seed/srh/120/80" }}
              style={styles.offerImage}
              imageStyle={{ borderRadius: 12 }}
            />
            <DefaultView style={styles.offerText}>
              <Text style={styles.offerTag}>SRH fan jersey 2026</Text>
              <Text style={styles.offerTitle}>
                Buy 2 tickets, get a jersey free
              </Text>
            </DefaultView>
            <ChevronRight color="#6B6A7A" size={16} strokeWidth={2} />
          </TouchableOpacity>

          {/* About */}
          <Text style={styles.sectionLabel}>About the event</Text>
          <Text style={styles.aboutText}>
            Experience one of the most exciting rivalries in the TATA IPL 2026
            season as the Sunrisers Hyderabad take on the Delhi Capitals at the
            iconic Rajiv Gandhi International Cricket Stadium. Witness
            world-class cricket action live with your family and friends.
          </Text>

          {/* Bottom spacer for sticky CTA */}
          <DefaultView style={{ height: 110 }} />
        </DefaultView>
      </Animated.ScrollView>

      {/* ── Sticky Bottom CTA ── */}
      <DefaultView
        style={[styles.stickyBar, { paddingBottom: insets.bottom + 12 }]}
      >
        <DefaultView>
          <Text style={styles.saleLabel}>General Sale</Text>
          <Text style={styles.priceText}>
            ₹2,550 <Text style={styles.priceOnwards}>onwards</Text>
          </Text>
        </DefaultView>
        <TouchableOpacity style={styles.bookBtn} activeOpacity={0.85}>
          <Text style={styles.bookBtnText}>Book tickets</Text>
        </TouchableOpacity>
      </DefaultView>
    </DefaultView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0A0A0E",
  },

  // Navbar
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  navActions: {
    flexDirection: "row",
  },

  // Hero
  hero: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 16,
  },
  galleryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.15)",
  },
  galleryText: {
    fontSize: 13,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#FFF",
  },

  // Sheet
  sheet: {
    backgroundColor: "#0A0A0E",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  // Tags
  tagsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  tag: {
    backgroundColor: "#1A1A24",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.08)",
  },
  tagText: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_500Medium",
    color: "#9CA3AF",
  },

  // Title / Date
  eventTitle: {
    fontSize: 22,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#F0EFF8",
    lineHeight: 30,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  eventDate: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#F59E0B",
    marginBottom: 20,
  },

  divider: {
    height: 0.5,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginBottom: 16,
  },

  // Info rows
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 4,
    marginBottom: 4,
  },
  infoIconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#18181F",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
  },
  infoText: {
    flex: 1,
    gap: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#E0DFF0",
    lineHeight: 20,
  },
  infoSubtitle: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "#5A5A6E",
  },
  infoSep: {
    height: 12,
  },

  // Section label
  sectionLabel: {
    fontSize: 13,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#4B4A5E",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
    marginTop: 4,
  },

  // Highlight cards
  highlightRow: {
    gap: 10,
    paddingBottom: 4,
    marginBottom: 20,
  },
  highlightCard: {
    backgroundColor: "#13121A",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    padding: 16,
    width: SCREEN_WIDTH * 0.65,
    gap: 8,
  },
  highlightIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  highlightHeading: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#E0DFF0",
  },
  highlightBody: {
    fontSize: 13,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "#6B6A7A",
    lineHeight: 19,
  },

  // Offer banner
  offerBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#13121A",
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
    padding: 12,
    marginBottom: 24,
  },
  offerImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    overflow: "hidden",
  },
  offerText: {
    flex: 1,
    gap: 4,
  },
  offerTag: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#A78BFA",
  },
  offerTitle: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#E0DFF0",
    lineHeight: 20,
  },

  // About
  aboutText: {
    fontSize: 14,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "#6B6A7A",
    lineHeight: 22,
  },

  // Sticky CTA bar
  stickyBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0A0A0E",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.07)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  saleLabel: {
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
    color: "#22C55E",
    marginBottom: 3,
  },
  priceText: {
    fontSize: 22,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#F0EFF8",
  },
  priceOnwards: {
    fontSize: 13,
    fontFamily: "SpaceGrotesk_400Regular",
    color: "#5A5A6E",
  },
  bookBtn: {
    backgroundColor: "#F0EFF8",
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  bookBtnText: {
    fontSize: 15,
    fontFamily: "SpaceGrotesk_700Bold",
    color: "#0A0A0E",
  },
});
